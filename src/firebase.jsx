import { initializeApp } from "firebase/app";
import {getFirestore, Timestamp} from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile,sendEmailVerification, updateEmail} from "firebase/auth";
import { getDatabase, ref, set, onValue, child, push, update,  } from "firebase/database";
import {collection, addDoc, getDocs, updateDoc, arrayUnion, arrayRemove, doc, getDoc, setDoc} from "firebase/firestore"
import { getStorage,uploadBytes, ref as sRef ,getDownloadURL } from "firebase/storage";
import toast from 'react-hot-toast'


const firebaseConfig = {
    apiKey: 'AIzaSyA4S0JNdaCMBYcfuGu1RWmze_MAG9fBUTg',
    authDomain: 'chat-app-39869.firebaseapp.com',
    projectId: 'chat-app-39869',
    storageBucket: 'chat-app-39869.appspot.com',
    messagingSenderId:'221408528924',
    appId: '1:221408528924:web:9e7f14407d1f21a42aadd9',
    measurementId:'G-1EZ6G2S70Y',
    databaseURL:'https://chat-app-39869-default-rtdb.europe-west1.firebasedatabase.app'
  };

  

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const auth = getAuth()
export const register = async(email, password, userName) => {
    try{
        const {user} = await createUserWithEmailAndPassword(auth, email, password)
        toast.success("successfully");
        updateProfile(auth.currentUser, {
            displayName: userName,
            photoURL: "https://sun1-85.userapi.com/s/v1/if1/9TZJWBsPFYaFtM5UtbzjzSSYX2FfoLd7_jWzBdlkE6xBhyiL0DhLuYuwshlGilQZEYcDMI-I.jpg?size=200x200&quality=96&crop=20,20,200,200&ava=1",
            
          })
          console.log(user)

        await setDoc(doc(db, "users/", user.uid), {
            myGroup : [],
            displayName: userName,
            avatar: 'https://sun1-85.userapi.com/s/v1/if1/9TZJWBsPFYaFtM5UtbzjzSSYX2FfoLd7_jWzBdlkE6xBhyiL0DhLuYuwshlGilQZEYcDMI-I.jpg?size=200x200&quality=96&crop=20,20,200,200&ava=1',
            about : "About me"
        });
        const docRef = doc(db, "users/", user.uid);
        const querySnapshot = await getDoc(docRef);
        let data = {}
        data = querySnapshot.data()
        user.data = data
        return user
    }
    catch(error){
        toast.error(error.message)
    }
    
}

export const signIn = async(email, password)=> {
    try{
        const {user} = await signInWithEmailAndPassword(auth, email, password)
        toast.success("successfully");

        const docRef = doc(db, "users/", user.uid);
        const querySnapshot = await getDoc(docRef);
        let data = {}
        data = querySnapshot.data()
        user.data = data
        return user
    }
    catch(error){
        toast.error(error.message)
    }
}

export const logOut = async()=>{
    try{
        signOut(auth)
        toast.success("successfully");
        return true
    }
    catch(error){
        toast.error(error.message)
        return false
    }
}

export const createNewGroup = async (name,user) => {
    try{
        const userName = (user.displayName ? user.displayName : 'underfind')
        const docRef = await addDoc(collection(db, "groups"),{
            group:name,
            admin:user.uid
        });
        try{  
            const washingtonRef = doc(db, "users/", user.uid);
            await updateDoc(washingtonRef, {
                myGroup: arrayUnion(name)
            });
        ;}
        catch(error){
            console.log(error)
        }
        toast.success("Create new group!")
    } catch(error) {
        console.log(error)
        toast.error(error)
    }
}


export const getMyGroups = async(user)=>{
    try{
        const docRef =  doc(db, "users/", user.uid);
        const querySnapshot = await getDoc(docRef);
        let data = {}
        data = querySnapshot.data()
        return data
    } catch(error){
        toast.error(error)
    }
}

export const getGroups = async()=>{
    try{
        const querySnapshot = await getDocs(collection(db, "groups"));
        return querySnapshot
    } catch(error){
        toast.error(error)
    }
}

