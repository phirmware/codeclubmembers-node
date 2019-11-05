import jwt from 'jsonwebtoken';
import { User } from '../resources/user/user.model';
import passport from 'passport';

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

export const signUp = (req, res) => {
    const { username, password, role, status, display_image } = req.body;
    try {
        User.register(
            new User({
                username,
                role,
                status,
                display_image
            }), password, (err) => {
                if (err) {
                    return res.status(400).json({ err, message: 'This one' });
                }
                User.findOne({ username }).then(user => {
                    console.log(user);
                    const token = createToken({ username, id: user._id });
                    res.json({ token });
                }).catch(e => {
                    console.log(e);
                });
            }
        )
    } catch (e) {
        res.status(400).send(e);
    }
}

export const login = (req, res, next) => {
    const { username } = req.body;
    passport.authenticate('local', { session: false }, (err, user) => {
        console.log(user, 'Eyo');
        if (err || !user) {
            return res.status(400).json({
                message: 'Something is not right',
            });
        }
        req.login(user, { session: false }, err => {
            if (err) {
                return res.send(err);
            }
            console.log(user);
            const token = createToken({ username, id: user._id });
            res.json({ token });
        });
    })(req, res, next);
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
