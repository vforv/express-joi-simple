import * as Joi from 'joi-express';

export function Validate(schema: any) {
    return Joi(schema);
}
