import React, { useContext, useRef, useState } from 'react'
import Card from '../components/Card'
import agentImage1 from '../assets/agent-1.webp'
import agentImage2 from '../assets/agent-2.webp'
import agentImage3 from '../assets/agent-3.webp'
import agentImage4 from '../assets/agent-4.webp'
import agentImage5 from '../assets/agent-5.webp'
import agentImage6 from '../assets/agent-6.webp'
import { RiImageAiFill } from "react-icons/ri";
import { RiArrowGoBackLine } from "react-icons/ri";

import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

function Customize() {
    const {
        serverUrl,
        userData, 
        setUserData,
        frontendImage, setFrontendImage,
        backendImage, setBackendImage,
        selectedImage, setSelectedImage
    } = useContext(userDataContext);
    const [loading, setLoading] = useState(false);

    const navigator = useNavigate();
    const inputImageRef = useRef();
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setBackendImage(file);
        setFrontendImage(URL.createObjectURL(file));
    };

  return (
    <div className='w-[full] bg-gradient-to-t from-[#030326] to-[#1167f2] px-2 py-10 relative'>
        <RiArrowGoBackLine className='text-white text-2xl cursor-pointer absolute top-[50px] left-[50px]' onClick={()=>navigator("/")}/>
    
        <h2 className='text-white text-4xl text-center font-bold'>Select Your <span className='text-[#030326]'>Assistant Image</span></h2>
        <div className='w-[100%] h-full md:w-[80%] lg:w-[70%] mx-auto flex items-center justify-center gap-4 lg:gap-10 p-10 flex-wrap'>
            <Card image={agentImage1}/>
            <Card image={agentImage2}/>
            <Card image={agentImage3}/>
            <Card image={agentImage4}/>
            <Card image={agentImage5}/>
            <Card image={agentImage6}/>

            <div className={`w-[100px] h-[150px] lg:w-[200px] lg:h-[300px] bg-[#030326] border-2 border-[#ffffff] rounded-2xl overflow-hidden cursor-pointer 
                hover:scale-105 transition-transform duration-300 hover:shadow-md hover:shadow-[#0097e3] flex flex-col items-center justify-center 
                ${selectedImage === "input" ? "border-4 border-blue-950 scale-105" : ""}`}
                onClick={()=>{
                    inputImageRef.current.click();
                    setSelectedImage("input");
                }}>
                {!frontendImage && <RiImageAiFill className='text-white w-[50px] h-[50px]' />}
                {frontendImage && <img src={frontendImage} alt="agent" className='w-full h-full object-cover' />}
            </div>

            <input type="file" accept='image/*' hidden ref={inputImageRef} onChange={handleImageChange}/>
        </div>
        {selectedImage && <div className='text-center'> 
            <button
                onClick={()=>navigator("/customize-step-2")}
                className="min-w-[150px] h-[50px] mt-[30px] text-black font-semibold bg-white rounded-full text-[18px] cursor-pointer 
                hover:bg-sky-600 hover:text-white hover:scale-105 transition-all duration-300" disabled={loading}>
                    {!loading ? "Next" : "loading..."}
            </button>
        </div>}


    </div>

  )
}

export default Customize
