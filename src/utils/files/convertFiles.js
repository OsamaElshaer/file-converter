const docxConverter = require("docx-pdf");
const jobModel = require("../../models/jobs.models");

const convertFileInBackground = async (job) => {
    const { jobId, filePath, outputPath } = job;
    try {
        await new Promise((resolve, reject) => {
            docxConverter(filePath, outputPath, async (err) => {
                await jobModel.update(jobId, {
                    status: "completed",
                    outputPath: outputPath,
                });
                if (err) {
                    return reject(
                        new Error(`Conversion failed: ${err.message}`)
                    );
                }
                resolve(outputPath);
            });
        });
    } catch (error) {
        // Handle the error and update the job status to failed
        await jobModel.update(jobId, {
            status: "failed",
        });
        console.error("Conversion error:", error);
    }
};

module.exports = { convertFileInBackground };
