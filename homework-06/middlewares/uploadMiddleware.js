const multer = require('multer');
const path = require('path');

const tempDir = path.join(__dirname, '..', 'temp'); //dirname вказує абсолютний шлях до файлу.

const uploadConfig = multer.diskStorage({
	// настроюємо мідлвар малтера
	destination: (req, file, cb) => {
		cb(null, tempDir);
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
	limits: {
		fileSize: 10240,
	},
});

const uploadMiddleware = multer({
	// створюємо мідлвар і передаємо налаштування
	storage: uploadConfig,
});

module.exports = uploadMiddleware;
