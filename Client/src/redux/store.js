import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import { walletslice } from "./walletSlice";

const store = configureStore({
    reducer: {
        users : userSlice.reducer,
        wallet: walletslice.reducer
    },
});

export default store;
