const Joi = require('joi');
const Boom = require('boom');
const Extend = require('extend');

module.exports = function validate(schema, options) {
  options = options || {};

  return function validateRequest(req, res, next) {
    // this is way to to return joi schema without validation
    // we return this in the express server when we want to create auto doc
    /* istanbul ignore if */
    if(req === 'schemaBypass') {
      return schema;
    }

    /* istanbul ignore if */
    if (!schema) {
      return next();
    }

    const toValidate = ['params', 'body', 'query', 'headers'].reduce((newArr, key) => {
      if (!schema[key]) {
        return newArr;
      }

      if (key === 'headers') {
        const { authorization } = req.headers;
        return {
          ...newArr,
          [key]: { authorization }
        }
      }

      return {
        ...newArr,
        [key]: req[key]
      }
    }, {
        ...validate
      });

    return Joi.validate(toValidate, schema, options, onValidationComplete);

    function onValidationComplete(err, validated) {
      if (err) {
        return next(Boom.badRequest(err.message, err.details));
      }

      // copy the validated data to the req object
      Extend(req, validated);

      return next();
    }
  }
};