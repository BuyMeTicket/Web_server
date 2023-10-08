import mongoose from 'mongoose';   
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    user: String,
    register:Boolean,
});

const User = mongoose.model('User', UserSchema)
export default User;