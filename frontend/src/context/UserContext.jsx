import React, { createContext, useEffect, useState } from 'react';
import axios from "axios";
export const userDataContext = createContext();
function UserContext({children}) {
    const serverUrl = "http://localhost:5000"
    const [userData, setUserData] = useState(null);
    const [frontendImage, setFrontendImage] = useState(null);
    const [backendImage, setBackendImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const handleCurrentUser = async ()=>{
      try{
        const result = await axios.get(`${serverUrl}/api/users/current`,{withCredentials : true});
        setUserData(result.data);
        console.log(result.data);
      }catch(error){
        console.log(error);
      }
    }

    useEffect(()=>{
      handleCurrentUser();
    },[]);

    const value ={
      serverUrl,
      userData, 
      setUserData,
      frontendImage, setFrontendImage,
      backendImage, setBackendImage,
      selectedImage, setSelectedImage
    }
  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  )
}

export default UserContext;
