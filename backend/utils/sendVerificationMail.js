import createMailTransporter from "./createMailTransporter.js";

const sendVerificationMail = async (account) => {
  const transporter = createMailTransporter();

  ///crypto.randomBytes(64).toString("hex");
  const mailOptions = {
    from: '"The App <iamtheapp@outlook.com>',
    to: account.email,
    subject: "Verify your email...",
    html: `<p> Hello ${account.name}, verify your email by clicking this link...</p>
    <a href = '${process.env.CLIENT_URL2}verify-email?emailToken=${account.emailToken}'> Verify Your Email</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Verification email sent", mailOptions);
    }
  });
};

export default sendVerificationMail;
