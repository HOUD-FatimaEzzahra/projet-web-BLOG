const commentairesRouter = require("express").Router();

const CommentaireController = require("../controller/commentaires.controller");
const commentaireController = new CommentaireController();

commentairesRouter.get("/", commentaireController.getAllCommentaires);
commentairesRouter.get("/:id", commentaireController.getCommentaire);
commentairesRouter.patch("/", commentaireController.updateCommentaire);
commentairesRouter.post("/", commentaireController.createCommentaire);
commentairesRouter.delete("/:id", commentaireController.deleteCommentaire);

module.exports = { commentairesRouter };
