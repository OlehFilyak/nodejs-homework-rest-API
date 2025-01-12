const path = require('path');
const { nanoid } = require('nanoid');
const fs = require('fs/promises');
const Jimp = require('jimp');

const { sendSuccessRes } = require('../../utils');
const { User } = require('../../models/users');

// const userAvatars = [];

const uploadDir = path.join(__dirname, '..', '..', 'public');
// console.log(tempDir);
// console.log(uploadDir);

const addUserAvatar = async (req, res, _next) => {
	const usertoken = req.rawHeaders[1].split(' ')[1];
	if (!usertoken) {
		throw new NotFound('Current user is not found');
	}

	console.log(req.body);

	const { originalname, path: tempName } = req.file;
	// console.log(originalname);
	// console.log(tempName);
	const fileName = path.join(uploadDir, 'avatars', originalname); // повне нове ім'я файлу
	const filePathToFolder = path.join(uploadDir, 'avatars');
	try {
		await fs.rename(tempName, fileName); // переміщення файлу
		const localImagePath = path.join('/public/avatars', originalname);
		const [, expandingFile] = originalname.split('.');
		const newUserAvatar = {
			...req.body,
			id: nanoid(),
			localImagePath,
		};
		try {
			Jimp.read(fileName, (err, avatar) => {
				if (err) throw err;
				avatar
					.resize(250, 250) // resize
					.write(`${filePathToFolder}/avatar-${nanoid()}.${expandingFile}`); // save
			});
		} catch (err) {
			if (err) throw err;
			console.log(err.message);
		}

		let currentUser = await User.findOneAndUpdate(
			{ token: usertoken },
			{ avatarURL: newUserAvatar.localImagePath },
			{
				new: true,
			},
		);
		sendSuccessRes(res, { currentUser });
	} catch (error) {
		console.log(error.message);
		await fs.unlink(tempName);
	}
};

module.exports = addUserAvatar;
