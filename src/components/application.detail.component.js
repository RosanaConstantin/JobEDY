import React, { useReducer, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import JobService from "../services/job.service";
import AuthService from "../services/auth.service";
import ProfileService from "../services/profile.service";
import ApplicationService from "../services/application.service";
import ApplicationDetailPage from "./application.detail.page.component";
const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
}
const ApplicationDetail = ({ match }) => {
  const {
    params: { id }
  } = match;
  let history = useHistory();
  const [job, setJob] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [currentUser, setUser] = useState();
  const [profile, setProfile] = useState();
  const [application, setApplication] = useState();

  const [formData, setFormData] = useReducer(formReducer, {});
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);
    if (!currentUser.profileId) {
      setProfile(null);
    } else {
      ProfileService.getProfile(currentUser.profileId)
        .then(response => {
          setProfile(response.data);
          setLoading(true);
          setError(false);
          ApplicationService.getApplication(id)
            .then(response => {
              setApplication(response.data);
              setLoading(false)
              JobService.getJob(response.data.jobId)
                .then(resp => {
                  setJob(resp.data);
                })
            })
        })
    }
  }, [id]);

  const handleDeleteApplication = () => {
    setTimeout(() => {
      ApplicationService.deleteApplication(id)
        .then(
          response => {
          },
          error => {

          }
        );

      history.push("/applications")
    }, 3000);
  }

  const handleApplicationStatusChange = () => {
    setUpdate(true);
  }
  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      ApplicationService.updateApplication(formData, id).then(
        response => {
          history.push(`/applications/${id}`)
        },
        error => { }
      );
      setFormData({
        reset: true
      })
      setUpdate(false);
    }, 3000);
  }
  const handleChange = event => {
    const isCheckbox = event.target.type === 'checkbox';
    setFormData({
      name: event.target.name,
      value: isCheckbox ? event.target.checked : event.target.value,
    })
  }
  return (
    <>
      <Link to={`/applications`}>
        <button>Back</button></Link>
      {loading && (
        <div style={{ color: `green` }}>
          loading job detail for application ID: <strong>{id}</strong>
        </div>
      )}
      {error && (
        <div style={{ color: `red` }}>
          some error occurred, while fetching api
        </div>
      )}
      {profile && job && application && <ApplicationDetailPage application={application} job={job} user={profile} />}


      {profile && !profile.recruiterProfile && application &&
        <div style={{ color: `red` }}>
          <p>Your application status is {application.status}. You can cancel it.</p>
          <button onClick={handleDeleteApplication}>Cancel</button>
        </div>
      }

      {profile && profile.recruiterProfile && application &&

        <button onClick={handleApplicationStatusChange}>Update application status!</button>
      }
      {update &&
        <form onSubmit={handleSubmit}>
          <fieldset disabled={submitting}>
            <label>
              <p>Status
                <select name="status" onChange={handleChange} value={formData.status || application.status}>
                  <option value="">--Please choose an option--</option>
                  <option value="New">New</option>
                  <option value="In review">In review</option>
                  <option value="Interview">Interview</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select></p>

            </label>
            <label>
              <p>Comments
                <input name="message" onChange={handleChange} value={formData.message || ""} /></p>
            </label>
          </fieldset>
          <button type="submit" disabled={submitting}>Submit</button>
        </form>
      }
    </>
  );
};

export default ApplicationDetail
