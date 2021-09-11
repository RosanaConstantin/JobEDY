import React from "react";
import SmoothList from 'react-smooth-list';


const ApplicationDetailPage = ({ application, job, user }) => {

  return (
    <section>
      <div>

      <SmoothList>
        <div>
        <h3>
            <strong >Candidate </strong>
          </h3>
          <p><strong>Last Name: </strong> {user.name}</p>
          <p><strong>First Name: </strong> {user.prename}</p>
          <p><strong>Skills: </strong> {user.skills}</p>
          <p><strong>Experience: </strong> {user.experience}</p>
          <p><strong>Matching score: </strong> {application.matching ? application.matching : "not ready"}</p>
        </div>
        <div>
        <h3>
            <strong>Job description </strong>
          </h3>
          <p>
            <strong>Job name: </strong> {job.name}
          </p>
          <p>
            <strong>Departament: </strong> {job.department}
          </p>
          <p>
            <strong>Description: </strong> {job.description}
          </p>
          <p>
            <strong>Company: </strong> {job.company}
          </p>
          <p>
            <strong>Industry: </strong> {job.industry}
          </p>
          <p>
            <strong>Location: </strong> {job.region ? job.region + ", " + job.country : job.country}
          </p>
          <p>
            <strong>Type:</strong> {job.type}
          </p>
          <p>
            <strong>Experience required:</strong> {job.experience}
          </p>
          <p>
            <strong>Open positions:</strong> {job.openPositions}
          </p>
          <p>
            <strong>Skills required:</strong> {job.skills}
          </p>
          <p>
            <strong>Remote: </strong> {job.remote ? job.remote.toString() : "false"}
          </p>
        </div>
        
        </SmoothList>
      </div>
    
    </section>
  );
};

export default ApplicationDetailPage;
