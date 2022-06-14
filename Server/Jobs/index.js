const MailJob = require("./mailing");
const productUpdate = require("./productUpdate");

const Jobs = () => {
  console.log("setup Jobs");
  MailJob();
  productUpdate();
};

module.exports = Jobs;
