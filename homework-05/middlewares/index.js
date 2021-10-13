const controllerWrapper = require('./controllerWrapper');
const validation = require('./validation');
const authenticate = require('./authenticate');
const uploadMiddleware = require('./uploadMiddleware');

module.exports = {
	controllerWrapper,
	validation,
	authenticate,
	uploadMiddleware,
};
