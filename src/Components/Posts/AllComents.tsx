import React from "react";
import { Field, Form, Formik, FormikHandlers } from "formik";
import { ComentType } from "../../Redux/Types";
import styles from "../../Styles/Coments.module.css"
import { SilngleComent } from "./SingleComent";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Global_state_type } from "../../Redux/Store";

import style from "../../Styles/Coments.module.css"
import { addComentThunk, comentActions } from "../../Redux/ComentReducer";




export const AllComents : React.FC = React.memo((props) => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch : any = useDispatch()
    const currentUser = useSelector((state:Global_state_type) => {
        return state.account
    })
    const postComents = useSelector((state:Global_state_type) => {
        return state.coments.coments
    })
    const newComentText = useSelector((state : Global_state_type) => state.coments.newComentText)
    const initialFormlValues = { coment : newComentText}

    const backArrowCloickHandler = () => {
        const backPath = location.pathname.split("/coments")[0]
        navigate(backPath)
    }
    console.log(location.pathname.split("/")[2].split("=")[1])
    const onSubmitHandler = ( values : {coment : string}) => {
        const newComent : ComentType = {
            avatar : currentUser.avatar,
            comentatorID : currentUser.userID,
            comentatorName : currentUser.fullName,
            coment_text : values.coment
        }
        dispatch(addComentThunk(newComent,location.pathname.split("/")[2].split("=")[1]))
        dispatch(comentActions.setNewComentText(""))
    }
    const dispatchNewPostText = (e : any) => {
        console.log("DISPATCHED : " + newComentText)
        dispatch(comentActions.setNewComentText(e.currentTarget.value))
    }
    return (
        <section  className={styles.comentWrapper}>
            <div className={styles.comentsList}>
            {postComents.length > 0 ? postComents.map((coment) => {
                return (
                    <div key={coment.comentID}>
                        <SilngleComent coment={coment} currentUserID={currentUser.userID as string}/>
                    </div>
                )
            }) : <div>

                <h1 className={styles.noComents}>No coments yet</h1></div>}
            </div>
            <section className={style.ComentInput}>
                    <Formik onChanhe={dispatchNewPostText} enableReinitialize={true} initialValues={initialFormlValues} onSubmit={onSubmitHandler}>
                        <Form>
                            <Field onKeyUp={dispatchNewPostText} name="coment"  type="text" autocomplete="off"></Field>
                            <br />
                          
                            <button className={style.cancelButton} onClick={backArrowCloickHandler}>Back</button>
                            <button className={style.publish} type="submit">Publish</button>
                        </Form>
                    </Formik>
            </section>
        </section>
    )
})