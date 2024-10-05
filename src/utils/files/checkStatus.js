const { conversionJobs } = require("./convertFiles");

async function checkStatus(jobId) {
    return new Promise((resolve) => {
        if (conversionJobs[jobId].status !== "completed") {
            setTimeout(() => resolve(false), 1000);
        } else {
            resolve(true);
        }
    });
}

module.exports = checkStatus;
