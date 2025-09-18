import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User{
    uid:string;
    displayName:string;
    photoURL:string;
    email:string;
}


const userSlice=createSlice({
    name:"User",
    initialState:{
        user:null as User | null,
    },
    reducers:{
        addUser(state,action:PayloadAction<User>){
            state.user=action.payload;
        },
        removeUser(state){
            state.user=null;
        }
    }
})

export const {addUser,removeUser}=userSlice.actions;
export default userSlice.reducer; 