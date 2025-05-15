const multer = require('multer');
const path = require('path');

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// File filter (images + pdf + doc/docx)
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (
    ['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.doc', '.docx'].includes(ext)
  ) {
    cb(null, true);
  } else {
    cb(new Error('Only images, PDFs, DOC, DOCX are allowed'));
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
