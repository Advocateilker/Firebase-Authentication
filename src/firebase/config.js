
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,sendEmailVerification, updatePassword, signOut, updateProfile, onAuthStateChanged } from "firebase/auth"
import toast from "react-hot-toast"
import store from '../store/index.js'
import { login as loginHandle, logout as logoutHandle } from "../store/auth.js"

const firebaseConfig = {
  apiKey: "AIzaSyDQkufg0WAeWr_jcLv0_wj8BiSQg_hqqPk",
  authDomain: "auth-adcef.firebaseapp.com",
  projectId: "auth-adcef",
  storageBucket: "auth-adcef.appspot.com",
  messagingSenderId: "829015521199",
  appId: "1:829015521199:web:358d461803a7d7d8d8a15a"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth()

export const register = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    return user
  } catch (error) {
    toast.error(error.message)
  }

}

export const login = async (email, password) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    return user
  } catch (error) {
    toast.error(error.message)

  }
}

export const logOut = async () => {
  try {
    await signOut(auth)
    return true
  } catch (error) {
    toast.error(error.message)

  }
}

export const resetPassword = async password => {
  try{
    await updatePassword(auth.currentUser,password)
    toast.success('Password updated')
    return true
  }catch(err){
    toast.error(err.message)
  }
}

export const emailVerification = async () => {
  try{
    await sendEmailVerification(auth.currentUser)
    toast.success(`Verification mail ${auth.currentUser.email} sent your mail, please check !`)
  }catch(err){
    toast.error(err.message)
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(loginHandle({
      displayName : user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,

    }))
  } else {
    store.dispatch(logoutHandle())
  }
});

export const update = async data => {
  try{
    await updateProfile(auth.currentUser, data)
    return true
  } catch(error){
    toast.error(error.message)
  }
 

}
export default app;