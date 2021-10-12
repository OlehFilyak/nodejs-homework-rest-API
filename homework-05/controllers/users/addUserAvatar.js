const path = require('path');
const { nanoid } = require('nanoid');
const fs = require('fs/promises');

const userAvatars = [];

const uploadDir = path.join(__dirname, '..', '..', 'public');
// console.log(tempDir);
// console.log(uploadDir);

const addUserAvatar = async (req, res) => {
	// console.log(req.body);
	// console.log(req.file);
	const { originalname, path: tempName } = req.file;
	// console.log(originalname);
	// console.log(tempName);
	const fileName = path.join(uploadDir, 'avatars', originalname); // повне нове ім'я файлу
	try {
		await fs.rename(tempName, fileName); // переміщення файлу
		const localImagePath = path.join('/public/avatars', originalname);
		const newUserAvatar = {
			...req.body,
			id: nanoid(),
			localImagePath,
		};
		userAvatars.push(newUserAvatar);
		res.status(201).json({
			status: 'success',
			code: 201,
			data: {
				result: userAvatars,
			},
		});
	} catch (error) {
		console.log(error.message);
		await fs.unlink(tempName);
	}
};

module.exports = addUserAvatar;
