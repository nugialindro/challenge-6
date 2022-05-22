const express = require("express");
const methodOverride = require("method-override");
const { UserGame, UserGameBiodata } = require("../models");
const dummyAdmin = [];

const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/home/index");
});

router.get("/admin/create", (req, res) => {
  res.render("pages/admin/create");
});

router.get("/admin", (req, res) => {
  UserGame.findAll({
    order: [["username", "ASC"]],
  }).then((usergames) => {
    res.render("pages/admin/index", {
      pageTitle: "Daftar Supplier",
      usergames,
    });
  });
});

router.get("/admin/:id", (req, res) => {
  UserGame.findOne({
    where: { id: req.params.id },
  }).then((UserGame) => {
    res.render("pages/admin/show", {
      pageTitle: `${UserGame.username} Data`,
      UserGame,
    });
  });
});

router.get("/admin/:id/edit", async (req, res) => {
  const usergame = await UserGame.findOne({
    where: { id: req.params.id },
  });

  const usergamebiodata = await UserGameBiodata.findAll({
    order: [["firstName", "ASC"]],
  });

  res.render("pages/admin/edit", {
    pageTitle: "Edit User",
    usergame,
    usergamebiodata,
  });
});

router.put("/admin/:id", (req, res) => {
  const { username, email, password } = req.body;

  UserGame.update(
    {
      username,
      email,
      password,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then(() => {
    res.redirect("/admin");
  });
});

// add Data
router.post("/admin/create", (req, res) => {
  const { username, email, password } = req.body;

  UserGame.create({
    username,
    email,
    password,
  }).then(() => {
    res.redirect("/");
  });
});

router.delete("/admin/:id", (req, res) => {
  UserGame.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => {
    res.redirect("/");
  });
});

// LOGIN
router.get("/login", (req, res) => {
  res.render("pages/login/login");
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  dummyAdmin.push({
    email,
    password,
  });
  console.log(dummyAdmin);
  if (email === "admin@admin.com" && password === "admin") {
    res.redirect("/pages/home/index");
  } else {
    res.redirect("/");
  }
});

module.exports = router;
