const MailJob = require("./mailing");

const Jobs = () => {
  console.log("setup Jobs");
  MailJob();
};

module.exports = Jobs;
