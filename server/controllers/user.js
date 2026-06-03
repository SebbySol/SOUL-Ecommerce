const User = require("../models/User");
const bcrypt = require("bcryptjs");
const auth = require("../auth");
const { errorHandler } = require("../auth");

module.exports.registerUser = (req, res) => {

    if(!req.body.email.includes("@")) {

        return res.status(400).send({
            message: "Invalid email format"
        });

    } else if(req.body.mobileNo.length !== 11) {

        return res.status(400).send({
            message: "Mobile number is invalid"
        });

    } else if(req.body.password.length < 8) {

        return res.status(400).send({
            message: "Password must be atleast 8 characters long"
        });

    } else {

        let newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            mobileNo: req.body.mobileNo,
            password: bcrypt.hashSync(req.body.password, 10)
        });

        return newUser.save()
        .then(result => res.status(201).send({
            message: "User registered successfully"
        }))
        .catch(error => errorHandler(error, req, res));
    }
};

module.exports.loginUser = (req, res) => {

    if(req.body.email.includes("@")) {

        return User.findOne({ email: req.body.email })
        .then(result => {

            if(result == null) {

                return res.status(404).send({
                    message: "No email found"
                });

            } else {

                const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);

                if(isPasswordCorrect) {

                    return res.status(200).send({
                        access: auth.createAccessToken(result)
                    });

                } else {

                    return res.status(401).send({
                        message: "Incorrect email or password"
                    });
                }
            }
        })
        .catch(error => errorHandler(error, req, res));

    } else {

        return res.status(400).send({
            message: "Invalid email format"
        });
    }
};

module.exports.getUserDetails = (req, res) => {

    return User.findById(req.user.id)
    .then(user => {

        if(!user) {

            return res.status(404).send({
                message: "User not found"
            });

        } else {

            user.password = "";

            return res.status(200).send(user);
        }
    })
    .catch(error => errorHandler(error, req, res));
};

module.exports.setAdmin = (req, res) => {

    return User.findById(req.params.userId)
    .then(user => {

        if(!user) {

            return res.status(404).send({
                message: "User not found"
            });

        } else {

            user.isAdmin = true;

            return user.save()
            .then(updatedUser => {

                return res.status(200).send({
                    success: true,
                    message: `${updatedUser.email} has been set as admin`
                });

            })
            .catch(error => errorHandler(error, req, res));
        }
    })
    .catch(error => errorHandler(error, req, res));
};

module.exports.updatePassword = (req, res) => {

    const { newPassword } = req.body;

    if(newPassword.length < 8) {

        return res.status(400).send({
            message: "Password must be atleast 8 characters long"
        });

    } else {

        return User.findById(req.user.id)
        .then(user => {

            if(!user) {

                return res.status(404).send({
                    message: "User not found"
                });

            } else {

                user.password = bcrypt.hashSync(newPassword, 10);

                return user.save()
                .then(updatedUser => {

                    return res.status(200).send({
                        message: "Password updated successfully"
                    });

                })
                .catch(error => errorHandler(error, req, res));
            }
        })
        .catch(error => errorHandler(error, req, res));
    }
};