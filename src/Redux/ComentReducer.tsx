import { Firestore_instance } from "../DAL/Firestore_config";
import { app_actions } from "./AppReducer";
import { InferActionType } from "./Store";
import { ComentType } from "./Types";


const GET_COMENTS = "insta-clone/comentReducer/getComents"
const ADD_COMENT = "insta-clone/comentReducer/addComent"
const DELETE_COMENT = 'insta-clone/comentReducer/deleteComent'
const SET_NEW_COMENT_TEXT = "insta-clone/comentReducer/setNewComent"

type initialStateType = {
    coments : ComentType[],
    newComentText : string,
 
}

const initialState : initialStateType = {
    coments : [] as Array<ComentType>,
    newComentText : ""
}


type actionType = InferActionType<typeof comentActions>  
export const comentReducer = (state = initialState,action : actionType) => {
    switch(action.type){
        case GET_COMENTS : {
            return {
                ...state,
                coments : action.payload
            }
        }
        case ADD_COMENT : {
            return {
                ...state,
                coments : state.coments.concat(action.payload)
            }
        }
        case DELETE_COMENT : {
            return {
                ...state,
                coments : state.coments.filter((el : ComentType) => el.comentID !== action.payload)
            }
        }
        case SET_NEW_COMENT_TEXT : {
            return {
                ...state,
                newComentText : action.payload
            }
        }
        default : 
            return state
    }
}

export const comentActions = {
    getComents : (coments : Array<ComentType>) => ({
        type : "insta-clone/comentReducer/getComents",
        payload : coments
    } as const ),
    deleteComent : (comentID : string) => ({
        type : "insta-clone/comentReducer/deleteComent",
        payload : comentID
    } as const),
    addComent : (coment : ComentType) => ({
        type : "insta-clone/comentReducer/addComent",
        payload : coment
    } as const),
    setNewComentText : (comentText : string) => ({
        type : "insta-clone/comentReducer/setNewComent",
        payload : comentText
    } as const)
}


export const getComentsByPostIDThunk = (postID : string) => {
    return async function (dispatch : any) {
        dispatch(app_actions.set_is_fetch_true())
        const coments = await Firestore_instance.getComents(postID)
        if(coments){
            dispatch(comentActions.getComents(coments))
            dispatch(app_actions.set_is_fetch_fasle())
        } else{
            dispatch(app_actions.set_is_fetch_fasle())
        }
    }
}

export const addComentThunk = (coment : ComentType,postID : string) => {
    return async function (dispatch : any) {
        dispatch(app_actions.set_is_fetch_true())
        Firestore_instance.addComentToPost(coment.avatar as string,postID,coment.comentatorName as string,
            coment.comentatorID as string,coment.coment_text as string)
        dispatch(comentActions.addComent(coment))
        dispatch(app_actions.set_is_fetch_fasle())
    }
} 

export const deleteComent = (comentID : string) => {
    return async function (dispatch : any) {
        dispatch(app_actions.set_is_fetch_true())
        Firestore_instance.deleteComentByID(comentID)
        dispatch(comentActions.deleteComent(comentID))
        dispatch(app_actions.set_is_fetch_fasle())
    }
}