const multer = require("multer");
const upload = require("../utils/upload.validation");

const uploadFile = (req, res, next) => {
    try {
        upload.single("file")(req, res, (err) => {
            if (err)
                return res
                    .status(400)
                    .json({ success: false, message: err.message });
            res.json({
                success: true,
                message: "File uploaded successfully",
                file: req.file,
            });
        });
    } catch (error) {
        next(error);
    }
};

exports.uploadFile = uploadFile;
