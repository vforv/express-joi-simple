# Express + Joi + Swagger
## Everything automated and easy to setup
## Support Javascript/Typescript
### ===

## Installation

```npm i express-joi-simple --save```

## Example

```
import * as express from 'express';
import { router } from './router';
import * as joi from 'joi';
import { Doc, Validate } from 'express-joi-simple';

const app = express();

const schema = {
    body: {
        test1: joi.string().required()
    }
}

// Note middleware here
app.post('register',Validate(schema), (req: any, res: any) => {
    res.json({
        message: 'register'
    })
})

app.use('/login', router);

app.listen(3000, () => {
    // Note function Doc here
    Doc(app);
})
```

Use require instead of import for plain Javascript.