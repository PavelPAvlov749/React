import { Field, Form, Formik, FormikHandlers } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Firestore_instance } from "../../DAL/Firestore_config";
import { leaveComentThunk, postActions } from "../../Redux/PostReducer";
import { Global_state_type } from "../../Redux/Store";
import styles from "../../Styles/Coments.module.css"

export const ComentTextArea : React.FC = React.memo((props) => {
    const currentUserID = useSelector((state:Global_state_type) => {
        return state.auth.user_id
    })
    let [isShowComent,setShowComent] = useState(false)
    const currentUser = useSelector((state:Global_state_type) => {
        return state.account
    })

    const postURL = useLocation().pathname.split("=")[1].split("/")[0]
    const dispatch : any = useDispatch()
    let initialFormValues = {coment : ""}

    const newPostText = useSelector((state: Global_state_type) => {
        return state.userPosts
    })

    
    const setSubmit = () => {

    }
    const onSubmitHandler = ( values : {coment : string}) => {
        // Firestore_instance.addComentToPost(postURL,currentUser.fullName as string, currentUser.userID as string,values.coment)
        dispatch(leaveComentThunk(currentUser.userID as string,postURL,
            {comentatorName : currentUser.fullName,
            avatar : currentUser.avatar,
            comentatorID : currentUser.userID,
            coment_text : values.coment
        }))
        initialFormValues.coment = ""
        
    }
    const location = useLocation()
    const navigate = useNavigate()
    const showComents = () => {
        setShowComent(true)
    }
    const backArrowCloickHandler = () => {
        const backPath = location.pathname.split("/coments")[0]
        navigate(backPath)
    }
            return (
                <section className={styles.ComentInput}>
                    <Formik enableReinitialize={true} initialValues={initialFormValues} onSubmit={onSubmitHandler}>
                        <Form>
                            <Field name="coment"  type="text" autocomplete="off"></Field>
                            <br />
                            <button className={styles.publish} type="submit">Publish</button>
                            <button className={styles.cancelButton} onClick={backArrowCloickHandler}>Cancel</button>
                        </Form>
                    </Formik>
                 
                </section>
            )
        
    
})