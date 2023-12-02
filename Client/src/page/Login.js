import React from 'react'
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import {message} from "antd"

const Login = () => {

 const [email, setemail] = useState();
 const [password,setpassword] = useState();

 const navigate  = useNavigate();

 axios.defaults.withCredentials = true;

const authenticate = async (e)=>{

    e.preventDefault();
     
    try {
         const res =  await axios.post("http://localhost:9000/api/auth/login",{email,password})

         if(res.data){
          message.success("user loged in")
         }
        
           navigate("/market")

       

    } catch (error) {
         console.log(error);
         message.error("user does not exist");
    }
}

  return (
    <>
         <div className="bg-purple-900 absolute top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 bottom-0 leading-5 h-full w-full overflow-hidden"></div>
      <div className="relative   min-h-screen  sm:flex sm:flex-row  justify-center bg-transparent rounded-3xl shadow-xl">
        <div className="flex-col flex  self-center lg:px-14 sm:max-w-4xl xl:max-w-md  z-10">
          <div className="self-start hidden lg:flex flex-col  text-gray-300">
            <h1 className="my-3 font-semibold text-4xl">Welcome back</h1>
            <p className="pr-3 text-sm opacity-75">
              Lorem ipsum is placeholder text commonly used in the graphic,
              print, and publishing industries for previewing layouts and visual
              mockups
            </p>
          </div>
        </div>
        <div className="flex justify-center self-center  z-10">
          <div className="p-12 bg-white mx-auto rounded-3xl w-96 ">
            <div className="mb-7">
              <h3 className="font-semibold text-2xl text-gray-800">Login In </h3>
              <p className="text-gray-400">
                Don't have an account?{" "}
                <a
                  href="#"
                  className="text-sm text-purple-700 hover:text-purple-700">
                  Sign Up
                </a>
              </p>
            </div>

            <div className="space-y-6">
             
               

                <input  onChange= {(e)=> setemail(e.target.value)}
                  className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                  type=""
                  placeholder="Email"
                />

             

                <input   onChange= {(e)=> setpassword(e.target.value)}
                  className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                  type="password"
                  placeholder="Password"
                />
                
            </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm ml-auto">
                  <a href="#" className="text-purple-700 hover:text-purple-600">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
              <button
                  type="submit"
                  className="w-full flex justify-center bg-purple-800 mt-4 hover:bg-purple-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500">
                  Connect Wallet
                </button>
                <button  onClick={authenticate}
                  type="submit"
                  className="w-full flex justify-center bg-purple-800 mt-4 hover:bg-purple-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500">
                  Login in
                </button>
              </div>

              <div className="flex justify-center gap-5 w-full "></div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Login