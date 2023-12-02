import { createSlice } from '@reduxjs/toolkit'

export  const walletslice  = createSlice({

    name: "walletslice",

    initialState : {
        walletAdd :null
    },

     reducers:{
        setwallet(state,action){
            state.walletAdd = action.payload
        }
     }
})

export const {setwallet} = walletslice.actions

export default walletslice.reducer


