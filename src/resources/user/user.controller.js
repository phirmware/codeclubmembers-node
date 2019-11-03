import { CrudControllers } from '../../utils/crud';
import { User } from './user.model';

const getFullProfile = (req, res) => {
    res.json(req.user);
}

export default {... CrudControllers(User), getFullProfile}
