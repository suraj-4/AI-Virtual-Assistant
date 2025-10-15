import React, { useContext } from 'react'
import UserContext, { userDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
    const {userData,serverUrl,setUserData} = useContext(userDataContext);
    const navigator = useNavigate();

    const handleLogOut = async()=>{
      try{
        const result = await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true});
        setUserData(null);
        navigator("/signup");
      }catch(err){
        setUserData(null);
        console.log(err);
      }
    }


  return (
    <div className='w-[full] h-[100vh] bg-gradient-to-t from-[#030326] to-[#1167f2] px-2 py-10 relative'>
      <div className='flex justify-between items-center mb-5 px-5'>
        <button
          className="min-w-[100px] py-2 px-4  text-black font-semibold bg-white rounded-full text-[18px] cursor-pointer 
          hover:bg-sky-600 hover:text-white hover:scale-105 transition-all duration-300"
          onClick={()=>navigator("/customize")}
        > Customize Assistant
        </button>
        <button
          className="min-w-[100px] py-2 px-4 text-black font-semibold bg-white rounded-full text-[18px] cursor-pointer 
          hover:bg-sky-600 hover:text-white hover:scale-105 transition-all duration-300"
          onClick={handleLogOut()}
        > Logout
        </button>
      </div>

      <div className='flex justify-center items-center flex-col gap-10'>
        <div className='w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg shadow-[#0097e3]'>
          <img src={userData?.assistantImage} alt="" className='h-full object-cover'/>
        </div>
        <h1 className='text-white text-2xl text-center font-semibold'>Hello, I am your {userData?.assistantName}</h1>
      </div>
    </div>
  )
}

export default Home
