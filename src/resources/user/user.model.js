import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 2,
        maxlength: 15,
        required: true,
    },
    password: {
        type: String,
        lowercase: true,
        required: true,
        minlength: 4
    },
    role: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    status: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 100,
        trim: true,
    },
    display_image: {
        type: String,
        required: true,
        trim: true,
    },
    power_level: {
        type: String,
        required: true,
        trim: true,
        default: 'genin',
    },
    power_level_rating: {
        type: Number,
        required: true,
        default: 0,
    },
    ranking: {
        type: String,
        required: true,
        trim: true,
        default: 'new',
    },
    ranking_rating: {
        type: Number,
        required: true,
        default: 0,
    },
    number_of_posts: {
        type: Number,
        required: true,
        default: 0,
    },
    number_of_likes: {
        type: Number,
        required: true,
        default: 0,
    },
    number_of_stars: {
        type: Number,
        required: true,
        default: 0,
    }
});

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    bcrypt.hash(this.password, 8, (err, hash) => {
        if (err) {
            next(err);
        } else {
            this.password = hash;
            next();
        }
    });
});

userSchema.methods.checkPassword = function (password) {
    const hashPassword = this.password;
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashPassword, (err, same) => {
            if (err) {
                return reject(err);
            }
            resolve(same);
        });
    });
};

export const User = model('user', userSchema);
