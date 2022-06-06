const dayjs = require("dayjs");
const { client } = require("./client");

class UserController {
  async login(req, res) {
    const { email, password } = req.body;
    const user = await client.utilisateur.findFirst({
      where: {
        email,
        password,
      },
    });
    if (!user) res.json({ message: "password or email incorrect" });
    res.json({ user });
  }
  async createUser(req, res) {
    const { nom, email, password } = req.body;

    const user = await client.utilisateur.create({
      data: {
        nom,
        email,
        password,
      },
    });

    return res.json(user);
  }
  async deleteUser(req, res) {
    const { id } = req.params;
    await client.article.deleteMany({
      where: {
        authorId: id,
      },
    });
    await client.utilisateur.delete({
      where: {
        id,
      },
    });
    res.json({
      status: "Deleted",
      message: "User: " + id,
    });
  }

  async getAllUsers(req, res) {
    const users = await client.utilisateur.findMany({});
    res.json({ users });
  }
  async getUser(req, res) {
    const { id } = req.params;
    const user = await client.utilisateur.findFirst({
      where: {
        id: id,
      },
    });
    res.json({
      user,
    });
  }
  async updateUser(req, res) {
    const { id, nom, email, password, role } = req.body;
    const user = {
      id,
      nom,
      email,
      password,
      role,
    };
    var updatedUser = {};
    try {
      updatedUser = await await client.utilisateur.update({
        where: {
          id,
        },
        data: {
          nom,
          email,
          password,
          role,
        },
      });
    } catch (error) {
      throw new Error("User not found");
    }
    res.json({
      status: "UPDATED",
      message: "User " + updatedUser.nom + " updated successfuly",
      user: updatedUser,
    });
  }
}
module.exports = UserController;
