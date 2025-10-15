import React, { useState, useContext } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {userDataContext} from "../context/UserContext"
import authBG from "../assets/ai-assistant-bg.webp";
import { IoEye, IoEyeOff } from "react-icons/io5";

function Login() {
  const [showPass, setShowPass] = useState(false);
  const {serverUrl,setUserData} = useContext(userDataContext);
  const navigate = useNavigate();
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [err, setErr]=useState();
  const [loading, setLoading]=useState(false);

const handleLogin = async (e) => {
  e.preventDefault();
  setErr('');
  setLoading(true);
  try {
    const result = await axios.post(
      `${serverUrl}/api/auth/login`,
      { email, password },
      { withCredentials: true }
    );
    setUserData(result.data);
    setLoading(false);
    navigate("/");
    console.log("Login success:", result.data);
  } catch (error) {
    setLoading(false);
    setUserData(null);
    console.error("Login error:", error.response?.data || error.message);
    setErr(error.response.data.message);
  }
};

  return (
    <div className='w-full h-[100vh] bg-cover flex justify-center items-center' style={{backgroundImage:`url(${authBG})`}}>
      <div className='w-[90%] h-[600px] max-w-[500px] px-[40px] py-[30px] bg-[#2a090966] backdrop-blur shadow-lg- shadow-red flex flex-col items-center justify-center gap-[40px]'>
        <h2 className='text-white text-[30px] font-semibold'>
          Login to 
          <span className='text-sky-400'> AI Virtual Assistent</span>
        </h2>
        <form onSubmit={handleLogin} className='w-full flex flex-col items-center justify-center gap-[20px]'>
            <input type="email" placeholder='Email'  onChange={(e)=>setEmail(e.target.value)} value={email} className='w-full text-white outline-none border-2 border-white bg-transparent px-[20px] py-[10px] rounded-full text-[18px]' />

            <div className='w-full text-white border-2 border-white bg-transparent  rounded-full text-[18px] relative'>
              <input type={showPass?"text":"password"} placeholder='Password'  onChange={(e)=>setPassword(e.target.value)} value={password} className='w-full h-full outline-none px-[20px] py-[10px]'/>
              {!showPass && <IoEye className='absolute top-[15px] right-[20px] cursor-pointer' onClick={()=>setShowPass(true)}/>}
              {showPass && <IoEyeOff className='absolute top-[15px] right-[20px] cursor-pointer' onClick={()=>setShowPass(false)}/>}
            </div>
            {err && err.length > 0 && <p className='text-red-500'>*{err}</p>}
            <button
              className="min-w-[150px] h-[50px] mt-[30px] text-black font-semibold bg-white rounded-full text-[18px] cursor-pointer 
              hover:bg-sky-600 hover:text-white hover:scale-105 transition-all duration-300" disabled={loading}
            > {loading ? "Loading..." : "Login"}
            </button>

            <p className='text-white text-[18px]'>Want to create a New account ?  <span className='text-sky-400 cursor-pointer' onClick={()=>navigate("/signup")}>Sign Up</span>
            </p>
        </form>

      </div>
    </div>
  )
}

export default Login;
