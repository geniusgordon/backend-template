import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const userSchema = new Schema({
  username: String,
  password: String,
});

export function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

export function validatePassword(input, password) {
  return bcrypt.compareSync(input, password);
}

export default mongoose.model('user', userSchema);

