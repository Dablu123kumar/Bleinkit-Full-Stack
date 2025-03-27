import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    addressList : []
}

const addrssSlice = createSlice({
    name : 'address',
    initialState : initialValue,
    reducers : {
        handleAddAddress : (state,action)=>{
            state.addressList = [...action.payload]
        }
    }
})

export const {handleAddAddress} = addrssSlice.actions

export default addrssSlice.reducer