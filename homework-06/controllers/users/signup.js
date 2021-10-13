const { Conflict } = require('http-errors');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');

// const bcrypt = require('bcryptjs');
const { sendMail } = require('../../utils/');
const { User } = require('../../models/users');

const signup = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user) {
		throw new Conflict('Email in use');
	}
	const avatarURL = gravatar.url(email);
	const newUser = new User({ email, avatarURL, verifyToken: nanoid() });
	newUser.setPassword(password);

	await newUser.save();
	const { verifyToken } = newUser;
	const data = {
		to: email,
		subject: 'Підтвердження реєстрації на сайті',
		html: `<a href= "http://localhost:3000/api/users/verify/${verifyToken}">Підтвердження реєстрації на сайті</a>`,
	};
	await sendMail(data);
	// console.log(newUser);
	// const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
	// const newUser = { email, password: hashPassword };
	// const result = await User.create(newUser);
	res.status(201).json({
		status: 'Created',
		code: 201,
		message: 'Success register',
		responseBody: {
			email: newUser.email,
			subscription: newUser.subscription,
			verifyToken: newUser.verifyToken,
			verify: newUser.verify,
		},
	});
};

module.exports = signup;
