import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./userSlice";
import { setwallet } from "./walletSlice";
import axios from "axios";



function ReduxUser({children}) {
    
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/auth/refetch", {
        withCredentials: true,
      });

      

      dispatch(setUser(res.data.username));
      dispatch(setwallet(res.data.walletAddress))
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

 const {user} = useSelector((state)=> state.users) 
 const {walletAdd} = useSelector((state)=> state.wallet)





  return (
    <div>
      <div>{children}</div>
    </div>
  );
}

export default ReduxUser;
