const jobModel = require("../../models/jobs.models");

async function checkStatus(jobId) {
    return new Promise(async (resolve) => {
        let job = await jobModel.find("jobId", jobId);
        if (job.status !== "completed") {
            setTimeout(() => resolve(false), 1000);
        } else {
            resolve(true);
        }
    });
}


module.exports = checkStatus;
