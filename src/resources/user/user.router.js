import controller from './user.controller';
import { Router } from 'express'; 

const router = Router();

router.route('/').get(controller.getMany).post(controller.createOne);

router.route('/profile').get(controller.getFullProfile);

export default router;