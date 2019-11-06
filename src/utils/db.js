import mongoose from 'mongoose';
import config from '../config/config';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
//mongodb://<dbuser>:<dbpassword>@ds241268.mlab.com:41268/codeclub
//mongodb://localhost/codeclubmembers
export const connect = () => mongoose.connect(config.db , {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', (e) => {
    console.log('Something went wrong', e);
});
