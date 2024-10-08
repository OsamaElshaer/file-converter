const path = require("path");
const fs = require("fs");
const uploadValidation = require("../utils/files/uploadFiles");
let { convertFileInBackground } = require("../utils/files/convertFiles");
const jobModel = require("../models/jobs.models");
const CustomError = require("../utils/customError");
const checkStatus = require("../utils/files/checkStatus");

class FileService {
    constructor(jobModel) {
        if (FileService.instance) {
            return FileService.instance;
        }
        this.jobModel = jobModel;
    }

    upload = (req, res, next) => {
        try {
            let userId = req.user.id;
            uploadValidation.single("file")(req, res, async (err) => {
                if (err) {
                    return res
                        .status(400)
                        .json({ success: false, message: err.message });
                }

                const filePath = req.file.path;
                const jobId = Date.now();
                const outputPath = `uploads/converted/${jobId}.pdf`;

                let conversionJobs = {
                    userId,
                    jobId,
                    status: "processing",
                    filePath,
                    outputPath,
                };
                await this.jobModel.add(conversionJobs);
                convertFileInBackground(conversionJobs);

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

    status = async (req, res, next) => {
        try {
            const jobId = req.params.jobId;
            const job = await this.jobModel.find("jobId", jobId);

            if (job) {
                if (job.status == "failed") {
                    throw new CustomError(
                        "convertFiles",
                        500,
                        "File conversion failed.",
                        false
                    );
                }
                while (!(await checkStatus(job.jobId)));
                res.json({
                    success: true,
                    jobStatus: job.status,
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "Job not found",
                });
            }
        } catch (error) {
            next(error);
        }
    };

    download = async (req, res, next) => {
        try {
            const fileId = req.params.fileId;
            const job = await this.jobModel.find("jobId", fileId);
            if (job && job.status === "completed") {
                const filePath = path.resolve(job.outputPath);

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
    findAll = async (req, res, next) => {
        try {
            let userId = req.user.id;
            let jobs = await this.jobModel.findAll(userId);
            return res.status(200).json({
                msg: "all jobs of user ",
                data: jobs,
            });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new FileService(jobModel);
