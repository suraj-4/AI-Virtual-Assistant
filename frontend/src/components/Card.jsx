import React, { useContext } from 'react'
import { userDataContext } from '../context/UserContext';

function Card({image}) {
    const {
        serverUrl,
        userData, 
        setUserData,
        frontendImage, setFrontendImage,
        backendImage, setBackendImage,
        selectedImage, setSelectedImage
    } = useContext(userDataContext);


  return (
    <div className={`w-[100px] h-[150px] lg:w-[200px] lg:h-[300px] bg-[#030326] border-2 border-[#ffffff] rounded-2xl overflow-hidden cursor-pointer 
    hover:scale-105 transition-transform duration-300 hover:shadow-md hover:shadow-[#0097e3] ${selectedImage===image? "border-4 border-blue-950 scale-105" : null}`}
    onClick={()=>setSelectedImage(image)}>
      <img src={image} alt="agent" className='w-full h-full object-cover'/>
    </div>
  )
}

export default Card
