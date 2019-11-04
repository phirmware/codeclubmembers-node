import jwt from 'jsonwebtoken';
import { User } from '../resources/user/user.model';

export const createToken = (user) => {
    return jwt.sign(user, 'KD`q.#$5ioem323#1!39', { expiresIn: '1hr' });
}

export const resolveToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'KD`q.#$5ioem323#1!39', (err, payload) => {
            if (err) {
                return reject(err);
            }
            resolve(payload);
        });
    });
}

export const signUp = async (req, res) => {
    try {
        const data = await User.create(req.body);
        const token = createToken({ username: data.username, id: data._id });
        res.json({ token });
    } catch (e) {
        res.status(400).send(e);
    }
}

export const login = async (req, res) => {
    try {
        const { password, username } = req.body;
        const user = await User.findOne({ username }).select('username password').exec();
        if (!user) {
            res.status(404).send({ message: 'User not found' });
        } else {
            const same = await user.checkPassword(password);
            if (!same) {
                res.status(400).send({ message: 'Invalid password' });
            } else {
                const token = createToken({ username, id: user.id });
                res.json({ token });
            }
        }
    } catch (e) {
        return res.status(404).json({ message: 'Error' });
    }
}

export const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return next('No token provided');
    }
    const arr = authHeader.split(' ');
    const token = arr[0] === 'Bearer' ? arr[1] : false;
    try {
        const data = await resolveToken(token);
        const user = await User.findById(data.id, { password: 0 });
        if (user) {
            req.user = user;
            next();
        } else {
            next('No user found');
        }
    } catch (e) {
        next('Invalid Token');
    }
}
