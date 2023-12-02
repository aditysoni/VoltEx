import React,{useState,useEffect} from 'react'
import axios from"axios"

const MarkTra = () => {


  const [transaction , setTransaction] = useState([]);


  const transactions = async ()=>{


      try {

        const res  = await axios.get("http://localhost:9000/api/auth/markettra");

         console.log(res.data)
         setTransaction(res.data)
        
      } catch (error) {
           
        console.log(error)
      }   
  }


  useEffect(()=>{
          transactions();
  },[])
  return (
    <>
        <div className="bg-purple-900 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 flex flex-col gap-10 items-center bottom-0 leading-5 h-[100vh] w-full overflow-hidden">
          {/* <!-- component --> */}
          <div className='text-white text-4xl mt-[10rem] font-bold'>
           Marketplace  Transaction History
          </div>
        
<div className="md:px-32 py-8 w-full">
  <div className="shadow overflow-hidden  rounded-2xl border-b border-gray-200">
    <table className="min-w-full bg-white">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">Buyer</th>
          <th className=" w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">Seller</th>
          <th className="w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">Total amount </th>
          <th className=" w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">Pincode</th>
        </tr>
      </thead>

    <tbody className="text-gray-700">

      {transaction.map((item,index)=>(

                  <tr key={index} >
                  <td className="w-1/4 text-left py-3 px-4">{item.buyerWallet}</td>
                  <td className="w-1/4 text-left py-3 px-4">{item.sellerWallet}</td>
                  <td className=" text-left py-3 px-4">{item.price}</td>
                  <td className=" text-left py-3 px-4">{item.pincode}</td>
                  
                 
          
                  
                
          
                 
                </tr>
      ))}

  


  
      
      
    </tbody>
    </table>
  </div>
</div>
</div>
    </>
  )
}

export default MarkTra