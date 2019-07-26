import mongoose from "mongoose";
import bcrypt from "bcrypt";

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    name: { type: String, default: "" },
    avatar: { type: String, default: "" },
    avatarBackground: {type: String, default: ""},
    address: {
      city: { type: String, default: "" },
      country: { type: String, default: "" },
    },
    emails: [{
      email: {type: String, default: ""},
      name: {type: String, default: ""},
    }],
    tels: [{
      tel: {type: String, default: ""},
      name: {type: String, default: ""},
    }]
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", function(next) {
  // Check if document is new or a new password has been set
  if (this.isNew || this.isModified("password")) {
    // Saving reference to this because of changing scopes
    const document = this;
    bcrypt.hash(document.password, saltRounds, function(err, hashedPassword) {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

UserSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model("User", UserSchema);
