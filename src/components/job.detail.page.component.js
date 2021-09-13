import React from "react";
import SmoothList from 'react-smooth-list';

const JobDetailPage = ({ job }) => {
  return (
    <section>
      <div>
        <div>
        <SmoothList>
          <h3>
            <strong> {job.name}</strong>
          </h3>
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
          </SmoothList>
        </div>
      </div>
    </section>
  );
};

export default JobDetailPage;
