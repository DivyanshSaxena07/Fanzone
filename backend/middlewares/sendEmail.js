const nodemailer = require("nodemailer");
exports.sendEmail = async(options) => {
var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "cc3a5c529d5bdf",
    pass: "b1d6883ffdca28"
  }
});
const mailOptions = {
    from:"",
    to:options.email,
    subject:options.subject,
    text:options.message
};
await transport.sendMail(mailOptions)
}