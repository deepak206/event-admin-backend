const User = require('../model/User');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (userData) => {
  const { name, email, password } = userData;

  const normalizedEmail = email.toLowerCase().trim();

  const exitingUser = User.findOne({email, normalizedEmail});

    if (exitingUser) {
        const reeor = new Error('User already exists');
        error.statusCode = 409;
        throw reeor;
    }

    const hashPassword = await bycrypt.hashPassword(password, 10);

    const newUser = new User({
        name,
        email: normalizedEmail,
        password: hashPassword,
    });

    return await newUser.save();
}

const loginUser = async ({emai, password}) => {
    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({email: normalizedEmail}).select("+password");

    if (!user || !await bycrypt.comparePassword(password, user.password)) {
        const error = new Error('Invalid credentials');
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign({sub: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'});

    return {token, user};

}

const getUserById = async (userId) => {
    const  user = await User.findById(userId).select("-password");

    if(!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        return error;
    }
    return user;
}

module.exports = {
    getUserById,
    registerUser,
    loginUser
}