const multer = require('multer');
const storageConfig = multer.memoryStorage();

let maxSize = 5 * 1000 * 1000;

module.exports = {
	uploader: (fileFilters) => {
		const fileFilter = (req, file, cb) => {
			if (fileFilters || ['image/jpg', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) cb(null, true);
			else cb(null, false);
	  }
		return multer({ storage: storageConfig, fileFilter, limits: { fileSize: maxSize } });
	}
};
