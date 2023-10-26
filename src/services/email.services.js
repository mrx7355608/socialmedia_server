import createMailTransport from "../utils/mailTransport.js";

const transporter = createMailTransport();

const EmailServices = () => {
  const sendVerificationEmail = async (token, receiverEmail) => {
    const message = {
      from: "mrx7355608@gmail.com",
      to: receiverEmail,
      subject: "Account Verification",
      html: `<div>
      <p> Click the link below to verify your email. The link will expire in 5 minutes</p>
      <a href=${process.env.FRONTEND_URL}/auth/verify-account?t=${token}>Verify</a>
      </div>`,
    };
    await transporter.sendMail(message);
  };

  const sendResetPasswordEmail = async () => {};

  return {
    sendVerificationEmail,
    sendResetPasswordEmail,
  };
};

export default EmailServices;
