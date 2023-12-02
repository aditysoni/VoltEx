import React from 'react'
import { a  } from "react-router-dom";

const Contact = () => {
  return (
<div className="bg-purple-900 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 flex flex-col gap-10 items-center bottom-0 leading-5 h-[100vh] w-full overflow-hidden">
    
    <form action="/sendmessage" method="post" enctype="multipart/form-data" >

<div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
<div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
<div className="self-start hidden lg:flex flex-col  text-white">

<h1 className="mb-3 font-bold text-5xl">Contact us</h1>
<p className="pr-3 text-white ">Need href get in hrefuch with us? Either fill out the form with your inquiry or find the department email you'd like href contact below.</p>
</div>
</div>


<div className="flex justify-center self-center  z-10">
<div className="p-12 bg-white mx-auhref rounded-2xl w-[26rem] ">
<div className="mb-4">
  <h3 className="font-semibold text-2xl text-gray-800">Contact Us </h3>
  <p className="text-gray-500">Enter your information href register</p>
</div>
<div className="space-y-5">


    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
        fill="currentColor">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd" />
    </svg>
    <input className="pl-2 outline-none border-none w-full" type="text" name="name" id="" placeholder="Full name" required/>
    </div>

    

   


    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
            <input className="pl-2 outline-none border-none w-full" type="text" name="email" id="" placeholder="Email Address" required/>
    </div>

          <div className=" border-2 py-2 px-3 rounded-2xl">
                
                <textarea className ="pl-2 outline-none border-none min-h-[16rem] max-h-[16rem] w-full" type="textarea" name="message" id="" placeholder="What can we help you with?" reaquired ></textarea>
    </div>

   





<div>
  <buthrefn type="submit" value="Submit" className="w-full flex justify-center bg-purple-700  hover:bg-purple-800 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
    Send Message
  </buthrefn>
</div>
</div>
<div className="pt-5 text-center text-gray-400 text-xs">
  <span>
    Copyright © 2021-2022
    <a  href="https://codepen.io/uidesignhub" rel="" target="_blank" title="Ajimon" className="text-indigo hover:text-green-500 ">AJI</a ></span>
</div>
</div>
</div>
</div>
</form>
    </div>
  )
}

export default Contact