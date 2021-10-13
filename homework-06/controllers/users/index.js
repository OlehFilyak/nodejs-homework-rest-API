const login = require('./login');
const logout = require('./logout');
const signup = require('./signup');
const getCurrentUser = require('./getCurrentUser');
const updateUserSubscription = require('./updateUserSubscription');
const addUserAvatar = require('./addUserAvatar');
const verify = require('./verify');

const users = {
	login,
	logout,
	signup,
	getCurrentUser,
	updateUserSubscription,
	addUserAvatar,
	verify,
};
module.exports = {
	users,
};
