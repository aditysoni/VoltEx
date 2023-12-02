import React,{useState} from 'react'
import axios from 'axios';
import { useSelector } from "react-redux";
import { CloseCircleOutlined } from "@ant-design/icons";
import { message } from 'antd';

const Formau = () => {

 
 
  const {walletAdd} = useSelector((state)=> state.wallet);
  const { user } = useSelector((state) => state.users);
 
  

  const [walletAddress , setwalletAddress] = useState(walletAdd);
  const [pincode , setPincode] = useState();
  const [minPrice , setMinPrice] = useState();
  const [maxunit , setMaxunit] = useState();
  const [users , setusers] = useState(user)
 
  

   const Placebid = async (e)=>{

      e.preventDefault();

        try {
          
            const data  = {walletAddress ,pincode , minPrice ,maxunit, users};
            

            const order = await axios.post("http://localhost:9000/api/auth/auctionord" , data);

            if(order){
               message.success("order placed")
               setTimeout(()=>{
                window.location.reload()
               },1000)
               console.log("order placed")
            }else{
               console.log("order failed to placed ")
            }

            

        } catch (error) {
             console.log(error)
        }
   }


  return (
    <>
    <div className=" absolute top-[5rem] w-[30%] z-[1000]">
    <form class="w-full max-w-sm mx-auto  bg-white p-8 rounded-md shadow-md">
    <button className='p-5'>
        <CloseCircleOutlined />
        Cancel
      </button>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Name</label>
        <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="text" id="name" name="name" value={user}/>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Wallet Address</label>
        <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="text" id="name" name="name" value={walletAdd}/>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Pincode</label>
        
        <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="text" id="pincode" name="pincode" placeholder="Pincode"     onChange={(e)=>setPincode(e.target.value)}/>
      </div>
      
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Max Unit (kwh)</label>
        <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="text" id="password" name="password" placeholder="Max Unit (kwh)"  onChange={(e)=>setMaxunit(e.target.value)}  />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">minPrice</label>
        <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="text" id="password" name="password" placeholder="Max Unit (kwh)"  onChange={(e)=>setMinPrice(e.target.value)}  />
      </div>

       
      {/* <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="confirm-password">Price</label>
        <input class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="text" id="confirm-password" name="confirm-password" placeholder="Price"    onChange={(e)=>setPrice(e.target.value)} />
      </div> */}
      
      <button
        class="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
        type="submit"  onClick={Placebid} > Add Order</button>

        <button
        class=" mt-4 w-full bg-red-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
        type="submit">Cancel Order</button>
        
    </form>
    </div>
    </>
  )
}

export default Formau;