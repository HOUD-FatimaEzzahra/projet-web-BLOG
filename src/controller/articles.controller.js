const dayjs = require("dayjs");
const { client } = require("./client");

class ArticleController {
  async createArticle(req, res) {
    const { titre, contenu, image, authorId, published } = req.body;
    const article = {
      titre: titre,
      contenu: contenu,
      image: image,
      published: published,
      authorId: authorId,
    };
    const createdArticle = await client.article.create({
      data: {
        ...article,
      },
    });
    res.json({
      article: createdArticle,
    });
  }

  async deleteArticle(req, res) {
    const { id } = req.params;
    try {
      await client.commentaire.deleteMany({
        where: {
          articleId: parseInt(id),
        },
      });
      await client.categoriesOnArticles.deleteMany({
        where: {
          articleId: parseInt(id),
        },
      });
      await client.article.delete({
        where: {
          id: parseInt(id),
        },
      });
      await deleteArticleUseCase.execute(parseInt(id));
    } catch (error) {
      throw new Error("Article Doesn't Exists");
    }
    res.json({
      status: "DELETED",
      message: "Article: " + id,
    });
  }

  async getAllUsers(req, res) {
    const { skip, take } = req.query;

    const skipping = skip && parseInt(skip) > 0 ? parseInt(skip) : 0;
    const taking = take && parseInt(take) > 0 ? parseInt(take) : 0;

    var articles = await client.article.findMany({
      include: {
        categories: {
          include: {
            categorie: {
              select: {
                nom: true,
              },
            },
          },
        },
      },
    });

    if (skipping)
      articles = articles.slice(skipping, skipping + articles.length);
    if (taking) articles = articles.slice(0, taking);

    res.json({ articles });
  }

  async getUser(req, res) {
    const { id } = req.params;
    const article = await client.article.findFirst({
      where: {
        id,
      },
      include: {
        categories: {
          include: {
            categorie: {
              select: {
                nom: true,
              },
            },
          },
        },
      },
    });
    res.json({ article });
  }
  async updateUser(req, res) {
    const { id, titre, contenu, image, authorId, published } = req.body;
    const article = {
      id: id,
      titre: titre,
      contenu: contenu,
      image: image,
      updatedAt: dayjs().toDate(),
      published: published,
      authorId: authorId,
    };
    var updatedArtcile = undefined;
    try {
      updatedArtcile = await client.article.update({
        where: {
          id: article.id,
        },
        data: {
          titre: article.titre,
          contenu: article.contenu,
          image: article.image,
          updatedAt: article.updatedAt,
          published: article.published,
          authorId: article.authorId,
        },
      });
    } catch (error) {
      throw new Error("Article Doesn't Exists");
    }
    res.json({
      status: "UPDATED",
      message: "Article " + id + " updated successfuly",
      article: updatedArtcile,
    });
  }
}
module.exports = ArticleController;
