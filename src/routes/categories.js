const categoriesRouter = require("express").Router();

const CategorieController = require("../controller/categories.controller");
const categoriesController = new CategorieController();

categoriesRouter.get("/", categoriesController.getAllCategories);
categoriesRouter.get("/:id", categoriesController.getCategorie);
categoriesRouter.patch("/", categoriesController.updateCategorie);
categoriesRouter.post("/", categoriesController.createCategorie);
categoriesRouter.delete("/:id", categoriesController.deleteCategorie);
categoriesRouter.post("/addArticle", categoriesController.addArticleCategorie);
categoriesRouter.post(
  "/deleteArticle",
  categoriesController.deleteArticleCategorie
);
module.exports = { categoriesRouter };
