const userService = require('../services/user.service');

const registerUser = async (req, res, next) => {
    try {
        const userData = req.body;
        const newUser = await userService.registerUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    } 
}
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await userService.loginUser({ email, password });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

const getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await userService.getUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserById
}
