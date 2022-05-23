const express = require("express");
const { UserGame, UserGameBiodata } = require("../models");
const dummyAdmin = [];

const router = express.Router();

router.get("/", async (req, res) => {
  const abc = await UserGame.findAll();
  const jumlahUser = abc.length;

  res.render("pages/home/index", { jumlahUser });
});

router.get("/admin/create", (req, res) => {
  res.render("pages/admin/create");
});

router.get("/admin", (req, res) => {
  UserGame.findAll({
    order: [["username", "ASC"]],
  }).then((usergames) => {
    res.render("pages/admin/index", {
      pageTitle: "Daftar User",
      usergames,
    });
  });
});

router.get("/admin/:id", async (req, res) => {
  const { id } = req.params;
  const detail = await UserGame.findOne({
    where: {
      id: id,
    },
    include: "UserGameBiodata",
  });
  res.render("pages/admin/show", {
    pageTitle: `${UserGame.username} Data`,
    detail,
  });
});

router.get("/api/user", async (req, res) => {
  const allUser = await UserGame.findAll({
    include: "UserGameBiodata",
  });
  res.status(200).json(allUser);
});

router.get("/admin/:id/edit", async (req, res) => {
  const usergame = await UserGame.findOne({
    where: { id: req.params.id },
    include: "UserGameBiodata",
  });
  res.render("pages/admin/edit", {
    pageTitle: "Edit User",
    usergame,
  });
});

router.put("/admin/edit/:id", async (req, res) => {
  const userGame = await UserGame.update(
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    },
    { where: { id: req.params.id } }
  );

  await UserGameBiodata.update(
    {
      userGameId: userGame.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
    },
    { where: { userGameId: req.params.id } }
  );
  res.redirect("/");
});

// add Data
router.post("/admin/create", async (req, res) => {
  const userGame = await UserGame.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  await UserGameBiodata.create({
    userGameId: userGame.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
  });
  res.redirect("/");
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
  res.render("pages/login/login", { layout: "layouts/login" });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  dummyAdmin.push({
    email,
    password,
  });
  console.log(dummyAdmin);
  if (email === "admin@admin.com" && password === "admin") {
    res.redirect("/");
  } else {
    res.redirect("/");
  }
});

module.exports = router;
