// PL
const companyName = /^[A-ZŁŚŻŹÓĆŃĘĄa-ząęćńóśł0-9&@]*$/u;
const postalAddress = /[a-zA-Z\d\s\-,#.+]+/;
const email = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
const phoneNumber = /\+?\(?\d{2,4}\)?[\d\s-]{3,}/;
const price = /\$?\d{1,3}(,?\d{3})*(\.\d{1,2})?/;

// 1 uppercase alphabet, 1 lowercase alphabet, 2 digits, 1 special character
// minimum length 8 characters
const password = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9].*[0-9])(?=.*[^a-zA-Z0-9]).{8,}/;

module.exports = {
  companyName,
  postalAddress,
  email,
  phoneNumber,
  price,
  password,
};
