const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('../../utils/validator');

const UserSchema = new Schema(
  {
    methods: {
      type: [String],
      required: true,
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: validator.validateEmail,
        message: 'Email is not valid',
      },
    },
    password: {
      type: String,
      validate: {
        validator: validator.validatePassword,
        message:
          'Password is not valid. It should contain 1 uppercase and lowercase alphabet, 2 digits, 1 special character and minimum length of 8 characters.',
      },
    },
    facebook: {
      id: String,
      email: {
        type: String,
        lowercase: true,
      },
    },
    emailToken: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

UserSchema.pre('save', async function (next) {
  try {
    // methods other than local have different strategies
    if (!this.methods.includes('local')) {
      next();
    }

    // if password not modified leave with the same hash
    if (!this.isModified('password')) {
      next();
    }

    await this.validate();
    this.password = await this.hashPassword(this.password);

    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (err) {
    throw new Error('Password hashing failed', err);
  }
};

UserSchema.methods.checkPassword = async function (inputPass) {
  try {
    return await bcrypt.compare(inputPass, this.password);
  } catch (err) {
    throw new Error('Passwords comparing failed', err);
  }
};

module.exports = model('User', UserSchema);
