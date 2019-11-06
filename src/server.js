import express from 'express';
import { urlencoded, json } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import userRouter from './resources/user/user.router';
import projectRouter from './resources/project/project.router';
import postRouter from './resources/post/post.router';
import { connect } from './utils/db';
import { login, signUp } from './utils/auth';
import userController from './resources/user/user.controller';
import projectController from './resources/project/project.controller';
import postController from './resources/post/post.controller';
import { protect } from './utils/auth';
import passport from 'passport';
import { Strategy } from 'passport-local';
import { User } from './resources/user/user.model';

const app = express();
const port = process.env.PORT || 3000;

app.disable('x-powered-by');

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

passport.use(new Strategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.post('/login', login);
app.post('/signup', signUp);
app.get('/members', userController.getMany);
app.post('/star/:id', userController.addAStar);
app.get('/members/:username', userController.viewFullProfile);
app.get('/projects/:id', projectController.viewProjects);
app.get('/posts', postController.findAllPosts);
app.get('/post/:id', postController.fetchPost);

app.use('/api', protect);
app.use('/api/user', userRouter);
app.use('/api/project', projectRouter);
app.use('/api/post', postRouter);

app.get('/', (req, res) => {
    res.json({ message: 'Im here' });
});

app.post('/', (req, res) => {
    console.log(req.body);
    res.json({ message: "Yo" });
});

export const start = async () => {
    try { 
        await connect();
    } catch (e) { 
        console.log(`Could not connect to server 😠 😠 😠 😠 😠 😠 😠 `);
    }
    app.listen(port, () => {
        console.log(`Connected 😎 😎 😎 😎 at port 3000`);
    });
};