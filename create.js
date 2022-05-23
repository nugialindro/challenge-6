const { UserGameHistory } = require("./models");

UserGameHistory.create({
  userGameId: 58,
  score: 7960,
}).then((UserGameHistory) => {
  console.log(UserGameHistory);
});
