
import {
    collection, getDocs, getFirestore, query, addDoc, where,
    QuerySnapshot, Timestamp, doc, getDoc, setDoc, documentId,
    updateDoc, arrayUnion, arrayRemove, deleteDoc
}
    from "firebase/firestore";
import { getDatabase, ref, onValue, set, get, child, serverTimestamp, update } from "firebase/database";
import { getDownloadURL, getStorage, ref as storegeRef, StorageReference } from "firebase/storage";
import { firebase, Firestore } from "./FirebaseConfig";
import { uploadBytes } from "firebase/storage";
import { makeid } from "./Randomizer";
import { ComentType, PostType } from "../Redux/Types";






//Initialize Real-time data base instance 
const dataBase = getDatabase();

//APPLICATION FIRESTORE INSTANSE
const reference = ref(dataBase)

export const Firestore_instance = {



    getAllPosts: async () => {
        try {
            const docRef = collection(Firestore, "Posts")
            const posts: any = []
            const docs = await getDocs(docRef)
            if (!docs.empty) {
                await docs.forEach((doc) => {
                    posts.push(doc.data())
                })
            } else {
                throw new Error("Cant load posts")
            }

            return posts
        } catch (ex) {
            console.log(ex)
        }
    },
    getPostSinglePostByPostID: async (postID: string) => {
        try {
            const docRef = doc(Firestore, "Posts/" + postID)
            const post = await getDoc(docRef)
           
            return post.data()
        } catch (ex) {
            console.log(ex)
        }
    },
    getPostsByUserID: async (userID: string) => {
        try {
            const q = query(collection(Firestore, "Posts"), where("creatorID", "==", userID));

            let posts: any = [];
            const querySnap = await getDocs(q)
            querySnap.forEach((doc) => {
                posts.push(doc.data())

            })
           
            return posts
        } catch (ex) {
            console.log(ex)
        }

    },
    addPost: async (userName: string, userID: string, text: string, img: Blob | ArrayBuffer | Uint8Array,userAvatar : string) => {
        try {
            const imageID: string = makeid(12);
            const docRef = await collection(Firestore, "Posts")
            const docID = await doc(docRef)
            const storageRefrence = getStorage(firebase)
            const imageRef: StorageReference = storegeRef(storageRefrence, imageID)
            await uploadBytes(imageRef, img)
            const imgURL = await getDownloadURL(imageRef)
            const newPost : PostType = {
                postIMG : imgURL,
                likesCount : [],
                creator : userName,
                creatorID : userID,
                postText : text,
                id : docID.id,
                createdAt : Timestamp.fromDate(new Date()).toDate().toString(),
                coments : [],
                creatorAvatar : userAvatar

            }
            await setDoc(docID, newPost)
       
            return docID.id
        } catch (ex) {
            console.log(ex)
        }

    },
    toggleLikesAtPost: async (postID: string, userID: string) => {
        try {
            const docRef = doc(Firestore, "Posts/" + postID)
            const snap = await getDoc(docRef)

            if (snap.exists()) {
                console.log(snap.data())
                const post = await snap.data()

                if (snap.data().likesCount.includes(userID)) {
                    updateDoc(docRef, { likesCount: arrayRemove(userID) })
                } else {
                    updateDoc(docRef, { likesCount: arrayUnion(userID) })
                }
            } else {
                console.log("Post does not exist")
            }
        } catch (ex) {
            console.log(ex)
        }
    },
    deletePostByID: async (postID: string) => {
        try {
            const docRef = doc(Firestore, "Posts/" + postID)
            deleteDoc(docRef)
        } catch (ex) {
            console.log(ex)
        }
    },
    addComentToPost: async (avatar : string,postID: string, comentatorName: string, comentatorID: string, commentText: string) => {
        try {
            const docRef = collection(Firestore, "Coments/")
            const comentID = doc(docRef)
            const newComent : ComentType = {
                comentatorName: comentatorName,
                comentatorID: comentatorID,
                coment_text: commentText,
                avatar : avatar,
                createdAt: Timestamp.fromDate(new Date()).toDate().toString(),
                comentID: comentID.id,
                postID: postID
            }
            setDoc(comentID, newComent)

        } catch (ex) {
            console.log(ex)
        }
    },
    deleteComentByID: async (comentID: string) => {
        try {
            const docRef = doc(Firestore, "Coments/" + comentID)
            await deleteDoc(docRef)

        } catch (ex) {
            console.log(ex)
        }
    },
    getComents: async (postID: string) => {
        try {
            const docRef = collection(Firestore, "Coments")
            const q = await query(docRef, where("postID", "==", postID))
            const coments: any = []
            const snap = await getDocs(q)
            if (!snap.empty) {
                await snap.forEach((doc) => {
                    coments.push(doc.data())
                })
            } else {
                console.log("Empty")
            }

            return coments
        } catch (ex) {
            console.log(ex)
        }
    }
}
