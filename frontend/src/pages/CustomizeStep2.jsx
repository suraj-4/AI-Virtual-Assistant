import React, { useContext, useState } from 'react'
import axios from 'axios';
import { userDataContext } from '../context/UserContext';
import { RiArrowGoBackLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom'


function CustomizeStep2() {
  const {        
    serverUrl,
    userData, 
    setUserData,
    frontendImage, setFrontendImage,
    backendImage, setBackendImage,
    selectedImage, setSelectedImage
  } = useContext(userDataContext);
  const [assistantName, setAssistantName] = useState(
    userData?.assistantName || "");
  const navigator = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleUpdateAssistant = async() => {
    try{
      let formData = new FormData();
      formData.append("assistantName", assistantName);
      if(backendImage){
        formData.append("assistantImage", backendImage);
      }else{
        formData.append("imageUrl", selectedImage);
      }
      const result = await axios.post(`${serverUrl}/api/users/update`, formData, 
        {withCredentials: true});

      setUserData(result.data);
      console.log("Assistant updated:", result.data);
    }catch(error){
      console.error("Error updating assistant:", error);
    }
  }

  return (
    <div className='w-[full] h-[100vh] bg-gradient-to-t from-[#030326] to-[#1167f2] px-2 py-10 flex flex-col items-center justify-center relative'>
      <RiArrowGoBackLine className='text-white text-2xl cursor-pointer absolute top-[50px] left-[50px]' onClick={()=>navigator("/customize")}/>
      <h2 className='text-white text-4xl text-center font-bold'>Enter Your <span className='text-[#030326]'>Assistant Name</span></h2>
      <div className='w-[90%] md:w-[50%] lg:w-[30%] mx-auto mt-10'>
        <input type="text" placeholder='eg. Jarvis' className='w-full text-white outline-none border-2 border-white bg-transparent px-[20px] py-[10px] rounded-full text-[18px]' 
        onChange={(e)=>setAssistantName(e.target.value)} value={assistantName}/>

        {assistantName && 
          <div className='text-center'> 
            <button className="min-w-[300px] h-[50px] mt-[30px] text-black font-semibold bg-white rounded-full text-[18px] cursor-pointer 
                  hover:bg-sky-600 hover:text-white hover:scale-105 transition-all duration-300" disabled={loading}
                  onClick={handleUpdateAssistant} >
                  {!loading ? "Finally Create Your Assistant" : "loading..."}
            </button>
          </div>
        }

      </div>
      
    </div>
  )
}

export default CustomizeStep2
