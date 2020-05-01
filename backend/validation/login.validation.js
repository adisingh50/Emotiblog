const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLoginInput(data) {
    let errors = "";

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (Validator.isEmpty(data.email)) {
        errors = "Email Field Is Required.";
    } else if (!Validator.isEmail(data.email)) {
        errors = "The entered email is not valid.";
    } else if (Validator.isEmpty(data.password)) {
        errors = "Password Field Is Required.";
    } else if (!Validator.isLength(data.password, {min: 6})) {
        errors = "Your password must be at least 6 characters long.";
    }

    return {
        errors,
        isValid: (errors.length == 0),
    };
}