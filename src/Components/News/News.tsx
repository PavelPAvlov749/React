import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Global_state_type } from "../../Redux/Store";
import { Preloader } from "../Preloader/Preloader";
import styles from "../../Styles/News.module.css"
import { NavLink } from "react-router-dom";
import { getAllPosts } from "../../Redux/PostReducer";




export const AllPosts: React.FC = React.memo((props) => {
    const dispatch : any = useDispatch()
    const isFetch = useSelector((state: Global_state_type) => {
        return state.app.is_fetch
    })
    useEffect(() => {
        console.log(isFetch)
    }, [isFetch])

    useEffect(() => {
        dispatch(getAllPosts())
    }, [])

    const posts = useSelector((state: Global_state_type) => {
        return state.userPosts.posts
    })

    if (!isFetch) {
        return (
            <div className={styles.news}>

                {posts.length ? posts.map((post) => {
                    return (
                        <div key={post.id} className={styles.postIMGContainer}>
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