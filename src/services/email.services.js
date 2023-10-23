import nodemaler from "nodemailer";

const EmailServices = ({ transporter }) => {
  const sendVerificationEmail = async (token, receiverEmail) => {
    const message = {
      from: "mrx7355608@gmail.com",
      to: receiverEmail,
      subject: "Account Verification",
      text: "Please verify your email",
      html: `<a href=${process.env.FRONTEND_URL}/auth/verify-account?t=${token}>Verify</a>`,
    };
    try {
      await transporter.sendMail(message);
      return true;
    } catch (err) {
      return false;
    }
  };

  const sendResetPasswordEmail = async () => {};

  return {
    sendVerificationEmail,
    sendResetPasswordEmail,
  };
};

export default EmailServices;
