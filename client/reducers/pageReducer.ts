import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { userInterface } from '../src/types/types'

type pageState = {
    page:number,
    personal:boolean,
    user:userInterface,
    uid:string
}
type setPersonalAction ={
    page:number,
    personal:boolean,
}
type setUserAction={
    user:userInterface,
    uid:string
}

const initialState:pageState = {
    page:0,
    personal:false,
    user:{
        key: "",
        info: 0,
        isKeyUsed: 0,
        name:"",
        schoolClass: "",
        payment: 0,
        username: "",
    },
    uid:""
}

const pageReducer = createSlice({
    name:"page",
    initialState,
    reducers:{
        setPage : (state,action:PayloadAction<number>) =>{
            state.page = action.payload;
        },
        setPersonal: (state,action:PayloadAction<setPersonalAction>) =>{
            state.page = action.payload.page;
            state.personal = action.payload.personal;
        },
        setUser: (state, action:PayloadAction<setUserAction>) =>{
            state.user = action.payload.user;
            state.uid = action.payload.uid;
        }
    }
})

export const {setPage, setPersonal,setUser} = pageReducer.actions;

export default pageReducer.reducer;