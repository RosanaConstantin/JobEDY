const { authJwt } = require("../middlewares");
const controller = require("../controllers/job.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/jobs", [authJwt.verifyToken], controller.jobBoard);
  app.post("/api/test/jobs", [authJwt.verifyToken], controller.saveJob);
  app.put("/api/test/jobs/update/:id", [authJwt.verifyToken], controller.updateJob);
  app.delete("/api/test/jobs/delete/:id", [authJwt.verifyToken], controller.deleteJob);
  app.get("/api/test/jobs/:id", [authJwt.verifyToken], controller.jobInfo);
};
