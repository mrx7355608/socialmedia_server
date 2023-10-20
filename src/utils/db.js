import mongoose from "mongoose";

export const connectDB = async (url) => {
  await mongoose.connect(url);
  console.log("[DATABASE] Conenction established");
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
};
