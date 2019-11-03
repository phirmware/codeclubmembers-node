import mongoose from 'mongoose';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

export const connect = () => mongoose.connect('mongodb://localhost/codeclubmembers', {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', (e) => {
    console.log('Something went wrong', e);
});
