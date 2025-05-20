const multer = require('multer');
const { cloudinary } = require('../utils/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'circulars',
    allowed_formats: ['pdf'],
  },
});

const upload = multer({ storage });

module.exports = upload;
