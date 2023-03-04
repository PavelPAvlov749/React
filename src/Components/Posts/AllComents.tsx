import React from "react";
import { ComentType } from "../../Redux/Types";
import styles from "../../Styles/Coments.module.css"
import { SilngleComent } from "./Coments";
import { ComentTextArea } from "./ComentTextArea";
import backArrow from "../../Media/back.png"
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";
import { Avatar } from "../UserPage/Avatar";
import comentIcon from "../../Media/comentIcon.png"


export const AllComents : React.FC = React.memo((props) => {

    const currentUserID = useSelector((state:Global_state_type) => {
        return state.account.userID
    })
    const postComents = useSelector((state:Global_state_type) => {
        return state.userPosts.coments
    })

    return (
        <section  className={styles.comentWrapper}>
            <div className={styles.comentsList}>
            {postComents.length > 0 ? postComents.map((coment) => {
                return (
                    <div key={coment.comentID}>
                        <SilngleComent coment={coment} currentUserID={currentUserID as string}/>
                    </div>
                )
            }) : <div>

                <h1 className={styles.noComents}>No coments yet</h1></div>}
            </div>
            <ComentTextArea/>

        </section>
    )
})