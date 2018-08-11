import { Router } from 'express';
import { factory } from '../index';
import * as joi from 'joi';

export const router = Router();

const schema = {
    body: {
        test1: joi.string().required()
    }
}

router.post('/test', factory.validateJoiSchema(schema), (req, res) => {
    res.json({ message: 'test' });
})