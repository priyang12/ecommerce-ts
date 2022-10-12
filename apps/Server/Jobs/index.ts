import MailJob from "./mailing";
import productUpdate from "./productUpdate";

const Jobs = () => {
  console.log("setup Jobs");
  MailJob();
  productUpdate();
};

export default Jobs;
