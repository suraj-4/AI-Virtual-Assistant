import React, { useState, useContext } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {userDataContext} from "../context/UserContext"
import authBG from "../assets/auth-bg.jpg";
import { IoEye, IoEyeOff } from "react-icons/io5";

function SignUp() {
  const [showPass, setShowPass] = useState(false);
  const {serverUrl} = useContext(userDataContext);
  const navigate = useNavigate();
  const [name, setName]=useState("");
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [err, setErr]=useState();
   const [loading, setLoading]=useState(false);

const handleSignUp = async (e) => {
  e.preventDefault();
  setErr('');
  setLoading(true);
  try {
    const result = await axios.post(
      `${serverUrl}/api/auth/signup`,
      { name, email, password },
      { withCredentials: true }
    );
    setLoading(false);
    console.log("Signup success:", result.data);
  } catch (error) {
    setLoading(false);
    console.error("Signup error:", error.response?.data || error.message);
    setErr(error.response.data.message);
  }
};

  return (
    <div className='w-full h-[100vh] bg-cover flex justify-center items-center' style={{backgroundImage:`url(${authBG})`}}>
      <div className='w-[90%] h-[600px] max-w-[500px] px-[40px] py-[30px] bg-[#2a090966] backdrop-blur shadow-lg- shadow-red flex flex-col items-center justify-center gap-[40px]'>
        <h2 className='text-white text-[30px] font-semibold'>
          Register to 
          <span className='text-red-600'> AI Virtual Assistent</span>
        </h2>
        <form onSubmit={handleSignUp} className='w-full flex flex-col items-center justify-center gap-[20px]'>
            <input type="text" placeholder='Enter your name'  onChange={(e)=>setName(e.target.value)} value={name} className='w-full text-white outline-none border-2 border-white bg-transparent px-[20px] py-[10px] rounded-full text-[18px]' />
            <input type="email" placeholder='Email'  onChange={(e)=>setEmail(e.target.value)} value={email} className='w-full text-white outline-none border-2 border-white bg-transparent px-[20px] py-[10px] rounded-full text-[18px]' />

            <div className='w-full text-white border-2 border-white bg-transparent  rounded-full text-[18px] relative'>
              <input type={showPass?"text":"password"} placeholder='Password'  onChange={(e)=>setPassword(e.target.value)} value={password} className='w-full h-full outline-none px-[20px] py-[10px]'/>
              {!showPass && <IoEye className='absolute top-[15px] right-[20px] cursor-pointer' onClick={()=>setShowPass(true)}/>}
              {showPass && <IoEyeOff className='absolute top-[15px] right-[20px] cursor-pointer' onClick={()=>setShowPass(false)}/>}
            </div>
            {err && err.length > 0 && <p className='text-red-500'>*{err}</p>}
            <button
              className="min-w-[150px] h-[50px] mt-[30px] text-black font-semibold bg-white rounded-full text-[18px] cursor-pointer 
              hover:bg-black hover:text-white hover:scale-105 transition-all duration-300" disabled={loading}
            > {loading ? "Loading..." : "Sign Up"}
            </button>

            <p className='text-white text-[18px]'>Already have an account ?  <span className='text-blue-400 cursor-pointer' onClick={()=>navigate("/login")}>Login</span>
            </p>
        </form>

      </div>
    </div>
  )
}

export default SignUp
