// const config = require("../config/auth.config");
const db = require("../models");
const Job = db.job;

exports.jobBoard = (req, res) => {
    // res.status(200).send("Job Content.");
    Job.find({}, function (err, jobs) {
        res.status(200).send(jobs);
    });
};

exports.jobInfo = (req, res) => {
    const id = req.params.id;

    Job.findById(id, function (err, job) {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (!job) {
            res.status(500).send({ message: "item null" });
            return;
        }
        res.status(200).send(job);
        return;
    });
};

exports.saveJob = async (req, res) => {
    const job = new Job({ ...req.body });
    job.save(async (err, job) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
    
      res.status(200).send(job);
    }
    );
  };
  
  exports.updateJob = async (req, res) => {
    const id = req.params.id;
    const job = req.body;
    Job.update({ _id: id }, { $set: job }, (err, job) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      // const user = await User.findOneAndUpdate({
      //   username: req.body.username
      // }, { profileId: profile._id });
      res.status(200).send(job);
    }
    );
  };

  exports.deleteJob = async (req, res) => {
    const id = req.params.id;
    Job.findByIdAndRemove(id)
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