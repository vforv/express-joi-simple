import * as express from 'express';
import { router } from './router';
import * as BodyParser from 'body-parser';
import * as joi from 'joi';
import { Doc, Validate, RequestHandler } from '../index';

const app = express();
app.use(BodyParser.json());


app.use(RequestHandler);
const schema = {
    body: {
        test1: joi.string().required()
    },
    model: 'Register'
}

app.post('/register', Validate(schema), (req: any, res: any) => {
    res.json({
        message: 'register'
    })
})

app.use('/login', router);

app.use(RequestHandler);
app.listen(3000, () => {
    Doc(app);
})