const OfficeConverter = require("office-converter");

const convertFile = (inputFilePath, outputFilePath) => {
    return new Promise((resolve, reject) => {
        OfficeConverter(inputFilePath, outputFilePath, (err) => {
            if (err) {
                return reject(new Error(`Conversion failed: ${err.message}`));
            }
            resolve(outputFilePath);
        });
    });
};

module.exports = { convertFile };
