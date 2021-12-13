import { createAction,props } from "@ngrx/store";
import { usuario } from "../models/usuario.model";

export const setUser=createAction('[Auth] setUser',
props<{user:usuario}>());

export const unSetUser=createAction('[Auth] unSetUser');