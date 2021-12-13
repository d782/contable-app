import { createReducer,on } from "@ngrx/store";
import {isLoading,stopLoading}  from "./ui.actions";

export interface State{
    isLoading:boolean,
}

export const initialSate:State={
    isLoading:false,
}

const _uiReducer=createReducer(initialSate,
  on(isLoading, state=>({...state, isLoading:true})),
  on(stopLoading,state=>({...state, isLoading:false}))  
);

export function uiReducer(state:any, action:any){
    return _uiReducer(state,action);
}
