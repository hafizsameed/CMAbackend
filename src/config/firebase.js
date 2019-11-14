import * as firebase from 'firebase' 
import 'firebase/firestore'


var firebaseConfig = {
    apiKey: "AIzaSyBPUKA1din_xZnbkc6Br0i8ZQoqPTgzpDw",
    authDomain: "controllermilitaryaccounts.firebaseapp.com",
    databaseURL: "https://controllermilitaryaccounts.firebaseio.com",
    projectId: "controllermilitaryaccounts",
    storageBucket: "controllermilitaryaccounts.appspot.com",
    messagingSenderId: "621422599478",
    appId: "1:621422599478:web:29ce886a73081d24876797",
    measurementId: "G-Y4G1LY8MG0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

const firebaseSignIn=async function(email,password){
   const auth =await  firebase.auth().signInWithEmailAndPassword(email,password)
    return auth
}
const logoutfromfirebase=async function(){
  const logout = await firebase.auth().signOut();
  return logout
}
const addAlertToDb=async function(alerttext,alertdate){
const data=await firebase.firestore().collection('alerts').add({alerttext,alertdate})
return data;
}
const addOrderToDb = async function(ordertext,orderdate){
  const data=await firebase.firestore().collection('orders').add({ordertext,orderdate})
  return data;
} 
const addNotificationToDb=async function(pipfatext,pipfadate){
  const data=await firebase.firestore().collection('pipfaNotifications').add({pipfatext,pipfadate})
  return data;
} 
const addTenderToDb=async function(tendertext,tenderdate){
  const data=await firebase.firestore().collection('tenderNotification').add({tendertext,tenderdate})
  return data;
} 



export default firebase

export {
  firebaseSignIn,
  logoutfromfirebase,
  addAlertToDb,
  addOrderToDb,
  addNotificationToDb,
  addTenderToDb,
}
