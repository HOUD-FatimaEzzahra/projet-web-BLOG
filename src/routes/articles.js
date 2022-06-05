const articlesRouter = require("express").Router();

const ArticleController = require("../controller/articles.controller");
const articleController = new ArticleController();

articlesRouter.get("/", articleController.getAllUsers);
articlesRouter.get("/:id", articleController.getUser);
articlesRouter.patch("/", articleController.updateUser);
articlesRouter.post("/", articleController.createArticle);
articlesRouter.delete("/:id", articleController.deleteArticle);

module.exports = { articlesRouter };
