import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/schema.js';

const router = express.Router();

const maxAge = 24 * 60 * 60;

const createToken = id => jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: maxAge })

const verifyToken = async token => {
    if (token) {
        try {
            const result = await jwt.verify(token, process.env.JWT_KEY);
            return result;
        }
        catch (err) {
            return 'token not valid';
        }
    }
    else return 'no token';
};

router.post('/auth/register', async (req, res) => {
    let { email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt();
        password = await bcrypt.hash(password, salt);
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.status(201).send(JSON.stringify(token));
    }
    catch (err) {
        res.status(400).send({ err: err.message });
    }
});

router.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        res.status(400).send({ err: 'wrong email or password. please try again' });
        return;
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
        res.status(400).send({ err: 'wrong email or password. please try again' });
        return;
    }
    try {
        const token = createToken(user._id);
        res.status(201).send(JSON.stringify(token));
    }
    catch (err) {
        res.status(400).send({ err: err.message });
    }
});

router.post('/auth/verify', async (req, res) => {
    const token = req.body.user;
    const result = await verifyToken(token);
    if (result === 'token not valid' || result === 'no token') res.status(401).send({ needAuth: result });
    else res.status(200).send(result);
});

export const authRoutes = router;
export const verify = verifyToken;