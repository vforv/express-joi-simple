import * as express from 'express';
import { router } from './router';
import * as joi from 'joi';
import { Doc, Validate } from '../index';

const app = express();

const schema = {
    body: {
        test1: joi.string().required()
    }
}

app.post('register',Validate(schema), (req: any, res: any) => {
    res.json({
        message: 'register'
    })
})

app.use('/login', router);

app.listen(3000, () => {
    Doc(app);
})