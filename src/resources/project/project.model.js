import { Schema, model } from 'mongoose';

const ProjectSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        minlength: 2,
        trim: true,
    },
    summary: {
        type: String,
        required: true,
        minlength: 5,
        trim: true,
    },
    project_url: {
        type: String,
        required: true,
        trim: true,
    }
});

export const Project = model('project', ProjectSchema);
