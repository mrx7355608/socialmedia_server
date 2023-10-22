import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    friends: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    profile_picture: String,
    cover_picture: String,
  },
  {
    timestamps: true,
    methods: {
      async verifyPassword(inputPassword) {
        const isValid = await bcrypt.compare(inputPassword, this.password);
        return isValid;
      },
    },
  }
);

// Hash the password
// eslint-disable-next-line
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    this.password = hashedPassword;
    next();
  } else {
    next();
  }
});

const User = mongoose.model("User", userSchema);

export default User;
