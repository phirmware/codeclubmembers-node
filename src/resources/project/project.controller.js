import { CrudControllers } from '../../utils/crud';
import { Project } from './project.model';

const createProject = async (req, res) => {
    const { id } = req.user;
    const data = { ...req.body, user_id: id }
    try {
        const project = await Project.create(data);
        res.json(project);
    } catch (e) {
        res.status(400).json({ message: 'Something went wrong' });
    }
}

const getUsersProjects = async (req, res) => {
    const { id } = req.user;
    try {
        const projects = await Project.find({ user_id: id });
        res.json(projects);
    } catch (e) {
        res.status(400).json({ message: 'Something went wrong' });
    }
}

const viewProjects = async (req, res) => {
    const { id } = req.params;
    try {
        const projects = await Project.find({ user_id: id });
        res.json(projects);
    } catch (e) {
        res.status(400).json({ message: 'Something went wrong' });
    }
}

export default { ...CrudControllers(Project), createProject, getUsersProjects, viewProjects }