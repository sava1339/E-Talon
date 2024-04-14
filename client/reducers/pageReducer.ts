import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { userInterface } from '../src/types/types'

type pageState = {
    page:number,
    personal:boolean,
    scand:boolean,
    user:userInterface,
    uid:string,
    backgroundDark:boolean,
    miniLogo:boolean,
    showChangePassword: boolean
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
    scand:false,
    user:{
        key: "",
        info: 0,
        isKeyUsed: 0,
        name:"",
        schoolClass: "",
        payment: 0,
        username: "",
    },
    uid:"",
    backgroundDark:false,
    miniLogo:false,
    showChangePassword:false
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
        },
        setBackgroundDark: (state,action:PayloadAction<boolean>) =>{
            state.backgroundDark = action.payload
        },
        setMiniLogo: (state,action:PayloadAction<boolean>) =>{
            state.miniLogo = action.payload
        },
        setScand: (state, action:PayloadAction<boolean>)=>{
            state.scand = action.payload;
        },
        setShowChangePassword:(state, action:PayloadAction<boolean>)=>{
            state.showChangePassword = action.payload;
        },
    }
})

export const {setPage, setPersonal,setUser,setBackgroundDark,setMiniLogo,setScand, setShowChangePassword} = pageReducer.actions;

export default pageReducer.reducer;