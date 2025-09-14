import React, { createContext, useContext, useState } from "react";

const RegistrationContext = createContext();

export const RegistrationProvider = ({ children }) => {
  const [registrationData, setRegistrationData] = useState({
    fullName: "",
    password: "",
    dob: "",
    address: "",
    phone: "",
    height: "",
    weight: "",
    gender: "",
    livePhotoUrl: "",
    aadhaarPhotoUrl: "",
    signupToken: "",
  });

  // ✅ helper to update data
 const updateRegistrationData = (newData) => {
  setRegistrationData((prev) => {
    const updated = { ...prev, ...newData };
    console.log("Updated registrationData:", updated);
    return updated;
  });
};

  return (
    <RegistrationContext.Provider value={{ registrationData, updateRegistrationData }}>
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => useContext(RegistrationContext);
