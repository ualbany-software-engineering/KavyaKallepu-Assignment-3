const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const multer = require('multer');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // POST for registring 
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail
    ], multer({ dest: 'temp/' }).single('avatar'),
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};
