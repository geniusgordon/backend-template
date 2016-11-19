import User, { generateHash, validatePassword } from '../models/User';
import HttpError from '../core/error';

export function getAllUsers() {
  return User.find({});
}

async function checkUserExist(username) {
  const user = await User.findOne({ username });
  if (user) {
    throw new HttpError(400, `user "${username}" exists`);
  }
}

export async function createNewUser(username, password) {
  await checkUserExist(username);
  const user = new User({
    username,
    password: generateHash(password),
  });
  await user.save();
  return user;
}

export async function login(username, password) {
  const user = await User.findOne({ username });
  if (!user) {
    throw new HttpError(400, `user "${username}" doesn't exist`);
  }
  if (!validatePassword(password, user.password)) {
    throw new HttpError(400, 'password incorrect');
  }
  return user;
}