export const sendMessage = async(group, user , message) => {
    try{
        console.log(user)
        const docRef = await addDoc(collection(db, group),{
            displayName:user.displayName,
            uid:user.email,
            photoURL:user.photoURL,
            message:message,
            createAt: new Date().getTime()
        });
        toast.success("Message added!")
    } catch(error) {
        console.log(error)
        toast.error(error)
    }
}


export const getMessages = async(group) => {
    try{
        const docRef = await getDocs(collection(db, group));
        return docRef
    } catch(error) {
        console.log(error)
        toast.error(error)
    }
}

const database = getDatabase(app);

export function currentText(text) {
    const database = getDatabase();
    set(ref(database, 'users/'), {
      text:text
    });
    return true;
  }

export const readingText = (callback, value)=>{
    let data;
    const starCountRef = ref(database, 'users/');
    onValue(starCountRef, (snapshot) => {
    data = snapshot.val();
    console.log(data)
    if(value != data.text) {
        console.log(value)
        callback(data.text)
    }
    });
    return data
};
//----------------------------------------------------

export function currentMessages(group, user , message) {
    const newPostKey = push(child(ref(database), group)).key;
    

    const postData = {
        displayName:user.displayName,
        uid:user.email,
        photoURL:user.photoURL,
        message:message,
        createAt: new Date().getTime()
    }
    const updates = {}
    updates[`/${group}/` + newPostKey] = postData
    return update(ref(database),updates)
  }

export const readingMessages = async(group,setterFn,setter)=>{
    const starCountRef =  ref(database, group);
    let data
    onValue(starCountRef, async(snapshot) => {
    data = await snapshot.val()
    if(setter !== data) {
    }
    return data
    })
    return data
};


export const readingText1 = (group, callback, value)=>{
    let data;
    const starCountRef = ref(database, group);
    onValue(starCountRef, (snapshot) => {
    data = snapshot.val();
    try{
        if(value.length != Object.keys(data).length) {
        const arr = []
        for(var i in data) arr.push(data[i])
        callback(arr)
    }
    } catch{}
    
    });
    return data
};

export const downloadImage = async(file,user)=>{
    const unikuq = user.uid
    const storage = getStorage()
    console.log('load')
    const avatarRef = sRef(storage, file.name+unikuq)
    const responce = await uploadBytes(avatarRef, file)

    return responce 
}
export const getImage = async(file, user, setUser)=>{
    const storage = getStorage();
    const unikuq = user.uid
    console.log(file.ref._location.bucket+'/'+file.ref._location.path_)
    const starsRef = sRef(storage, 'gs://'+file.ref._location.bucket+'/'+file.ref._location.path_);
    const responce = await getDownloadURL(starsRef)
    try{  
        const washingtonRef = doc(db, "users/", unikuq);
        await updateDoc(washingtonRef, {
            avatar: responce
        });
        await updateProfile(auth.currentUser, {
            photoURL:responce
          })
        setUser({...user, avatar:responce, photoURL:responce})

    ;}
    catch(error){
        console.log(error)
    }
    return responce 
}

export const updateName = (value) =>{
    updateProfile(auth.currentUser, {
        displayName: value
      }).then(()=>toast.success("Successful username change!"))
      .catch((error) => {toast.success("Error :(")})
}

export const updateEmails = (value) =>{
    const auth = getAuth();
    updateEmail(auth.currentUser, value).then(() => {
      toast.success("Successful email change!")
    }).catch((error) => {
      toast.error(error)
    });
}

export const updateInfo = (user, value) =>{
    try{  
        const washingtonRef = doc(db, "users/", user.uid);
        updateDoc(washingtonRef, {
            about:value
        })
        toast.success("Successful your info change!")
    ;}
    catch(error){
        console.log(error)
    }
}

export const verificationEmail = async() =>{
    try{
        await sendEmailVerification(auth.currentUser)
        toast.success('letter has been sent to your email')
    } catch{
        toast.error('Oppss...')
    }
    
}