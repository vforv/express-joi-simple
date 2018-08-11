import * as express from 'express';
import { factory } from '../index';
import { router } from './router';
import * as joi from 'joi';

const app = express();

const schema = {
    body: {
        test1: joi.string().required()
    }
}

app.post('register',factory.validateJoiSchema(schema), (req, res) => {
    res.json({
        message: 'register'
    })
})

app.use('/login', router);

app.listen(3000, () => {
    factory.generateDoc(app);
    console.log('App started on port 3000')
})