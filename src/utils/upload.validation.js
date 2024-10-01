const multer = require("multer");

const upload = multer({
    dest: "uploads/",
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|pdf|docx/;
        const extname = fileTypes.test(file.mimetype);
        if (extname) {
            return cb(null, true);
        } else {
            cb(new Error("Only images and PDFs are allowed!"));
        }
    },
});

module.exports = upload;
