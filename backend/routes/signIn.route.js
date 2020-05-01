const router = require('express').Router();
const validateRegisterInput = require('../validation/register.validation');
const validateLoginInput = require('../validation/login.validation');
let User = require('../models/user.model');

router.route('/signup').post((request, response) => {
    const {errors, isValid} = validateRegisterInput(request.body);
    if (!isValid) {
        return response.json(errors);
    }

    User.findOne({email: request.body.email})
        .then(match => {
            if (match) {
                return response.json("The Email you entered already exists.");
            } else {
                const hashedPW = hashCode(request.body.password);
                const newUser = new User({
                    firstName: request.body.firstName,
                    lastName: request.body.lastName,
                    email: request.body.email,
                    password: hashedPW
                });
            
                newUser.save()
                    .then(() => response.json({
                                                status: "Signed Up !: " + request.body.email,
                                                person: newUser
                                            }))
                    .catch(err => response.json("Error: " + err));
            }
        });
});

router.route('/login').post((request, response) => {
    const {errors, isValid} = validateLoginInput(request.body);
    if (!isValid) {
        return response.json({status: errors});
    }

    User.findOne({email: request.body.email})
        .then(match => {
            if (!match) {
                return response.json({status: "The Email You entered is not registered with us."});
            } else {
                const enteredPW = hashCode(request.body.password);
                const actualPW = match.password;

                if (enteredPW == actualPW) {
                    return response.json({
                        status: "Logged IN!!",
                        person: match
                    });
                } else {
                    return response.json({status:"The password you entered is incorrect."});
                }
            }
        });
});

function hashCode(pw) {
    let num = 7;

    for (var i = 0; i < pw.length; i++) {
        num *= pw.charCodeAt(i);
    }
    return num;
}

module.exports = router;