import { Route,Routes,Navigate } from "react-router-dom"

import { Login_container } from "../Components/Login/Login"
import { Registration } from "../Components/Login/Registartion"
import { NewPostModalWindow } from "../Components/NewPost/NewPostModal"
import { ShowedPost } from "../Components/Posts/OpenedPost"
import { UserPage,  } from "../Components/UserPage/UserPage"
import { UserSearch } from "../Components/UserSearch/UserSearch"
import styles from "../Styles/Router.module.css"
import React from "react"
import { AllComents } from "../Components/Posts/AllComents"
import { AllPosts } from "../Components/News/News"
import { UsersList } from "../Components/UsersList/usersList"
import { ErrorBoundary } from "../ErrorBoundary/ErrorBoundary"

const LOGIN = "/login"

const USERS = "/users"
const USER_PROFILE = "/profile/:id"
const no_match_route = "*"
const NEW_POST = "/newPost"
const POST = "/p/:id"
const Empty = "";
const SEARCH = "/search"
const REGISTRATION = "/registration"
const ROOT = "/"
const DIRECT = "chat/:id"
const ALL_COMENTS = "/p/:id/coments"
const News = "/news"
const FOLLOWERS = "/profile/:id/Followers"
const FOLOOWED = "/profile/:id/Followed"

export const Router :React.FC<{actualUser : string,isAuth : boolean,}> = (props : {actualUser : string,isAuth : boolean,}) => {
    const errorBoundary = new ErrorBoundary(props)
    if(props.isAuth){
        return (
            <div className={styles.router}>
                <Routes>
                    <Route path={LOGIN} element={<Navigate to={USER_PROFILE + "=" + props.actualUser}/>}/>
                    <Route path={ROOT} element={null}/>
                    <Route path={USER_PROFILE} element={<UserPage/>}/>
                    <Route path={POST} element={
                    <ErrorBoundary>
                        <ShowedPost/>
                        </ErrorBoundary>}/>
                    <Route path={SEARCH} element={<UserSearch/>}/>
  

                    <Route path={NEW_POST} element={<NewPostModalWindow/>}/>
                    <Route path={ALL_COMENTS} element={<AllComents/>}/>
                    <Route path={News} element={<AllPosts/>}/>
                    <Route path={FOLLOWERS} element={<UsersList/>}/>
                    <Route path={FOLOOWED} element={<UsersList/>}/>

                </Routes>
            </div>
        )
    }else{
        return (
            <div >
                <Routes>
                    <Route path={LOGIN} element={<Login_container/>}/>
                    <Route path={no_match_route} element={<Navigate to={LOGIN} replace/>}/>
                    <Route path={REGISTRATION} element={<Registration/>}/>
                </Routes>
            </div>
        )
    }

}