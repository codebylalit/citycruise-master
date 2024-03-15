import {  doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";


export const getCartItems = async() => {
    const userDocRef = doc(db,"users",auth.currentUser.uid)
    const userDocSnapshot = await getDoc(userDocRef)
    const data = await userDocSnapshot.data().cart;
    return {data,success:true};
}

export const addToCart=async(itemId,qty)=>{
    console.log(itemId,qty)
    const productRef = doc(db,"products",itemId)
    const userDocRef = doc(db,"users",auth.currentUser.uid)
    const productSnapshot = await getDoc(productRef)
    const userDocSnapshot = await getDoc(userDocRef)
    if(userDocSnapshot.exists() && productSnapshot.exists()){
        const userData = userDocSnapshot.data();
        const productData = productSnapshot.data();
        const cartItems = userData.cart || [];
        cartItems.push({
            id:itemId,
            title:productData.title,
            brand:productData.brand,
            price:productData.price,
            image:productData.image,
            qty:qty,
        })
        await updateDoc(userDocRef,{cart:cartItems})
        console.log("items added to cart")
        return {success:true,data:cartItems}
    }else{
        console.error("user or product doesnt exist")
    }
}

export const removeItemById = async (id) => {
  try {
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) {
      console.error("User document does not exist");
      return { success: false, error: "User document does not exist" };
    }

    const userData = userDocSnapshot.data();
    const cartItems = userData.cart || [];

    // Filter out the item with the provided ID
    const newCart = cartItems.filter((item) => item.id !== id);

    // Update the user's cart in Firestore
    await updateDoc(userDocRef, { cart: newCart });

    return { success: true, data: newCart };
  } catch (error) {
    console.error("Error removing item:", error);
    return { success: false, error: error.message };
  }
};

