import express from 'express';
import { urlencoded, json } from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import userRouter from './resources/user/user.router';
import projectRouter from './resources/project/project.router';
import { connect } from './utils/db';
import { login, signUp } from './utils/auth';
import userController from './resources/user/user.controller';
import projectController from './resources/project/project.controller';
import { protect } from './utils/auth';

const app = express();
const port = process.env.PORT || 3000;

app.disable('x-powered-by');

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));

app.post('/login', login);
app.post('/signup', signUp);
app.get('/members', userController.getMany);
app.post('/star/:id', userController.addAStar);
app.get('/members/:username', userController.viewFullProfile);
app.get('/projects/:id', projectController.viewProjects);

app.use('/api', protect);
app.use('/api/user', userRouter);
app.use('/api/project', projectRouter);

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