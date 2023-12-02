import Logout from "../Logout";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message } from "antd";

const Auctbids = () => {
  const productid = useParams().id;
  const receiverwallet = useParams().walletAddress;
  const biditem = useParams().index;
  const bidowner = useParams().owner;

  const pincode = useParams().pincode;

  const navigate = useNavigate();

  const [completedTransactions, setCompletedTransactions] = useState(() => {
    // Initialize from localStorage on component mount
    const storedData = localStorage.getItem("completedAucBid");
    return storedData ? JSON.parse(storedData) : [];
  });

  // const [completedTransactions, setCompletedTransactions] = useState(()=>{
  //     const prevdata =   localStorage.getItem("completedBidsTransactions");
  //     return prevdata ? JSON.parse(prevdata):[];
  // });

  // console.log(receiver)

  // console.log(productid)

  const [status, setStatus] = useState(false);
  const [bids, setBids] = useState([]);

  // console.log(bids)

  const { user } = useSelector((state) => state.users); // Extracting user from the Redux state
  const { walletAdd } = useSelector((state) => state.wallet); // Extracting wallet address

  const getbids = async () => {
    // console.log("getbids function")

    try {
      const res = await axios.get(
        "http://localhost:9000/api/auth/bids/" + productid
      );

      // console.log(res.data)

      // console.log(res.data[0])

      setBids(res.data);
      // console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getbids();
  }, [productid]);







  const AcceptBid = async (senderwallet, amount) => {

      
         if(walletAdd !== receiverwallet ){
          message.error("you are not the owner")
         } else{
               

    try {
      // Check if MetaMask is installed
      if (window.ethereum) {
        console.log("MetaMask is installed");
        // Request access to the user's Ethereum accounts
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Accounts:", accounts);

        // Set sender and receiver addresses
        const senderAddress = senderwallet;
        const receiverAddress = receiverwallet;

        // Convert amount to Wei (assuming amount is in Ether)
        // const amountInWei = ethers.parseUnits(amount.toString(), 'ether');
        // console.log('Amount in Wei:', amountInWei);

        // // Convert amountInWei to string
        // const amountInWeiString = amountInWei.toString();

        // Open MetaMask with a transaction request
        await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: senderAddress,
              to: receiverAddress,
              value: amount.toString(), // Use the string representation
            },
          ],
        });

        // console.log('Transaction Done');

        // setTransactionStatus('success');

        setCompletedTransactions((prev) => [...prev, parseInt(biditem)]);

        setTimeout(() => {
          message.success("Transaction successful!");
        }, 10000);

        setTimeout(() => {
          navigate("/auction");
        }, 13000);


        setTimeout(()=>{
          Tranaction(senderwallet,receiverwallet,amount/10000000000000,pincode); 
        },10000)


      } else {
        console.error("MetaMask is not installed");
      }
    } catch (error) {
      console.error('Error handling "Buy" click:', error);
      // setTransactionStatus('failure');
    }
  }
  };

  
  const Tranaction = async (buyerWallet,  sellerWallet, price , pincode)=>{

    try {
     const res = axios.post("http://localhost:9000/api/auth/auctra",{buyerWallet,  sellerWallet, price , pincode} )


      if(res){
        message.success("Transaction saved")
      }


          console.log("Transaction saved")
     
    } catch (error) {
       console.log("Trsansaction not saved")
    } 
 }






  //to initialsixe the storage
  useEffect(() => {
    localStorage.setItem(
      "completedAucBid",
      JSON.stringify(completedTransactions)
    );
  }, [completedTransactions]);

  console.log(completedTransactions);

  return (
    <div className="bg-purple-900 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 flex flex-col gap-10 items-center bottom-0 leading-5 h-[100vh] w-full overflow-hidden">
      {/* <!-- component --> */}

      {/* <Logout /> */}

      {/* <div className="bg-gray-200 p-4 absolute right-0 top-20 rounded-lg shadow-md h-18px">
        <p>{user}</p>
      </div> */}

      <div className="bg-gray-200 p-4  right-0 mt-[4rem]  rounded-lg shadow-md h-18px">
        <p>User : {user}</p>
          <p>Wallet: {walletAdd}</p>
        </div>

     
      <div className="text-yellow-400 text-5xl  font-bold">Bids</div>

      <div className="bg-gray-200 p-4  right-0  rounded-lg shadow-md h-18px">
        <p>Owner name : {bidowner}</p>
        <p>Owner wallet : {receiverwallet}</p>
      </div>


      {/* <a
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
            Add Orders
          </span>
        </a> */}

      <div className="md:px-32 py-8 w-full">
        <div className="shadow overflow-hidden  rounded-2xl border-b border-gray-200">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-800 text-white ">
              <tr>
                <th className="w-1/5 text-center py-3 px-4 uppercase font-semibold text-sm">
                  Wallet Address
                </th>
                <th className=" w-1/5 text-center py-3 px-4 uppercase font-semibold text-sm">
                  Offer Price
                </th>
                {/* <th className="w-1/5 text-center py-3 px-4 uppercase font-semibold text-sm">
                    Unit (kwh){" "}
                  </th>
                  <th className="w-1/5 text-center py-3 px-4 uppercase font-semibold text-sm">
                    minPrice
                  </th> */}
                <th className="w-1/5 text-center py-3 px-4 uppercase font-semibold text-sm">
                  HighestBid
                </th>
                {/* <th className=" w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">
                    Bid
                  </th> */}
                {/* <th className=" w-1/5 text-left py-3 px-4 uppercase font-semibold text-sm">
                    Bid Status
                  </th> */}
              </tr>
            </thead>
            <tbody className="text-gray-700">

              {  bids.length===0 ? <div className="p-5 text-red">No Bid placed Till Now</div> :    bids.map((value, index) => (
                <tr key={index}>
                  <td className="w-1/9 text-center py-3 px-4">
                    {value.bidderwallet}
                  </td>
                  <td className="w-1/9 text-center py-3 px-4">
                    <a className="hover:text-blue-500" href="tel:622322662">
                      {value.bidAmount}
                    </a>
                  </td>
                  <td className="w-1/9 text-center">
                    <button
                      onClick={() =>
                        AcceptBid(value.bidderwallet, value.bidAmount* 10000000000000, index)
                      }
                      type="button"
                      class= { `${walletAdd === receiverwallet ? "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 " : "focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 me-2  mt-1 dark:bg-red-600 dark:hover:bg-red-600 dark:focus:ring-red-900"} `}


                      disabled={ walletAdd !== receiverwallet }
                    >
                      Accept Offer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Auctbids;
