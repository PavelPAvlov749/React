import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, likeToogleThunk } from "../../Redux/PostReducer";
import { Global_state_type } from "../../Redux/Store";
import { Preloader } from "../Preloader/Preloader";
import styles from "../../Styles/News.module.css"
import { PostType } from "../../Redux/Types";
import { NavLink } from "react-router-dom";
import { Avatar } from "../UserPage/Avatar";
import { posix } from "node:path/win32";
import { postAPI } from "../../DAL/PostApi";
import { Firestore_instance } from "../../DAL/Firestore_config";


const PostNews: React.FC<{ post: PostType, currentUserId: string }> = React.memo((props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        // postAPI.getAllPost()
        Firestore_instance.getAllPosts()
    },[])
    const tapLikeHandler = function () {

    }
    const onComentClickHandler = function () {

    }
    return (
        <section className={styles.postNewsContainer} key={props.post.id}>
            <div className={styles.creatorInfo}>
            <NavLink to={`/profile/id:=${props.post.creator}`} >
                <div className={styles.avatarWrapper}>
                   
                    <Avatar avatarIMG={props.post.creatorAvatar} fullName={props.post.creator} size="small" />
                </div>
                <h1 className={styles.autorName}>{props.post.creator}</h1>
            </NavLink>
            </div>
           
            <NavLink to={`/p/id=${props.post.id}`}>
                <div className={styles.postIMGContainer}>
                    <br />
                    <img className={styles.postIMG} src={props.post.postIMG} alt="" />
                </div>
            </NavLink>


        </section>
    )
})


export const AllPosts: React.FC = React.memo((props) => {
    const dispatch: any = useDispatch()
    let [scroll, setScroll] = useState(false)
    const chat_anchor_ref = useRef<HTMLDivElement>(null);

    const isFetch = useSelector((state: Global_state_type) => {
        return state.app.is_fetch
    })
    useEffect(() => {
        console.log(isFetch)
    }, [isFetch])

    useEffect(() => {
        // dispatch(getAllPosts())
    }, [])

    const posts = useSelector((state: Global_state_type) => {
        return state.userPosts.posts
    })
    const currentUserID = useSelector((state: Global_state_type) => {
        return state.account.userID
    })
    const scrollToTop = () => {
        
    }
    if (!isFetch) {
        return (
            <div className={styles.news}>

                {posts.length ? posts.map((post) => {
                    return (
                        <div className={styles.postIMGContainer}>
                        <NavLink to={"/p/id=" + post.id}>
                        <img src={post.postIMG} alt="" />
                        </NavLink>
                        
                        </div>
                    )

                }) : null}
            </div>


        )
    } else {
        return (
            <>
                <Preloader />
            </>
        )
    }

})