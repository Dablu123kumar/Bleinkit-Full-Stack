import {createSlice} from '@reduxjs/toolkit'

const initialValue = {
    order : []

}

const orderSlice = createSlice({
    name : 'name',
    initialState : initialValue,
    reducers : {
        setOrder : (state,action)=>{
            state.order = [...action.payload]
        }
    }
})

export const { setOrder} = orderSlice.actions

export default orderSlice.reducer