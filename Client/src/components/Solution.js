import React from 'react'
import ReducedDemand from "../image/reducedDemand.jpg"
import Incentives from "../image/incentives2.jpg"
import Transparence from "../image/transparence.jpg"
import Energy from "../image/energy.jpg"
import Image3 from "../image/Suyash.jpg"
import Image4 from "../image/block.png"
import Herosection from './Herosection';
const Solution = () => {
  return (
    <>
    {/* <Herosection/> */}
    <section  className="bg-purple-900  bg-gradient-to-b from-purple-800 via-purple-800 to-gray-900 bottom-0 leading-5 h-full w-full ">
    <div className='text-center pt-[5rem] text-5xl font-bold text-white'>Our Solution</div>
  <div
    className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8"
  >
   

    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
      <a
        className="block rounded-xl flex flex-col text-center p-8 shadow-2xl transition hover:border-yellow-800/20 hover:shadow-yellow-400/20"
        href="/services/digital-campaigns">
       <img src={ReducedDemand} className='w-[80%] h-[18rem] ml-auto mr-auto rounded-xl' alt=""  />

        <h2 className="mt-4 text-3xl font-bold text-white">Reduced Demand</h2>

        <p className="mt-1 text-m text-gray-300">
         Demand satisfied by optimal energy allocation
        </p>
      </a>
      <a
        className="block rounded-xl flex flex-col text-center p-8 shadow-2xl transition hover:border-yellow-800/20 hover:shadow-yellow-400/20"
        href="/services/digital-campaigns">
       <img src={Incentives} className='w-[80%] h-[18rem] ml-auto mr-auto rounded-xl' alt="" />

        <h2 className="mt-4 text-3xl font-bold text-white">Incentive</h2>

        <p className="mt-1 text-m text-gray-300">
          Second income stream for traders.
        </p>
      </a>
      <a
        className="block rounded-xl flex flex-col text-center p-8 shadow-2xl transition hover:border-yellow-800/20 hover:shadow-yellow-400/20"
        href="/services/digital-campaigns">
       <img src={Transparence} className='w-[80%] h-[18rem] ml-auto mr-auto rounded-xl' alt="" />

        <h2 className="mt-4 text-3xl font-bold text-white">Oversight</h2>

        <p className="mt-1 text-m text-gray-300">
          Transparency provided through blockchain
        </p>
      </a>
      <a
        className="block rounded-xl flex flex-col text-center p-8 shadow-2xl transition hover:border-yellow-800/20 hover:shadow-yellow-400/20"
        href="/services/digital-campaigns">
       <img src={Energy} className='w-[80%] h-[18rem] ml-auto mr-auto rounded-xl' alt="" />

        <h2 className="mt-4 text-3xl font-bold text-white">Renewable</h2>

        <p className="mt-1 text-m text-gray-300">
          Abundant solar energy available for trading
        </p>
      </a>
      
     
    </div>
  </div>
</section>
    </>
  )
}

export default Solution