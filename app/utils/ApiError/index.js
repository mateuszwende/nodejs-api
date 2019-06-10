// class ApiError {
//   constructor(errors, status = 500) {
//     this.messages = null;
//     this.status = status;

//     if (typeof errors === 'object' && errors !== null) {
//       let messages = {};
//       for (const x in errors) {
//         messages = { ...messages, ...({ [x]: errors[x].message }) };
//       }
      
//       this.messages = messages;
//     }
//     else {
//       this.messages = errors;
//     }
//   }
// }

// module.exports = ApiError;

// // class ApiError {
// //     constructor(name, description, isOperational) {
// //         Error.call(this);
// //         Error.captureStackTrace(this);
// //         this.name = name;
// //         this.description = description;
// //         this.isOperational = isOperational;
// //     }
// // }
