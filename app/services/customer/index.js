const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticateCustomer } = require('../authorization');
const config = require('../../../configs');
const Customer = require('../../../db/models/Customer');

async function getCustomers(req, res, next) {
  try {
    const customers = await Customer.find({});
    res.json(customers);
    next();
  } catch (err) {
    return next(err.messages);
  }
}

async function getCustomer(req, res, next) {
  try {
    const customer = await Customer.findById(req.params.id);
    res.send(customer);
    next();
  } catch (err) {
    return next(err.messages);
  }
}

async function addCustomer(req, res, next) {
  if (!req.is('application/json')) {
    return next(new Error("Expects 'application/json"));
  }

  const {
    type,
    ownerFirstName,
    ownerLastName,
    companyName,
    areaCode,
    phoneNumber,
    email,
    address,
    country,
  } = req.body;

  const customer = new Customer({
    type,
    ownerFirstName,
    ownerLastName,
    companyName,
    areaCode,
    phoneNumber,
    email,
    address,
    country,
  });

  try {
    const newCustomer = await Customer.save();
    res.status(201).json({ newCustomer });
    next();
  } catch (err) {
    return next(err.messages);
  }
}

async function registerCustomer(req, res, next) {
  const { email, password } = req.body;
  console.log('====================================');
  console.log(req.body);
  console.log('====================================');
  let user;

  try {
    user = await new User({
      email,
      password,
    });
    console.log('====================================');
    console.log(user);
  } catch (err) {
    console.log('====================================');
    console.log(err);
    console.log(user);
    console.log('====================================');
    return next(err.message);
  }

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, async (err, hash) => {
      user.password = hash;

      try {
        await user.save();
        res.status(201).json({ user });
        next();
      } catch (err) {
        return next(err.message);
      }
    });
  });
}

async function loginCustomer(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await authenticateCustomer(email, password);
    // TODO:
    const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
      expiresIn: '2h',
    });
    const { iat, exp } = jwt.decode(token);

    res.send({ iat, exp, token });
    next();
  } catch (err) {
    return next(err.message);
  }
}

// TODO: Move to the folder related to folder strictly related to messages
// or use i18n..
const httpMessages = {
  onValidationError: {
    success: false,
    message: 'Please enter email and password.',
  },
  onUserSaveError: {
    success: false,
    message: 'That email address already exists.',
  },
  onUserSaveSuccess: {
    success: true,
    message: 'Successfully created new user.',
  },
};

module.exports = {
  getCustomers,
  getCustomer,
  addCustomer,
  registerCustomer,
  loginCustomer,
};
