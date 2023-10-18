'use strict'
import { initializeApp } from "firebase/app";
import {getStorage,ref,uploadBytes,getDownloadURL,deleteObject}from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyDQb-lrybDUtymn-e3eK7Y8NVANOmMoxYw",
  authDomain: "e-waste-firebase.firebaseapp.com",
  projectId: "e-waste-firebase",
  storageBucket: "e-waste-firebase.appspot.com",
  messagingSenderId: "828979486610",
  appId: "1:828979486610:web:44202cb939687e4673eb4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage=getStorage(app)

class FirebaseHelper{
  static uploadFileToStorage = async (file) => {
    const time = Date.now();
    const imageRef = ref(storage, `images/${time + file.name}`);
    const snapshot = await uploadBytes(imageRef, file)
    const downloadUrl = await getDownloadURL(snapshot.ref);
    return downloadUrl;
  };
}
module.exports=FirebaseHelper