const dayjs = require("dayjs");
const { client } = require("./client");

class CategorieController {
  async createCategorie(req, res) {
    const { nom } = req.body;
    const createdCategorie = await client.categorie.create({
      data: {
        nom,
      },
    });
    res.json({
      categorie: createdCategorie,
    });
  }
  async deleteCategorie(req, res) {
    const { id } = req.params;
    try {
      await client.categorie.delete({
        where: {
          id: categorieId,
        },
      });
    } catch (error) {
      throw new Error("Categorie Doesn't Exists");
    }
    res.json({
      status: "DELETED",
      message: "Categorie: " + id,
    });
  }
  async getAllCategories(req, res) {
    const { skip, take } = req.query;

    const skipping = skip && parseInt(skip) > 0 ? parseInt(skip) : 0;
    const taking = take && parseInt(take) > 0 ? parseInt(take) : 0;

    var categories = await client.categorie.findMany({
      include: {
        _count: {
          select: { Articles: true },
        },
      },
    });

    if (skipping)
      categories = categories.slice(skipping, skipping + categories.length);
    if (taking) categories = categories.slice(0, taking);

    res.json({ categories });
  }
  async getCategorie(req, res) {
    const { id } = req.params;
    const getCategorieUseCase = new GetCategorieUseCase();
    const categorie = await client.categorie.findFirst({
      where: {
        id: parseInt(id),
      },
      include: {
        Articles: {
          include: {
            article: true,
          },
        },
      },
    });
    res.json({ categorie });
  }
  async updateCategorie(req, res) {
    const { id, nom } = req.body;
    const categorie = {
      id: id,
      nom: nom,
    };
    var updatedCategorie = undefined;
    try {
      updatedCategorie = await client.categorie.update({
        where: {
          id: categorie.id,
        },
        data: {
          nom: categorie.nom,
        },
      });
    } catch (error) {
      throw new Error("Categorie Doesn't Exists");
    }
    res.json({
      status: "UPDATED",
      message: "Categorie " + id + " updated successfuly",
      categorie: updatedCategorie,
    });
  }

  async addArticleCategorie(req, res) {
    const { articleId, categorieId } = req.body;
    const articleOnCategorie = await client.categoriesOnArticles.create({
      data: {
        categorieId,
        articleId,
      },
      include: {
        article: true,
        categorie: true,
      },
    });
    res.json({ articleOnCategorie });
  }

  async deleteArticleCategorie(req, res) {
    const { articleId, categorieId } = req.body;

    await client.categoriesOnArticles.delete({
      where: {
        articleId_categorieId: {
          articleId,
          categorieId,
        },
      },
    });
    res.json({
      status: "DELETED",
      message: `articleId: ${articleId}, categorieId: ${categorieId}`,
    });
  }
}
module.exports = CategorieController;
