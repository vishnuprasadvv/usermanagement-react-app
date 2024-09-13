import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart : (state)=>{
            state.loading = true;
        },
        signInSuccess : (state, action) =>{
            state.loading  = false;
            state.error = false;
            state.currentUser = action.payload
        },
        signInError :(state,action) =>{
            state.loading =false; 
            state.error = action.payload;
        },
        setToken : (state, action)=>{
            state.token = action.payload
        },
        signOut: (state)=>{
            state.currentUser = null
        },
        setCurrentUser :(state,action)=>{
            state.currentUser = action.payload
        }
        
    }
})

export const {signInError, signInStart, signInSuccess ,setToken ,signOut,setCurrentUser} = userSlice.actions;
export default userSlice.reducer;