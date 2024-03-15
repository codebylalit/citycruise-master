// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore ,doc,setDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCL1YZXPF5kGplngjpkIQJfQjze5I-AdSs",
  authDomain: "lucky-fashion-90fa1.firebaseapp.com",
  projectId: "lucky-fashion-90fa1",
  storageBucket: "lucky-fashion-90fa1.appspot.com",
  messagingSenderId: "725701763080",
  appId: "1:725701763080:android:577954a0906f252bb1f1bd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)
export {auth,db,storage}


// Function to upload product image to Firebase Storage
const uploadProductImage = async (imageFile) => {
  const storageRef = ref(storage, "product-images/" + imageFile.name);
  await uploadBytes(storageRef, imageFile);
  // Return the URL of the uploaded image
  return await getDownloadURL(storageRef);
};

// Function to add product to Firestore
const addProductToFirestore = async (productData) => {
  try {
    await setDoc(doc(db, "products", productData.id), productData);
    console.log("Product added successfully");
    return true; // Indicate success
  } catch (error) {
    console.error("Error adding product: ", error);
    return false; // Indicate failure
  }
};
export {uploadProductImage, addProductToFirestore };