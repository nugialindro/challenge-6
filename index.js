const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const router = require("./router");

const PORT = 8000;

const app = express();

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("public"));

app.use(expressLayouts);
app.set("layout", "./layouts/app");
app.set("view engine", "ejs");

app.use((req, res, next) => {
  res.locals.url = req.originalUrl;
  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
