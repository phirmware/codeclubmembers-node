import { CrudControllers } from '../../utils/crud';
import { User } from './user.model';

const getFullProfile = (req, res) => {
    res.json(req.user);
}

const viewFullProfile = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username }, { password: 0 });
        res.json(user);
    } catch (e) {
        res.status(400).json({ message: 'An error occured' });
    }
}

const editProfile = async (req, res) => {
    const { id } = req.user;
    try {
        const update = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.json(update);
    } catch (e) {
        res.status(400).json({ message: 'Something went wrong',e });
    }
}

const addAStar = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        user.number_of_stars++;
        if (user.number_of_stars > 20) {
            user.ranking_rating = 25;
            user.ranking = 'bubble';
        }
        if (user.number_of_stars > 40) {
            user.ranking_rating = 50;
            user.ranking = 'waves';
        }
        if (user.number_of_stars > 70) {
            user.ranking_rating = 75;
            user.ranking = 'cyclone';
        }
        if (user.number_of_stars > 120) {
            user.ranking_rating = 100;
            user.ranking = 'typhoon';
        }
        if (user.number_of_stars > 200) {
            user.ranking_rating = 100;
            user.ranking = 'super cyclone'
        }
        user.save();
        res.json({ message: 'done' });
    } catch (e) {
        res.status(400).json({ message: 'Something went wrong' });
    }
}

export default { ...CrudControllers(User), getFullProfile, addAStar, viewFullProfile, editProfile }
