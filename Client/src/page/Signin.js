import { useEffect, useState } from "react";
import "../index.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import {message} from "antd"


const Signin = () => {

  const navigate  = useNavigate();

  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [Aadhar, setaadhar] = useState();
  const [phone, setphone] = useState();
  const [maxquantity, setquantity] = useState();
  const [pincode, setpincode] = useState();
  const [password, setpassword] = useState();


  const saveuser = async (e) => {
     e.preventDefault();
   
    const data = {
      name,
      email,
      Aadhar,
      phone,
      walletAddress,
      maxquantity,
      pincode,
      password,
    }


    try {
      const res = await axios.post("http://localhost:9000/api/auth/signup",data)  
      console.log(res.data);
      if(res){
        message.success("user registered")
      }
      navigate('/login')

      
    } catch (error) {
       console.log(error);
       message.error("please fill the form correctly")
    } 

  }

  //------------------------------------------------------------------------------------------------------------------------------------------

  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  }, [walletAddress]);

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* MetaMask is installed */
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setWalletAddress("");
      console.log("Please install MetaMask");
    }
  };

  //-----------------------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      {/* <!-- component --> */}

      <div className="bg-purple-900 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 bottom-0 leading-5 h-full w-full overflow-hidden">
     

    <div class="flex justify-center min-h-screen">
      

        <div class="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5 ">
        <div className="bg-white p-[3rem] rounded-2xl">

        <div class="w-full ">
                <h1 class="text-2xl font-semibold tracking-wider text-black capitalize dark:text-black">
                    Sign In
                </h1>

                <p class="mt-4 text-gray-400">
                    Let’s get you all set up so you can verify your personal account and begin setting up your profile.
                </p>

                

                <form class="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                    <div>
                        
                  <input
                  className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                  type=""
                  placeholder="Name"
                  onChange={(e) => setname(e.target.value)}
                  />
                    </div>

                    <div>
                        
                        <input type="email" placeholder="Email address" className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400" onChange={(e) => setemail(e.target.value)}/>
                    </div>

                    <div>
                        
                        <input type="text" placeholder="Adhar number" className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"  onChange={(e) => setaadhar(e.target.value)}/>
                    </div>

                    <div>
                      
                        <input type="text" placeholder="Phone number" className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400" onChange={(e) => setphone(e.target.value)}/>
                    </div>

                    <div>
                      
                        <input type="text" placeholder="Wallet Address" className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400" 
                  value={walletAddress ? walletAddress : ""} />
                    </div>

                    <div>
                       
                        <input type="text" placeholder="Quantity (KWh)" className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400" onChange={(e) => setquantity(e.target.value)}/>
                    </div>
                    <div>
                      
                        <input type="text" placeholder="Pincode" className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400" onChange={(e) => setpincode(e.target.value)}/>
                    </div>

                    <div>
                     
                        <input type="password" placeholder="Password" className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"  onChange={(e) => setpassword(e.target.value)} />
                    </div>

                    

                   

                    <button
                        class="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-purple-800 rounded-md hover:bg-purple-700 focus:outline-none focus:ring focus:purple-blue-600 focus:ring-opacity-50" onClick={connectWallet}  type="submit">
                        <span className="is-link has-text-weight-bold">
                    {walletAddress && walletAddress.length > 0
                      ? `Connected: ${walletAddress.substring(
                          0,
                          6
                        )}...${walletAddress.substring(38)}`
                      : "Connect Wallet"}
                  </span>

                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>

                    <button
                        class="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-purple-800 rounded-md hover:bg-purple-700 focus:outline-none focus:ring focus:purple-blue-600 focus:ring-opacity-50" onClick={saveuser} type="submit">
                        <span>Sign in </span>

                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>
                </form>
            </div>

        </div>
           
        </div>
    </div>

      </div>
      {/* </div> */}
      {/* </div> */}
    </>
  );
};

export default Signin;
