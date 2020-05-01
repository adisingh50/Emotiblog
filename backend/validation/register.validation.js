const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = "";

    data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
    data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (Validator.isEmpty(data.firstName)) {
        errors = "First Name Field Is Required.";
    } else if (Validator.isEmpty(data.lastName)) {
        errors = "Last Name Field Is Required.";
    } else if (Validator.isEmpty(data.email)) {
        errors = "Email Field Is Required.";
    } else if (Validator.isEmpty(data.password)) {
        errors = "Password Field Is Required.";
    } else if (!Validator.isEmail(data.email)) {
        errors = "The email you entered is not valid.";
    } else if (!Validator.isLength(data.password, {min: 6})) {
        errors = "Your password must be at least 6 characters long.";
    }

    return {
        errors,
        isValid: (errors.length == 0),
    };
}