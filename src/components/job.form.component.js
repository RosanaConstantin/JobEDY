import React, { useReducer, useState, useEffect, useStyles } from 'react';
import { useHistory } from "react-router-dom";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import JobService from '../services/job.service';
import SmoothList from 'react-smooth-list';
const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

const JobForm = (jobData) => {

    let history = useHistory();
    const [formData, setFormData] = useReducer(formReducer, {});
    const [country, setCountry] = useState();
    const [region, setRegion] = useState();
    const [submitting, setSubmitting] = useState(false);
    const [job, setJob] = useState({
        "name": "",
        "description": "",
        "company": "",
        "region": "",
        "country": "",
        "status": "",
        "remote": false,
        "type": "",
        "department": "",
        "industry": "",
        "experience": "",
        "openPositions": "",
        "skills": ""
    });
    useEffect(() => {
        if (jobData && jobData.match.params.id) {
            JobService.getJob(jobData.match.params.id).then(
                response => {
                    setJob(response.data)
                },
                error => {
                }
            )
        }
    }, jobData.match.params.id);

    const handleSubmit = event => {
        event.preventDefault();
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            if (jobData && jobData.match.params.id) {
                JobService.updateJob(formData, job._id).then(
                    response => {

                        history.push(`/jobs/${job._id}`)
                    },
                    error => { }
                );
            } else {
                JobService.saveJob(formData).then(
                    response => {

                        history.push("/jobs")
                    },
                    error => { }
                );
            }

            setFormData({
                reset: true
            })
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
        <div className="wrapper">
            <SmoothList>
            <h1>Job position</h1>
            <form onSubmit={handleSubmit} >
                <fieldset disabled={submitting}>
                    <label>
                        <p>Job name
                            <input name="name" onChange={handleChange} value={formData.name || job.name} /></p>
                    </label>
                </fieldset>
                <fieldset disabled={submitting}>
                    <label>
                        <p>Description
                            <textarea name="description" onChange={handleChange} value={formData.description || job.description} /></p>
                    </label>
                </fieldset>
                <fieldset disabled={submitting}>
                    <label>
                        <p>Company
                            <input name="company" onChange={handleChange} value={formData.company || job.company} /></p>
                    </label>
                </fieldset>
                <fieldset disabled={submitting}>
                    <label>
                        <p>Status
                            <select name="status" onChange={handleChange} value={formData.status || job.status}>
                                <option value="">--Please choose an option--</option>
                                <option value="open">Open</option>
                                <option value="pending">Pending</option>
                                <option value="closed">Closed</option>
                            </select></p>
                    </label>
                </fieldset>
                <fieldset disabled={submitting}>
                    <label>
                        <p>Location
                            <CountryDropdown
                                value={country || job.country}
                                onChange={(country) => {
                                    formData.country = country;
                                    setCountry(country);
                                }
                                } />
                            <RegionDropdown
                                country={country || job.country}
                                value={region || job.region}
                                onChange={(region) => {
                                    formData.region = region;
                                    setRegion(region);
                                }} />
                        </p>
                    </label>
                </fieldset>
                <fieldset>
                    <label>
                        <p>Job type
                            <select name="type" onChange={handleChange} value={formData.type || job.type}>
                                <option value="">--Please choose an option--</option>
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part-time</option>
                            </select></p>
                    </label>
                </fieldset>
                <fieldset disabled={submitting}>
                    <label>
                        <p>Department
                            <input name="department" onChange={handleChange} value={formData.department || job.department} /></p>
                    </label>
                </fieldset>
                <fieldset disabled={submitting}>
                    <label>
                        <p>Industry
                            <input name="industry" onChange={handleChange} value={formData.industry || job.industry} /></p>
                    </label>
                </fieldset>
                <fieldset disabled={submitting}>
                    <label>
                        <p>Open positions
                            <input type="number" name="openPositions" onChange={handleChange} value={formData.openPositions || job.openPositions} /></p>
                    </label>
                </fieldset>
                <fieldset disabled={submitting}>
                    <label>
                        <p>Experience required
                            <input type="number" name="experience" onChange={handleChange} value={formData.experience || job.experience} /></p>
                    </label>
                </fieldset>
                <fieldset disabled={submitting}>
                    <label>
                        <p>Skills

                            <textarea name="skills" onChange={handleChange} value={formData.skills || job.skills} />
                        </p>
                    </label>

                </fieldset>
                <fieldset disabled={submitting}>
                    <label>
                        <p>Remote
                            <input type="checkbox" name="remote" onChange={handleChange} checked={formData.remote || false} />
                        </p>
                    </label>

                </fieldset >
                <button type="submit" disabled={submitting}>Submit</button>
            </form>
            </SmoothList>
        </div>
    )
}

export default JobForm;
