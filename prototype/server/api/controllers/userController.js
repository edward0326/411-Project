const User = require("../models/userModel");

// retrieve all users
exports.listAllUsers = (req, res) => {
    User.find({}, (error, data) => {
        if (error) {
            res.status(400).send(error);
        }

        res.status(200).json(data);
    });
};

// create a new user
exports.createNewUser = (req, res) => {
    const newUser = new User(req.body);
    newUser.save((error, user) => {
        if (error) {
            res.status(400).send(error);
        }

        res.status(201).json(user);
    });
};

// update an user
exports.updateUser = (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, req.body,
    { new: true }, (error, user) => {
        if (error) {
            return res.status(404).send(error);
        }

        res.status(200).json(user);
    });
};

// delete an user
exports.deleteUser = async (req, res) => {
    await User.deleteOne({ _id: req.params.id }, (error) => {
        if (error) {
            return res.status(404).send(error);
        }

        res.status(200).json({ message: "User successfully deleted"});
    });
};

