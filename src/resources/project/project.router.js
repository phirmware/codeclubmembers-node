import Controller from './project.controller';
import { Router } from 'express'; 

const router = Router();

router.route('/').get(Controller.getUsersProjects).post(Controller.createProject)

export default router;