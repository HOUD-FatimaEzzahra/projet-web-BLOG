const express = require("express");
require("dotenv").config();

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const { articlesRouter } = require("./routes/articles");
const { usersRouter } = require("./routes/users");
const { commentairesRouter } = require("./routes/commentaires");
const { categoriesRouter } = require("./routes/categories");

app.use("/articles", articlesRouter);
app.use("/users", usersRouter);
app.use("/commentaire", commentairesRouter);
app.use("/categorie", categoriesRouter);

app.listen(process.env.PORT || 4000, () => console.log("Running on port 4k"));
