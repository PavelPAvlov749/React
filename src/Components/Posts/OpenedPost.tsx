//REACT,REACT_REDUX,HOOKS IMPORTS
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";

import { deletePostThunk, getSinglePostByID, likeToogleThunk, postActions } from "../../Redux/PostReducer";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
//COMPONENTS
// import { PostComents, SilngleComent } from "./Coments";

//STYLES IMPORT
import styles from "../../Styles/OpenPost.module.css"
//MEDIA IMPORTS
import likeImg from "../../Media/like_64.png"
import dislikeIMG from "../../Media/dislike_64.png"
import { Avatar } from "../UserPage/Avatar";
import crossIcon from "../../Media/trash_64.png"
import comentIcon from "../../Media/comentIcon.png"
import { Preloader } from "../Preloader/Preloader";
import { Firestore_instance } from "../../DAL/Firestore_config";

import { ComentType } from "../../Redux/Types";
import { getComentsByPostIDThunk } from "../../Redux/ComentReducer";
import { SilngleComent } from "./SingleComent";


export const ShowedPost: React.FC = React.memo((props) => {
    const navigate = useNavigate()
    const dispatch: any = useDispatch()
    const currentUserID = useSelector((state: Global_state_type) => {
        return state.account.userID
    })
    let location = useLocation().pathname.split("=")[1]
    useEffect(() => {
        dispatch(getSinglePostByID(location))
        dispatch(getComentsByPostIDThunk(location))
    }, [])
    const actualUserPage = useSelector((state: Global_state_type) => {
        return state.userPage
    })
    const actualPost = useSelector((state: Global_state_type) => {
        return state.userPosts.currentPost
    })
    const coments = useSelector((state : Global_state_type) => {
        return state.coments.coments
    })
    console.log(coments)
    const tapLikeHandler = () => {
       
        dispatch(likeToogleThunk(actualPost.id as string, currentUserID as string))
        if (actualPost.likesCount?.includes(currentUserID as string)) {
            console.log("CONTAINS")
            dispatch(postActions.dislike(currentUserID as string))
        } else {
            console.log("NOT CONTAINS")
            dispatch(postActions.likeToogle(currentUserID as string))

        }

    }
    const onComentClickHandler = () => {
        navigate("coments")
    }
    const deletePostHandler = () => {
        dispatch(deletePostThunk(currentUserID as string,actualPost.id as string))
        navigate(`/profile/id=${currentUserID}`)
    }
    if (actualPost) {
        return (
            <section className={styles.postWrapper}>
                <div className={styles.creatorInfo}>
                <NavLink to={`/profile/id:=${actualPost.creatorID}`} >
                    <Avatar avatarIMG={actualUserPage.avatar} fullName={actualUserPage.fullName} size="small" />
                    <h1 className={styles.autorName}>{actualPost?.creator}</h1>
                </NavLink>
                </div>
                <div className={styles.postInfo}>
                    <span className={styles.name}>{actualPost.creator + "\t:\t"}</span>
                    <span>{actualPost?.postText}</span>
                </div>
                <div className={styles.postIMGContainer}>
                    <img className={styles.postIMG} src={actualPost.postIMG} alt="" />
                </div>
                <section className={styles.controls}>
                <img src={!actualPost.likesCount.includes(currentUserID as string) ? dislikeIMG : likeImg} alt="#" className={styles.likeIcon} onClick={tapLikeHandler} />
                    <img src={comentIcon} alt="#" className={styles.comentIcon} onClick={onComentClickHandler}></img>
                   
                    <span className={styles.likesCount} onClick={onComentClickHandler}>{actualPost.likesCount?.length + "\t likes"}</span>
                    {currentUserID === actualPost.creatorID ?  <img src={crossIcon} alt="#" className={styles.deletePost} onClick={deletePostHandler}></img> : null }
                </section>

              
                <section className={styles.coments}>
                    {coments.length > 0 ? coments.map((coment : ComentType) => {
                        return (
                            <>
                            
                                <SilngleComent coment={coment} currentUserID={currentUserID as string}/>                            
                            </>
                        )
                    }) : <h1>There are no Coments</h1>}
                </section>
        
            </section>
        )
    } else {
        return (
            <>
                <Preloader/>
            </>

        )
    }

})