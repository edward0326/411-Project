"use strict";

module.exports = (app) => {
    const usersApi = require("../controllers/userController");
    app.route("/users").get(usersApi.listAllUsers).post(usersApi.createNewUser);
    app.route("/users/:id").put(usersApi.updateUser).delete(usersApi.deleteUser);
};
