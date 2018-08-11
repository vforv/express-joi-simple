# Express + Joi + Swagger
## Everything automated and easy to setup
## Support Javascript/Typescript
### ===

## Installation

```npm i express-joi-simple --save```

## Minimal Working Example

```
import * as express from 'express';
import * as joi from 'joi';
import * as BodyParser from 'body-parser';
import { Doc, Validate, RequestHandler } from 'express-joi-simple';

const app = express();
app.use(BodyParser.json());

const schema = {
    body: {
        test1: joi.string().required()
    },
    model: 'Register'
}

// Note middleware here
app.post('register', Validate(schema), (req: any, res: any) => {
    res.json({
        message: 'register'
    })
})

app.use(RequestHandler);

app.listen(3000, () => {
    // Note function Doc here
    Doc(app);
})
```

Use require instead of import for plain Javascript.
More complicated example you can find in example folder.

## Swagger documentation settings example:

```
const settings = {
    info: {
        "version": "1.0.0",
        "title": "Title Example",
        "description": "Description API example",
        "termsOfService": "http://swagger.io/terms/",
        "contact": {
            "name": "Example team"
        },
        "license": {
            "name": "MIT"
        }
    },
    host: 'localhost:3000',
    basePath: '/'
}
```

Doc(app, settings);
