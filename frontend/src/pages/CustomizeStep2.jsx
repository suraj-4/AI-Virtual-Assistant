import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext';

function CustomizeStep2() {
  const {userData} = useContext(userDataContext);
  const [assistantName, setAssistantName] = useState(
    userData?.assistantName || ""
  );

  return (
    <div className='w-[full] h-[100vh] bg-gradient-to-t from-[#030326] to-[#1167f2] px-2 py-10 flex flex-col items-center justify-center'>
      <h2 className='text-white text-4xl text-center font-bold'>Enter Your <span className='text-[#030326]'>Assistant Name</span></h2>
      <div className='w-[90%] md:w-[50%] lg:w-[30%] mx-auto mt-10'>
        <input type="text" placeholder='eg. Jarvis' className='w-full text-white outline-none border-2 border-white bg-transparent px-[20px] py-[10px] rounded-full text-[18px]' 
        onChange={(e)=>setAssistantName(e.target.value)} value={assistantName}/>

        {assistantName && 
          <div className='text-center'> 
            <button className="min-w-[300px] h-[50px] mt-[30px] text-black font-semibold bg-white rounded-full text-[18px] cursor-pointer 
                  hover:bg-sky-600 hover:text-white hover:scale-105 transition-all duration-300" >
                      Finally Create Your Assistant
            </button>
          </div>
        }

      </div>
      
    </div>
  )
}

export default CustomizeStep2
