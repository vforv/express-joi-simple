import { Router } from 'express';
import { Validate } from '../index';
import * as joi from 'joi';

export const router: any = Router();
const schema = {
    body: {
        test1: joi.string().required()
    },
    model: 'Login'
}

router.post('/test', Validate(schema), (req: any, res: any) => {
    res.json({ message: 'test' });
})