import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ComentType } from "../../Redux/Types";
import style from "../../Styles/SingleComent.module.css"
import { deleteComent } from "../../Redux/ComentReducer";


export const SilngleComent: React.FC<{coment : ComentType,currentUserID : string}> = React.memo((props) => {
    const dispatch : any = useDispatch()
    const [onDelete,setOnDelete] = useState(false)
    const onDeleteHandler = () => {
        dispatch(deleteComent(props.coment?.comentID as string))
    }

    return (
        <div key={props.coment?.comentID} className={!onDelete ? style.singleComentWrapper : style.singleComentDelete}>
        
           <img className={style.avatar} src={props.coment.avatar as string}></img>
            <span>{props.coment?.comentatorName + "\t:\t"}</span>
            <br />
            <span className={style.comentText}>{props.coment?.coment_text}</span>
            <br />
            {props.coment?.comentatorID === props.currentUserID ? 
             <span className={style.deleteComent} onClick={onDeleteHandler}>Delete coment</span> : null}
        </div>

    )
})

