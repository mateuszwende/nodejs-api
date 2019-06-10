// PL
const companyNameRegex = /^[A-ZŁŚŻŹÓĆŃĘĄa-ząęćńóśł0-9&@]*$/u;
const postalAddressRegex = /[a-zA-Z\d\s\-,#.+]+/;
const emailRegex = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
const phoneNumberRegex = /\+?\(?\d{2,4}\)?[\d\s-]{3,}/;
const priceRegex = /\$?\d{1,3}(,?\d{3})*(\.\d{1,2})?/;

// 1 uppercase alphabet, 1 lowercase alphabet, 2 digits, 1 special character
// minimum length 8 characters
const passwordRegex = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9].*[0-9])(?=.*[^a-zA-Z0-9]).{8,}/;

module.exports = {
  companyNameRegex,
  postalAddressRegex,
  emailRegex,
  phoneNumberRegex,
  priceRegex,
  passwordRegex
};
