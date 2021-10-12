const login = require('./login');
const logout = require('./logout');
const signup = require('./signup');
const getCurrentUser = require('./getCurrentUser');
const updateUserSubscription = require('./updateUserSubscription');
const addUserAvatar = require('./addUserAvatar');

const users = {
	login,
	logout,
	signup,
	getCurrentUser,
	updateUserSubscription,
	addUserAvatar,
};
module.exports = {
	users,
};
