import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import JobService from "../services/job.service";
import AuthService from "../services/auth.service";
import ProfileService from "../services/profile.service";
import ApplicationService from "../services/application.service";
import * as _ from "lodash";
import JobDetailPage from "./job.detail.page.component";

const JobDetail = ({ match }) => {
  const {
    params: { id }
  } = match;
  let history = useHistory();
  const [job, setJob] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentUser, setUser] = useState();
  const [profile, setProfile] = useState();
  const [application, setApplication] = useState();

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);
    if (!currentUser.profileId) {
      setProfile(null);
    } else {
      ProfileService.getProfile(currentUser.profileId).then(
        response => {
          setProfile(response.data)
        }
      );
    }
    ApplicationService.getApplicationBoard()
      .then(
        response => {
          const application = _.filter(response.data, (item => item.username === currentUser.username &&
            item.jobId === id))
          if (application.length !== 0) {
            setApplication(application[0])
          }
        }
      )
      .catch(
        error => {
          setApplication(null)
        }
      )
    const fetchJob = async () => {
      setLoading(true);
      setError(false);
      try {
        const resp = await JobService.getJob(id);
        setJob(resp.data)
        setLoading(false)
      } catch (error) {
        setError(true);

      }
    };
    fetchJob();
  }, [id]);

  const handleApplication = () => {
    setTimeout(() => {
      ApplicationService.saveApplication({
        status: "New",
        userId: currentUser.id,
        username: currentUser.username,
        firstname: profile.name,
        lastname: profile.prename,
        profileId: profile._id,
        jobId: id
      })
        .then(
          response => {
          },
          error => {

          }
        );
      //call catre aplicatia lui edi pentru matching point

      history.push("/jobs")
    }, 3000);

  }
  const handleJobDeletion = () => {
    setTimeout(() => {
            // ApplicationService.deleteApplicationsByJob(id)
            // .then(response => {
            // })
      JobService.deleteJob(id)
        .then(
          response => {
            // ApplicationService.deleteApplicationsByJob(id)
            // .then(response => {
            // })
          },
          error => {

          }
        );
      //call catre aplicatia lui edi pentru matching point

      history.push("/jobs")
    }, 3000);

  }

  return (
    <>
      <Link to={`/jobs`}><button>Back</button></Link>
      {loading && (
        <div style={{ color: `green` }}>
          loading job detail for job ID: <strong>{id}</strong>
        </div>
      )}
      {error && (
        <div style={{ color: `red` }}>
          some error occurred, while fetching api
        </div>
      )}
      {job && <JobDetailPage job={job} />}
      {profile && !profile.recruiterProfile && !application &&
        <button onClick={handleApplication}>Apply now!</button>
      }

      {profile && !profile.recruiterProfile && application &&
        <div style={{ color: `red` }}>
          You have already applied to this job

          <Link to={`/applications/${application._id}`}>
            <button>Check your application</button>
          </Link>
        </div>
      }

      {profile && profile.recruiterProfile &&
      <div>
          <button onClick={handleJobDeletion}>Delete job</button>

        <Link to={`/jobs/update/${id}`}>
          <button>Update job</button>
        </Link>
        </div>
      }
    </>
  );
};

export default JobDetail
