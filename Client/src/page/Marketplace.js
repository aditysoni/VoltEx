import React, { useEffect, useState } from "react";
import { ethers} from 'ethers';
import { parseUnits } from "ethers";
import {message} from "antd"




import Navbar from "../components/Navbar";
import Form from "../components/Form";
import "../index.css";
import Logout from "../Logout";
import ReduxUser from "../redux/reduxUser";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

const Marketplace = () => {
  const [status, setStatus] = useState(false);
  const [order , setOrder] = useState([]);
  const [transactionStatus, setTransactionStatus] = useState(null);


    const [completedTransactions, setCompletedTransactions] = useState(() => {
    // Initialize from localStorage on component mount
    const storedData = localStorage.getItem("completedTransactions");
    return storedData ? JSON.parse(storedData) : [];
  });
  
  // console.log(completedTransactions)
  // const [disableBuyButton, setDisableBuyButton] = useState(false);


  const { user } = useSelector((state) => state.users); // Extracting user from the Redux state
  const { walletAdd } = useSelector((state) => state.wallet); // Extracting wallet address



   const orders = async ()=>{
     
      try {
        
        const allorders  = await axios.get("http://localhost:9000/api/auth/marketord")


        setOrder(allorders.data);
              //  console.log(allorders.data)
        
 
      } catch (error) {
        
      }
   }

    useEffect(()=>{
      orders()
    },[])


    const handleBuyClick = async (data, amount, index,pincode) => {

      console.log('Handling "Buy" click:', data, amount);
      console.log(index);


      if(data === walletAdd){
        message.error("You are the owner")
      }else{
    
      try {
        // Check if MetaMask is installed
        if (window.ethereum) {
          console.log('MetaMask is installed');
    
          // Request access to the user's Ethereum accounts
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          console.log('Accounts:', accounts);
    
          if (accounts.length === 0) {
            console.error('User denied permission to access Ethereum accounts');
            return;
          }
    
          // Set sender and receiver addresses
          const senderAddress = walletAdd;
          const receiverAddress = data;
    
          // Convert amount to Wei (assuming amount is in Ether)
          // const amountInWei = ethers.parseUnits(amount.toString(), 'ether');
          // console.log('Amount in Wei:', amountInWei);
    
          // // Convert amountInWei to string
          // const amountInWeiString = amountInWei.toString();
    
          // Open MetaMask with a transaction request
          await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [
              {
                from: senderAddress,
                to: receiverAddress,
                value: amount.toString() // Use the string representation
              },
            ],
          }
          
          );
    
          // console.log('Transaction Done');
          setCompletedTransactions(prev => [...prev, index]);
    
          setTransactionStatus('success');
    
          setTimeout(() => {
            message.success('Transaction successful!');
          }, 8000);
    
          setTimeout(() => {
              
            message.success('Order buyed');
          }, 9000);
 

           setTimeout(()=>{
                 Tranaction(walletAdd,data,amount/10000000000000,pincode); 
           },10000)
            
          
         // transaction save
          
        } else {
          console.error('MetaMask is not installed');
        }
      } catch (error) {
        console.error('Error handling "Buy" click:', error);
        setTransactionStatus('failure');
      }
    }
    };






    const Tranaction = async (buyerWallet,  sellerWallet, price , pincode)=>{

       try {
        const res = axios.post("http://localhost:9000/api/auth/marktra",{buyerWallet,  sellerWallet, price , pincode} )


         if(res){
           message.success("Transaction saved")
         }


             console.log("Transaction saved")
        
       } catch (error) {
          console.log("Trsansaction not saved")
       } 
    }







 

    
    useEffect(() => {
      localStorage.setItem("completedTransactions", JSON.stringify(completedTransactions));
    }, [completedTransactions]);

    // console.log(completedTransactions)
    



  return (
    <>
      <div className="bg-purple-900 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 flex flex-col gap-10 items-center bottom-0 leading-5 h-[100vh] w-full overflow-hidden">
        {/* <!-- component --> */}

        {/* <Logout /> */}

        {/* <div className="bg-gray-200 p-4 absolute right-0 top-20 rounded-lg shadow-md h-18px">
          <p>{user}</p>
        </div> */}

        <div className="bg-gray-200 p-4 mt-[4rem] right-0  rounded-lg shadow-md h-18px">
        <p>User : {user}</p>
          <p>Wallet: {walletAdd}</p>
        </div>

        <div className="text-yellow-300 text-4xl mt-[5px] font-bold">
          Market Place
        </div>
        

        <div className="flex gap-5">
        <a
          class="group relative inline-flex items-center overflow-hidden rounded bg-purple-700 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500"
          onClick={() => setStatus(true)}
        >
          <span class="absolute -end-full transition-all group-hover:end-4">
            <svg
              class="h-5 w-5 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>

          <span class="text-sm font-medium transition-all group-hover:me-4">
            Add Orders
          </span>

        </a>
        
        <a
          class="group relative inline-flex items-center overflow-hidden rounded bg-purple-700 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500"
         
        >
          <span class="absolute -end-full transition-all group-hover:end-4">
            <svg
              class="h-5 w-5 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>


          <span class="text-sm font-medium transition-all group-hover:me-4">
          <Link to={("/markTra")}>See transactions</Link>
          </span>
        </a>
        </div>


        {/* <button className="bg-red-500"><Link to={("/markTra")}>see transactions</Link></button> */}

        {status ? <Form /> : null}

        <div className="md:px-32 py-7 w-full">
          <div className="shadow overflow-hidden  rounded-2xl border-b border-gray-200">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-800 text-white">
               
                  <th className="w-1/6 text-center py-3 px-4 uppercase font-semibold text-sm">
                    Name
                  </th>
                  <th className="w-1/6 text-center py-3 px-4 uppercase font-semibold text-sm">
                    Wallet Address
                  </th>
                  <th className="w-1/6 text-center py-3 px-8 uppercase font-semibold text-sm">
                    Pincode
                  </th>
                  <th className="w-1/6 text-center py-3 px-8 uppercase font-semibold text-sm">
                    Max Unit (kwh){" "}
                  </th>
                  <th className="w-1/6 text-center py-3 px-8 uppercase font-semibold text-sm">
                    Price(₹)
                  </th>
                  <th className="w-1/6 text-center py-3 px-8 uppercase font-semibold text-sm">
                    Buy
                  </th>
               
              </thead>
              <tbody className="text-gray-700">

                {order.map((data,index)=>(
                    
               

                <tr key={index}>
                  <td className="w-1/6  py-3 px-4 text-center">{data.user}</td>
                  <td className="w-1/6  py-3 px-4 text-center">{data.walletaddre}</td>
                  <td className="w-1/6  py-3 px-4 text-center">{data.pincode}</td>
                  <td className="w-1/6  py-3 px-4 text-center">{data.maxunit}</td>
                  <td className="w-1/6  py-3 px-4 text-center">
                    <a className="hover:text-blue-500" href="tel:622322662">
                      {data.price}
                    </a>
                  </td>
                  <td className="w-1/6 text-center">

                  <a
                className={`inline-block rounded border ${
                  completedTransactions.includes(index)
                    ? 'bg-red-500 text-white cursor-not-allowed'
                    : 'border'
                } px-6 py-1 text-sm font-medium transition ${
                  completedTransactions.includes(index)
                    ? ''
                    : 'hover:scale-110 bg-green-500 text-white hover:shadow-xl hover:bg-green-500 hover:text-white'
                } focus:outline-none focus:ring active:text-indigo-500`}
                onClick={() =>
                  !completedTransactions.includes(index) &&
                  handleBuyClick(data.walletaddre, data.price * 10000000000000, index , data.pincode )
                }
              >
                      {completedTransactions.includes(index) ? 'Sold' : 'Buy'}
                    </a>
                  </td>
                </tr>

               ))} 

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Marketplace;
