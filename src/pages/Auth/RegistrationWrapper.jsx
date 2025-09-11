import React, {useState} from "react";

import GetDetails from "./GetDetails";
import LivePhoto from "./LivePhoto";
import Aadhaar from "./Aadhaar";
import HeightWeight from "./PhysicalDetails";
import Register from "./Register";

import {API} from '../../api/api'
import { useNavigate } from "react-router-dom";

export default function RegistrationWrapper(){
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        otp: "",
        name: "",
        password: "",
        dob: "",
        address: "",
        phone: "",
        weight: "",
        height: "",
        gender: "",
        livePhotoUrl: null,
        aadhaarPhotoUrl: null
    });

    const [step, setStep] = useState(1);

    const nextStep = setStep(step+1);
    const prevStep = setStep(step-1);

    const handleSubmit = async() =>{
        try{
            const data = FormData()
            for(key in formData){
                if(formData[key] !== null){
                    data.append(key, formData[key]);
                }
            }
            const res = await API.post("/user/register", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("Registration Successful ✅", res.data);
            alert("Registration successful!");
            navigate("/login");
        }
        catch(err){
            console.log(err.response?.data)
            alert(err.response?.data?.message || "Registration failed ❌")
        }
    }
    
    switch(step){
        case 1:
            return <Register formData={formData} setFormData={setFormData} nextStep={nextStep} />;
        
        case 2:
            return <GetDetails formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;        
        case 3:
            return <HeightWeight formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
        case 4:
            return <LivePhoto formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;

        case 5:
            return <Aadhaar formData={formData} setFormData={setFormData} prevStep={prevStep} handleSubmit={handleSubmit} />;
        
        default:
            return null;
    }
}