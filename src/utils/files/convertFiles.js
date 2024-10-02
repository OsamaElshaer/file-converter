const docxConverter = require("docx-pdf");
let conversionJobs = {};

const convertDocxToPdf = (inputFilePath, outputFilePath) => {
    return new Promise((resolve, reject) => {
        docxConverter(inputFilePath, outputFilePath, (err) => {
            if (err) {
                return reject(new Error(`Conversion failed: ${err.message}`));
            }
            resolve(outputFilePath);
        });
    });
};

const convertFileInBackground = async (jobId) => {
    const { filePath, outputPath } = conversionJobs[jobId];

    try {
        await convertDocxToPdf(filePath, outputPath);
        conversionJobs[jobId].status = "completed";
        conversionJobs[jobId].outputPath = outputPath;
    } catch (error) {
        conversionJobs[jobId].status = "failed";
        conversionJobs[jobId].error = error.message;
    }
};

module.exports = { convertFileInBackground, conversionJobs };
