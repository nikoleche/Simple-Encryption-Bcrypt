const bcrypt = require("bcrypt");
const { User } = require("../models/User");

// testing, never save passwords in plain text

seed();

async function seed() {
  try {
    await register("test", "test");
  } catch (err) {
    console.log("Database already seeded");
  }
}

async function register(username, password) {
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    throw new Error("Username is taken");
  }

  const user = new User({
    username,
    hashedPassword: await bcrypt.hash(password, 10),
  });

  await user.save();

  console.log("Created new user", username);

  return user;
}

async function login(username, password) {
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.hashedPassword))) {
    console.log("Incorrect password for", username);
    throw new Error("Username or password incorrect");
  }
  console.log("Successful login for", username);
  return user;
}

async function getUserData() {
  return await User.find();
}

module.exports = {
  register,
  login,
  getUserData,
};
