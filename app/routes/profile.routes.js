const { authJwt } = require("../middlewares");
const controller = require("../controllers/profile.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/test/profile/:id", [authJwt.verifyToken], controller.profileInfo);
  app.post("/api/test/profile", [authJwt.verifyToken], controller.saveProfile);
  app.put("/api/test/profile/:id", [authJwt.verifyToken], controller.updateProfile);
};
