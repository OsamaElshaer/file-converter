const path = require("path");
const fs = require("fs");
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
            const jobId = Date.now();
            const outputPath = `uploads/converted/${jobId}.pdf`;
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
            if (jobStatus.status === "failed") {
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
                jobStatus: jobStatus,
            });
        } else {
            res.status(404).json({ success: false, message: "Job not found" });
        }
    } catch (error) {
        next(error);
    }
};

const download = (req, res, next) => {
    try {
        const fileId = req.params.fileId;
        const job = conversionJobs[fileId];
        if (job && job.status === "completed") {
            const filePath = path.resolve(job.outputPath);
            console.log(`File path: ${filePath}`);

            fs.access(filePath, fs.constants.F_OK, (err) => {
                if (err) {
                    return next(
                        new CustomError(
                            "Download Error",
                            404,
                            "File not found",
                            false
                        )
                    );
                }

                res.download(filePath, path.basename(filePath), (err) => {
                    if (err) {
                        return next(
                            new CustomError(
                                "Download Error",
                                500,
                                "Failed to download the file",
                                false
                            )
                        );
                    }
                });
            });
        } else {
            return next(
                new CustomError(
                    "Download Error",
                    404,
                    "Job not found or incomplete",
                    false
                )
            );
        }
    } catch (error) {
        next(error);
    }
};
module.exports = { upload, status, download };
