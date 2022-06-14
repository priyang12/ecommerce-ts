const agenda = require("../config/agenda");
const sgMail = require("@sendgrid/mail");
const UserModal = require("../modals/User");

function MailJob() {
  agenda.define("send greeting email", async (job, done) => {
    const { userId } = job.attrs.data;
    const user = await UserModal.findById(userId);
    if (!user) {
      return done();
    }
    const { name, email } = user;
    const subject = "Welcome to the app";
    const text = `Hi ${name}, welcome to the app!`;
    const html = `Hi ${name}, welcome to the app!`;
    const mail = {
      to: `${email}`,
      from: "patelpriyang95@gmail.com",
      subject: subject,
      text: text,
      html: html,
    };
    sgMail.send(mail);

    done();
  });

  // Reset the password
  agenda.define("reset password", async (job, done) => {
    const { email, token, host } = job.attrs.data;
    console.log("reset password");
    const mail = {
      from: "patelpriyang95@gmail.com",
      to: email,
      subject: "Password Recover",
      html: `<h1>For Reset the Password<h1><div>The token link is <a href="https://${host}/ResetPassword/${token}">click here</a>
              click on the link</div>`,
    };
    console.log(mail);
    sgMail.send(mail);
    done();
  });
}
module.exports = MailJob;
