import React, { useState } from 'react'
import { login } from '../firebase/config'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate=useNavigate()

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
  
    const handleSubmit= async (e)=>{
      e.preventDefault();
      const user= await login(email,password)
      if(user){
        navigate("/",{replace:true})
      }

  
    }
    return (

        <div className="sign_up">
        <h1 className="text-center text-white font-bold text-3xl mt-4">
          SIGN IN
        </h1>
        <form
          className="max-w-xl mx-auto grid gap-y4 p-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-sm font-medium text-white">Email</label>
            <div className="mt-1">
              <input
                type="email"
                className="shadow-sm px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-white mt-2">
              Password
            </label>
            <div className="mt-1">
              <input
                type="password"
                className="shadow-sm px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="*******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            className="bg-black mt-4 disabled:opacity-50 cursor-pointer text-white px-4 py-2  rounded-md"
            disabled={!email || !password}
            type="submit"
          >
            Sign In
          </button>
      </form>
      </div>

    )
}

export default Login