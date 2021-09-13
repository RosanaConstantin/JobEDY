import React, { useReducer, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import AuthService from "../services/auth.service";
import "react-datepicker/dist/react-datepicker.css";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import ProfileService from "../services/profile.service";
// import Popup from "./gdpr.component";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import SmoothList from 'react-smooth-list';
import useInputFile from 'use-input-file';

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

const ProfileForm = (id) => {
    const currentUser = AuthService.getCurrentUser();
    let history = useHistory();
    const { ref, files } = useInputFile();

    useEffect(() => {
        if (id) {
            ProfileService.getProfile(currentUser.profileId).then(
                response => {
                    setProfile(response.data)
                },
                error => {
                }
            )
        }
    }, [files]);
    const [formData, setFormData] = useReducer(formReducer, {});
    const [country, setCountry] = useState();

    const [profile, setProfile] = useState({
        "prename": "",
        "name": "",
        "email": "",
        "phone": "",
        "country": "",
        "birthDate": "",
        "gender": "",
        "region": "",
        "type": "",
        "department": "",
        "industry": "",
        "experience": "",
        "education": "",
        "skills": "",
        "recruiterProfile": false
    });
    const [region, setRegion] = useState();
    const [submitting, setSubmitting] = useState(true);

    const handleSubmit = event => {

        formData.username = currentUser.username;
        event.preventDefault();
        setSubmitting(true);

        setTimeout(() => {
            setSubmitting(false);
            console.log(id)
            if (id.match.params.id) {
                ProfileService.updateProfile(formData, currentUser.profileId).then(
                    response => { },
                    error => { }
                );
            } else {
                ProfileService.saveProfile(formData).then(
                    response => { },
                    error => { }
                );
            }

            setFormData({
                reset: true
            })
            history.push("/profile")
        }, 3000);
    }
    const handleChange = event => {
        const isCheckbox = event.target.type === 'checkbox';
        setFormData({
            name: event.target.name,
            value: isCheckbox ? event.target.checked : event.target.value,
        })
    }
    const handleGDPRChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.checked
        })
        if (!event.target.checked) {
            setSubmitting(true);
        } else {
            setSubmitting(false)
        }
    }
    return (
        <div className="wrapper">
            <h1>Complete your profile</h1>
            <form onSubmit={handleSubmit}>
                <SmoothList>
                    <fieldset disabled={submitting}>
                        <label>
                            <p>First name
                                <input name="prename" onChange={handleChange} value={formData.prename || profile.prename} /></p>
                        </label>
                    </fieldset>
                    <fieldset disabled={submitting}>
                        <label>
                            <p>Last name
                                <input name="name" onChange={handleChange} value={formData.name || profile.name} /></p>
                        </label>
                    </fieldset>
                    <fieldset disabled={submitting}>
                        <label>
                            <p>Email
                                <input name="email" onChange={handleChange} value={formData.email || profile.email} /></p>
                        </label>
                    </fieldset>
                    <fieldset disabled={submitting}>
                        <label>
                            <p>Birthdate
                                <input name="birthDate" onChange={handleChange} value={formData.birthDate || profile.birthDate}></input></p>
                        </label>
                    </fieldset>
                    <fieldset disabled={submitting}>
                        <label>
                            <p>Gender
                                <select name="gender" onChange={handleChange} value={formData.gender || profile.gender}>
                                    <option value="">--Please choose an option--</option>
                                    <option value="female">Female</option>
                                    <option value="Male">Male</option>
                                    <option value="Other">Other</option>
                                </select></p>
                        </label>
                    </fieldset>
                    <fieldset disabled={submitting}>
                        <label>
                            <p>Phone
                                <PhoneInput
                                    placeholder="Enter phone number"
                                    value={formData.phone || profile.phone}
                                    onChange={(phone) => formData.phone = phone} /></p>
                        </label>
                    </fieldset>
                    <fieldset disabled={submitting}>
                        <label>
                            <p>Location
                                <CountryDropdown
                                    value={country || profile.country}
                                    onChange={(country) => {
                                        formData.country = country;
                                        setCountry(country);
                                    }
                                    } />
                                <RegionDropdown
                                    country={country || profile.country}
                                    value={region || profile.region}
                                    onChange={(region) => {
                                        formData.region = region;
                                        setRegion(region);
                                    }} />
                            </p>
                        </label>
                    </fieldset>
                    <h3 style={{"margin":"25px"}}>Professional experience</h3>
                    <fieldset disabled={submitting}>
                        <label>
                            <p>Job type
                                <select name="type" onChange={handleChange} value={formData.type || profile.type}>
                                    <option value="">--Please choose an option--</option>
                                    <option value="full-time">Full-time</option>
                                    <option value="part-time">Part-time</option>
                                </select></p>
                        </label>
                    </fieldset>
                    <fieldset disabled={submitting}>
                        <label>
                            <p>Department
                                <input name="department" onChange={handleChange} value={formData.department || profile.department} /></p>
                        </label>
                    </fieldset>
                    <fieldset disabled={submitting}>
                        <label>
                            <p>Industry
                                <input name="industry" onChange={handleChange} value={formData.industry || profile.industry} /></p>
                        </label>
                    </fieldset>
                    <fieldset disabled={submitting}>
                        <label>
                            <p>Experience
                                <input type="number" name="experience" onChange={handleChange} value={formData.experience || profile.experience} /></p>
                        </label>
                    </fieldset>
                    <fieldset disabled={submitting}>
                        <label>
                            <p>Education
                                <input name="education" onChange={handleChange} value={formData.education || profile.education} /></p>
                        </label>
                    </fieldset>
                    <fieldset disabled={submitting}>
                        <label>
                            <p>Skills

                                <input name="skills" onChange={handleChange} value={formData.skills || profile.skills} />
                            </p>
                        </label>
                    </fieldset>

                    <fieldset disabled={submitting}>
                        <label>
                            <p>Looking for

                                <input name="lookingFor" onChange={handleChange} value={formData.lookingFor || profile.lookingFor} />
                            </p>
                        </label>
                    </fieldset>

                    <fieldset disabled={submitting}>
                        <label>
                            <p>   Recruter profile<input type="checkbox" name="recruiterProfile" onChange={handleChange} checked={formData.recruiterProfile || false} />
                             

                            </p>
                        </label>
                    </fieldset>
                    <fieldset disabled={submitting}>
                        <label>
                            <p>Upload your CV file
                                <input ref={ref}></input>
                            </p>
                        </label>
                    </fieldset >
                    {/* {profile && <Popup />} */}
                    <fieldset>
                    <label>
                        <p> <input type="checkbox" name="gdprCheck" onChange={handleGDPRChange} checked={formData.gdprCheck || false} />
                            You agree to Jobedy's storage and processing my personal data.

                        </p>
                    </label>
                    </fieldset>
                    <button type="submit" disabled={submitting}>Submit</button>
                </SmoothList>
            </form>
        </div>
    )
}

export default ProfileForm;
