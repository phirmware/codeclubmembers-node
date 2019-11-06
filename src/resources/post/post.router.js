import controller from './post.controller';
import { Router } from 'express';

const router = Router();

router.route('/').get(controller.findAllPosts).post(controller.createNewPost);
router.route('/like/:postId').post(controller.likePost);
router.route('/:id').get(controller.fetchPost);

export default router;
