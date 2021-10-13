const { BadRequest } = require('http-errors');

const { User } = require('../../models/users');
const { sendSuccessRes } = require('../../utils');
const { sendMail } = require('../../utils/');

const verifyRepeat = async (req, res, _next) => {
	const { email } = req.body;
	if (!email) {
		throw new BadRequest('Missing required field email');
	}
	const user = await User.findOne({ email });
	if (!user) {
		throw new NotFound('User not found');
	}
	const { verifyToken } = user;
	if (!verifyToken) {
		throw new BadRequest('Verification has already been passed');
	}
	const data = {
		to: email,
		subject: 'Підтвердження реєстрації на сайті',
		html: `<a href= "http://localhost:3000/api/users/verify/${verifyToken}">Підтвердження реєстрації на сайті</a>`,
	};
	await sendMail(data);
	sendSuccessRes(res, 'Verification email sent');
};

module.exports = verifyRepeat;
