const dayjs = require("dayjs");
const { client } = require("./client");

class CommentaireController {
  async createCommentaire(req, res) {
    const { email, contenu, articleId } = req.body;
    const commentaire = {
      email: email,
      contenu: contenu,
      articleId: articleId,
    };
    const createCommentaireUseCase = new CreateCommentaireUseCase();
    const createdCommentaire = await createCommentaireUseCase.execute(
      commentaire
    );
    res.json({
      commentaire: createdCommentaire,
    });
  }
  async deleteCommentaire(req, res) {
    const { id } = req.params;
    const deleteCommentaireUseCase = new DeleteCommentaireUseCase();
    try {
      await client.commentaire.delete({
        where: {
          id: parseInt(id),
        },
      });
      await deleteCommentaireUseCase.execute(parseInt(id));
    } catch (error) {
      throw new Error("Commentaire Doesn't Exists");
    }
    res.json({
      status: "DELETED",
      message: "Commentaire: " + id,
    });
  }
  async getAllCommentaires(req, res) {
    const { skip, take } = req.query;
    const getAllCommentairesUseCase = new GetAllCommentairesUseCase();

    const skipping = skip && parseInt(skip) > 0 ? parseInt(skip) : 0;
    const taking = take && parseInt(take) > 0 ? parseInt(take) : 0;

    var commentaires = await getAllCommentairesUseCase.execute();

    if (skipping)
      commentaires = commentaires.slice(
        skipping,
        skipping + commentaires.length
      );
    if (taking) commentaires = commentaires.slice(0, taking);

    res.json({ commentaires });
  }
  async getCommentaire(req, res) {
    const { id } = req.params;
    const commentaire = await client.commentaire.findFirst({
      where: {
        id: parseInt(id),
      },
    });
    res.json({ commentaire });
  }
  async updateCommentaire(req, res) {
    const { id, email, contenu, commentaireId } = req.body;
    const commentaire = {
      id,
      email,
      contenu,
      commentaireId,
    };
    var updatedCommentaire = undefined;
    try {
      updatedCommentaire = await client.commentaire.update({
        where: {
          id: commentaire.id,
        },
        data: {
          titre: commentaire.titre,
          contenu: commentaire.contenu,
          image: commentaire.image,
          updatedAt: commentaire.updatedAt,
          published: commentaire.published,
          authorId: commentaire.authorId,
        },
      });
    } catch (error) {
      throw new Error("Commentaire Doesn't Exists");
    }
    res.json({
      status: "UPDATED",
      message: "Commentaire " + id + " updated successfuly",
      commentaire: updatedCommentaire,
    });
  }
}
module.exports = CommentaireController;
