import { dataBase, Firebase_auth } from "./FirebaseConfig";
import { firebase } from "./FirebaseConfig";
import { ref, get, child, push, update, remove, onValue ,getDatabase} from "firebase/database";
import { getStorage, ref as storage_ref, uploadBytes, getDownloadURL, StorageReference } from "firebase/storage";
import { makeid } from "./Randomizer";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { ComentType } from "../Redux/Types";




//Abstarct API class 
export class abstractAPI {
    protected RealtimeDataBase = dataBase
    protected DatabaseRef = ref(dataBase)
    protected firebaseAPP = firebase
    protected firebaseStorage = getStorage(this.firebaseAPP)
    protected storageRefrence = storage_ref(this.firebaseStorage)
    protected firebaseAuth = Firebase_auth
    protected googleAuthProvider = new GoogleAuthProvider()
    public onValue = onValue
    public ref = ref

    public getAuthProvider() {

        return this.googleAuthProvider
    }
    public getAuthInstatnce() {
        return this.firebaseAuth
    }
    public getApp() {
        return this.firebaseAPP
    }
    
    public getDatabase() {
        return this.RealtimeDataBase
    }

}

