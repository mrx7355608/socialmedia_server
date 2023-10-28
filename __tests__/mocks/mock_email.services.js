const mockEmailServices = () => {
  const sendVerificationEmail = () => true;
  const sendPasswordResetEmail = () => true;

  return {
    sendVerificationEmail,
    sendPasswordResetEmail,
  };
};

export default mockEmailServices;
