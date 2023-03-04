import { disableNetwork } from "firebase/firestore"
import { act } from "react-dom/test-utils"
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript"
import { Firestore_instance } from "../DAL/Firestore_config"
import { postAPI } from "../DAL/PostApi"
import { app_actions } from "./AppReducer"
import { InferActionType } from "./Store"
import { ComentType, PostType } from "./Types"




const GET_POSTS = "messenger/posts_reducer/get_post"
const SET_SHOWED_POST = "messenger/posts_reducer/set_showed_post"
const ISPOSTSFETCH = "messenger/posts_reducer/isPostFetch"
const LIKE = "messenger/posts_reducer/like"
const DISLIKE = "messenger/posts_reducer/dislike"
const ADD_COMENT = "messenger/posts_reducer/addComent"
const DELETE_COMENT = "messenger/psts_reducer/deleteComent"
const SET_NEW_COMENT = "messenger/posts_reducer/setNewComent"
const SET_ON_NEW_POST = "insta-clone/postReducer/setIsOnNewPost"
const SET_NEW_POST_PHOTO = "insta-clone/postReducer/setNewPostPhoto"
const SET_NEW_POST_TEXT = "insta-clone/postReducer/setNewPostText"
const CREATE_POST = "insta-clone/postReducer/createPost"
const GET_COMENTS = "insta-clone/postReducer/getComents"


type ActionType = InferActionType<typeof postActions>
type initial_state_type = {

}

export let initial_state = {
    posts: [] as unknown as Array<PostType>,
    newPost: null as unknown as PostType,
    currentPost: null as unknown as PostType,
    coments : []  as Array<ComentType>,
    isOnNewPost: false,
    newPostPhoto: null as unknown as string,
    newPostText: "",
}


export const PostsReducer = (state = initial_state, action: ActionType) => {
    switch (action.type) {
        case GET_POSTS: {
            return {
                ...state,
                posts: action.payload
            }
        }
        case GET_COMENTS : {
            return {
                ...state,
                coments : action.payload
            }
        }
        case CREATE_POST: {
            return {
                ...state,
                posts: { ...state.posts.concat(action.payload) }
            }
        }
        case SET_SHOWED_POST: {
            return {
                ...state,
                currentPost: action.payload
            }
        }
        case LIKE: {
            return {
                ...state,
                currentPost: { ...state.currentPost, likesCount: state.currentPost.likesCount.concat(action.payload) }

            }


        }
        case DISLIKE: {
            return {
                ...state,
                currentPost: { ...state.currentPost, likesCount: state.currentPost.likesCount.filter(el => el !== action.payload) }
            }
        }
        case SET_ON_NEW_POST: {
            return {
                ...state,
                isOnNewPost: action.payload
            }
        }
        case SET_NEW_POST_PHOTO: {
            return {
                ...state,
                newPostPhoto: action.payload
            }
        }
        case SET_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: state.newPostText.concat(action.payload)
            }
        }
        case ADD_COMENT: {
            return {
                ...state,
                currentPost: { ...state.currentPost, coments: state.currentPost.coments.concat(action.payload.coment) }

            }
        }
        case DELETE_COMENT: {
            return {
                ...state,
                currentPost: { ...state.currentPost, coments: state.currentPost.coments.filter(el => el.comentID !== action.payload) }
            }
        }

        default:
            return state
    }
}

export const postActions = {
    getPosts: (_posts: Array<PostType>) => ({
        type: "messenger/posts_reducer/get_post",
        payload: _posts
    } as const),
    set_showed_post: (_post: PostType) => ({
        type: "messenger/posts_reducer/set_showed_post",
        payload: _post
    } as const),
    setIsPostFetch: (isFetch: boolean) => ({
        type: "messenger/posts_reducer/isPostFetch",
        payload: isFetch
    } as const),
    addComent: (postID: string, coment: ComentType) => ({
        type: "messenger/posts_reducer/addComent",
        payload: { coment: coment, postID: postID }
    } as const),
    deleteComent: (comentID: string) => ({
        type: "messenger/psts_reducer/deleteComent",
        payload: comentID
    } as const),
    setNewComent: (text: string) => ({
        type: "messenger/posts_reducer/setNewComent",
        payload: text
    } as const),
    likeToogle: (userID: string) => ({
        type: "messenger/posts_reducer/like",
        payload: userID
    } as const),
    dislike: (userID: string) => ({
        type: "messenger/posts_reducer/dislike",
        payload: userID
    } as const),
    setIsOnnewPost: (isNewPost: boolean) => ({
        type: "insta-clone/postReducer/setIsOnNewPost",
        payload: isNewPost
    } as const),
    setNewPostPhoto: (img: any) => ({
        type: "insta-clone/postReducer/setNewPostPhoto",
        payload: img
    } as const),
    setNewPosttext: (postText: string) => ({
        type: "insta-clone/postReducer/setNewPostText",
        payload: postText
    } as const),
    createPost: (post: PostType) => ({
        type: "insta-clone/postReducer/createPost",
        payload: post
    } as const),
    getComents : (comenets : ComentType[]) => ({
        type : "insta-clone/postReducer/getComents",
        payload : comenets
    } as const)
}

