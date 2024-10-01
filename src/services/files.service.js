const uploadValidation = require("../utils/upload.validation");
const { convertFile } = require("../utils/fileConverter");

const upload = (req, res, next) => {
    try {
        uploadValidation.single("file")(req, res, (err) => {
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

const convert = async (req, res, next) => {
    const { filePath, outputFormat } = req.body;
    const outputFilePath = `output.${outputFormat}`;

    try {
        await convertFile(filePath, outputFilePath);
        res.json({
            success: true,
            message: "File converted successfully",
            outputFilePath,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { convert, upload };
