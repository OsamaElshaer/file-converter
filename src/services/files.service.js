const uploadValidation = require("../utils/files/uploadFiles");
let {
    convertFileInBackground,
    conversionJobs,
} = require("../utils/files/convertFiles");

const CustomError = require("../utils/customError");
const checkStatus = require("../utils/files/checkStatus");

const upload = (req, res, next) => {
    try {
        uploadValidation.single("file")(req, res, (err) => {
            if (err) {
                return res
                    .status(400)
                    .json({ success: false, message: err.message });
            }

            const filePath = req.file.path;
            const outputPath = `uploads/${Date.now()}-converted.pdf`;
            const jobId = Date.now();
            conversionJobs[jobId] = {
                status: "processing",
                filePath,
                outputPath,
            };

            convertFileInBackground(jobId);

            return res.json({
                success: true,
                jobId,
                message:
                    "File uploaded successfully. You can check conversion status using the jobId.",
            });
        });
    } catch (error) {
        next(error);
    }
};

const status = async (req, res, next) => {
    try {
        const jobId = req.params.jobId;
        const jobStatus = conversionJobs[jobId];

        if (jobStatus) {
            if (conversionJobs[jobId].status === "failed") {
                throw new CustomError(
                    "convertFiles",
                    500,
                    "File conversion failed.",
                    false
                );
            }
            while (!(await checkStatus(jobId)));
            res.json({
                success: true,
                jobStatus: conversionJobs[jobId],
            });
        } else {
            res.status(404).json({ success: false, message: "Job not found" });
        }
    } catch (error) {
        next(error);
    }
};
module.exports = { upload, status };
