const controller = require("../controllers/application.controller");
const { authJwt } = require("../middlewares");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/test/applications",[authJwt.verifyToken], 
    controller.allApplications
  );

  app.get("/api/test/applications/:id",[authJwt.verifyToken],  controller.getApplication);
  app.get("/api/test/applications?username=:username",[authJwt.verifyToken],  controller.getApplicationByUser);
  // app.get("/api/test/applications?profileId=:profileId",[authJwt.verifyToken],  controller.getApplicationByProfile);
  app.get("/api/test/applications?jobId=:id",[authJwt.verifyToken],  controller.deleteApplicationByJob);
  app.put("/api/test/applications/:id",[authJwt.verifyToken],  controller.updateApplication);
  app.delete("/api/test/applications/:id",[authJwt.verifyToken],  controller.deleteApplication);
  app.post("/api/test/applications",[authJwt.verifyToken],  controller.saveApplication);
};
