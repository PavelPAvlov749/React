import { CollectionReference, doc, DocumentData, setDoc, where } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { firebase } from "./FirebaseConfig";
import { collection,addDoc,getDocs,getDoc } from "firebase/firestore";
import { query } from "firebase/database";
import { Query } from "@testing-library/react";
// import { Firestore } from "./FirebaseConfig";


const db = getFirestore(firebase)

class firestoreAPI {
    super(){

    }
    async getPosts (userID : string) {
        const postRef = collection(db,"Posts")
        // const q = query(postRef,where("creator","==",userID))

        

    }
    async addPost (userID : string,postText : string,postIMG : string){
        try{
            const docRef = doc(collection(db,"Posts"))
            const newPost = {
                creator : userID,
                img : postIMG,
                text : postText
            }
            await setDoc(docRef,newPost)

        }catch(ex){
            console.log(ex)
        }
    }
}

export const FSAPI = new firestoreAPI()