var  firebase  =require("firebase");

firebase.initializeApp({
    apiKey: "AIzaSyCEyGgayEMWCgGLiXwhdIg-rLTUQo7uoFo",
    authDomain: "webhostingreact.firebaseapp.com",
    databaseURL: "https://webhostingreact.firebaseio.com",
    projectId: "webhostingreact",
    storageBucket: "webhostingreact.appspot.com",
    messagingSenderId: "526279286986"
});
const dbRef=firebase.database().ref("/wifi-request");
module.exports   =dbRef; 