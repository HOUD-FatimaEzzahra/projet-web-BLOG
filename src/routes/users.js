const usersRouter = require("express").Router();

const UserController = require("../controller/users.controller");
const userController = new UserController();

usersRouter.get("/", userController.getAllUsers);
usersRouter.get("/:id", userController.getUser);
usersRouter.patch("/", userController.updateUser);
usersRouter.post("/", userController.createUser);
usersRouter.delete("/:id", userController.deleteUser);
usersRouter.post("/login", userController.login);

module.exports = { usersRouter };
