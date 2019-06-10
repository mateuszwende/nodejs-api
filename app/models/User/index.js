"use strict";
const debug = require("debug")("model-user");
const { Schema, model } = require("mongoose");
const { validateEmail, validatePassword } = require("./validate");
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    methods: {
      type: [String],
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      validate: {
        validator: validateEmail,
        message: "The email is not valid"
      }
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: validatePassword,
        message: "The password is not valid"
      }
    },
    emailToken: String,
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

UserSchema.pre("save", async function(next) {
  try {
    if (!this.methods.includes("local")) {
      next();
    }
    //check if the user has been modified to know if the password has already been hashed
    if (!this.isModified("password")) {
      next();
    }

    await this.validate();
    this.password = await this.hashPassword(this.password);

    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.hashPassword = async password => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (err) {
    throw new Error("Password hashing failed", err);
  }
};

UserSchema.methods.checkPassword = async function(inputPass) {
  try {
    return await bcrypt.compare(inputPass, this.password);
  } catch (err) {
    throw new Error("Passwords comparing failed", err);
  }
};

module.exports = model("User", UserSchema);