export const getPostListByUserID = (userID: string) => {
    return async function (dispatch: any) {
        dispatch(app_actions.set_is_fetch_true())
        const posts = await Firestore_instance.getPostsByUserID(userID)
    

        dispatch(postActions.getPosts(Object.values(posts)))
        dispatch(app_actions.set_is_fetch_fasle())


    }
}
export const leaveComentThunk = (userID: string, postID: string, coment: ComentType) => {
    return async function (dispatch: any) {
        try {
            dispatch(app_actions.set_is_fetch_true())
            // const newComent = await postAPI.addComentToPost(userID, postID, coment.coment_text as string, coment.comentatorName as string, coment.avatar as string)
            const newComent = await Firestore_instance.addComentToPost(coment.avatar as string,postID,coment.comentatorName as string,
                userID,coment.coment_text as string)
        
                dispatch(postActions.addComent(postID, coment))
                dispatch(app_actions.set_is_fetch_fasle())
            

        } catch (ex) {
            console.error(ex)
        }
    }
}
export const getSinglePostByID = (postID: string) => {
    return async function (dispatch: any) {
        dispatch(app_actions.set_is_fetch_true())
        // let post = await postAPI.getPostByID(postID)
        let post = await Firestore_instance.getPostSinglePostByPostID(postID)
      
        dispatch(postActions.set_showed_post(post as unknown as PostType))

        dispatch(app_actions.set_is_fetch_fasle())
    }
}
export const createNewPostThunk = (userAvatar : string,userID: string, postIMG: Blob | Uint8Array | ArrayBuffer, postText: string, postTags: string, userFullNAme: string,
    creatorID: string) => {
    return async function (dispatch: any) {
        try {
            dispatch(app_actions.set_is_fetch_true())
            if (postIMG !== null && postIMG !== undefined) {

                dispatch(app_actions.setOnLoad(true))
                const newPostKey = await Firestore_instance.addPost(userFullNAme as string,userID,postText,postIMG,userAvatar)
                if (newPostKey) {
                    dispatch(app_actions.set_is_fetch_fasle())
                    dispatch(postActions.setNewPostPhoto(null))
                    dispatch(app_actions.setOnLoad(false))
                }

            } else {
                throw new Error("Post image is null.Cant upload the post")
            }

        } catch (ex) {
            console.log(ex)
        }


    }
}
export const deletePostThunk = (userID: string, postID: string) => {
    return async function (dispatch: any) {
        dispatch(app_actions.set_is_fetch_true())
        await Firestore_instance.deletePostByID(postID)
        const posts = await postAPI.getListOfPosts(userID)
        if (posts) {
            dispatch(postActions.getPosts(Object.values(posts.val())))
        }

        dispatch(app_actions.set_is_fetch_fasle())
    }
}
export const deleteComentThunk = (postID: string, comentID: string) => {
    return async function (dispatch: any) {
        dispatch(app_actions.set_is_fetch_true)
        await postAPI.deleteComent(postID, comentID)
        dispatch(postActions.deleteComent(comentID))
        dispatch(app_actions.set_is_fetch_fasle())
    }
}
export const likeToogleThunk = (postID: string, currentUserID: string) => {
    return async function (dispatch: any) {
        dispatch(app_actions.set_is_fetch_true())
        try {
            await Firestore_instance.toggleLikesAtPost(postID,currentUserID as string)
            dispatch(app_actions.set_is_fetch_fasle())
        } catch (ex) {
            console.error(ex)
        }

    }
}
export const getComents = (postID : string) => {
    return async function (dispatch : any) {
        const coments = await Firestore_instance.getComents(postID)
        dispatch(postActions.getComents(coments))
    }
}
export const getAllPosts = () => {
    return async function (dispatch: any) {
        dispatch(app_actions.set_is_fetch_true())
        const posts = await postAPI.getAllPost()
        if (posts) {
            dispatch(postActions.getPosts(posts as Array<PostType>))
            dispatch(app_actions.set_is_fetch_fasle())
        }

    }
}