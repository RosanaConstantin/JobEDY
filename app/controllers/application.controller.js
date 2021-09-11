// const config = require("../config/auth.config");
const db = require("../models");
const Application = db.application;
// const Role = db.role;

exports.allApplications = (req, res) => {
  // res.status(200).send("Applicarion Content.");
  Application.find({}, function (err, apps) {
    res.send(apps);
  });
};

exports.deleteApplicationByJob = (req, res) => {
  Application.find({jobId: res.query.id}, function (err, apps) {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!apps) {
      return;
    }
    const ids = [];
    _.forEach(apps, (item) => {
      if (req.query.id === item.jobId)
        ids.push(item.jogId)
    })

    Application.deleteMany({ _id: ids }, function (err, resp) {
      res.status(200).send();
    })

  });
};

exports.getApplicationByUser = (req, res) => {
  Application.findOne({ username: req.query.username }, function (err, apps) {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!app) {
      return;
    }
    res.status(200).send(app);
  });
};

exports.getApplication = (req, res) => {
  const id = req.params.id;
  Application.findById(id)
    .exec((err, app) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!app) {
        return;
      }
      res.status(200).send(app);
    });
};

exports.deleteApplication = (req, res) => {
  const id = req.params.id;
  Application.findByIdAndRemove(id)
    .exec((err, app) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!app) {
        return;
      }
      res.status(200).send();
    });
};

exports.saveApplication = async (req, res) => {
  const app = new Application({ ...req.body });
  app.save(async (err, app) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.status(200).send(app);
  }
  );
};

exports.updateApplication = async (req, res) => {
  const id = req.params.id;
  const app = req.body;
  Application.update({ _id: id }, { $set: app }, (err, application) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    // const user = await User.findOneAndUpdate({
    //   username: req.body.username
    // }, { profileId: profile._id });
    res.status(200).send(application);
  }
  );
};
