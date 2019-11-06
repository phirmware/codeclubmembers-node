import { CrudControllers } from '../../utils/crud';
import { Post } from './post.model';
import { User } from '../user/user.model';


const createNewPost = async (req, res) => {
    const { id } = req.user;
    const body = { ...req.body };
    body.user_id = id;
    body.user_details = id;
    try {
        const post = await Post.create(body);
        if (post) {
            req.user.number_of_posts++;
            req.user.save();
        }
        res.json(post);
    } catch (e) {
        res.status(400).json({ message: 'Something went wrong' });
    }
}

const findAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user_details users_that_liked').exec();
        res.json(posts);
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

const likePost = async (req, res) => {
    const { id } = req.user;
    const { postId } = req.params;
    try {
        const { liked_posts } = req.user;
        let alreadyLiked;
        liked_posts.forEach(item => {
            if (item == postId) {
                alreadyLiked = true;
            }
        });
        if (alreadyLiked) {
            return res.status(401).json({ message: 'User already liked this post' });
        }
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const posterId = post.user_id;
        const poster = await User.findById(posterId);
        poster.number_of_likes++;
        if (poster.number_of_likes > 10) {
            poster.power_level = 'chunin';
            poster.power_level_rating = 20;
        }
        if (poster.number_of_likes > 50) {
            poster.power_level = 'jounin';
            poster.power_level_rating = 40;
        }
        if (poster.number_of_likes > 150) {
            poster.power_level = 'anbu';
            poster.power_level_rating = 60;
        }
        if (poster.number_of_likes > 500) {
            poster.power_level = 'sanin';
            poster.power_level_rating = 80;
        }
        if (poster.number_of_likes > 1000) {
            poster.power_level = 'kage';
            poster.power_level_rating = 100;
        }
        poster.save();

        post.number_of_likes++;
        post.users_that_liked.push(id);
        post.save();
        req.user.liked_posts.push(postId);
        req.user.save();
        res.json({ message: 'liked' });
    } catch (e) {
        res.status(400).json({ message: 'Something went wrong' });
    }
}

const fetchPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id).populate('user_details users_that_liked').exec();
        post.number_of_views++;
        post.save();
        res.json(post);
    } catch (e) {
        res.status(400).json({ message: 'Something went wrong' });
    }
}


export default { ...CrudControllers(Post), createNewPost, findAllPosts, likePost, fetchPost }
