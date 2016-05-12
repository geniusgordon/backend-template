import User, { generateHash, validatePassword } from '../models/User';

export function getAllUsers() {
  return User.find({});
}

function checkUserExist(username) {
  return User.findOne({ username }).then((user) => {
    if (user) {
      throw new Error(`user "${username}" exists`);
    }
  });
}

export function createNewUser(username, password) {
  return checkUserExist(username).then(() => {
    const user = new User({
      username,
      password: generateHash(password),
    });
    return user.save();
  });
}

export function login(username, password) {
  return User.findOne({ username }).then((user) => {
    if (!user) {
      throw new Error(`user "${username}" doesn't exist`);
    }
    if (!validatePassword(password, user.password)) {
      throw new Error('password incorrect');
    }
    return user;
  });
}

