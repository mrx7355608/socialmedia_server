import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
  token: String,
  type: {
    type: String,
    enum: ["account-verification", "reset-password"],
    required: true,
  },
  userID: String,
  // To enable only one time use of the token
  isExpired: {
    type: Boolean,
    default: false
  }
}, {
  expires: 5 * 60 * 1000 // 5 minutes
});

const Token = mongoose.model("Token", tokenSchema);

export default Token;
