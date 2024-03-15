import { auth, db } from "../../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { getDoc, doc, setDoc } from "firebase/firestore";

const registerWithEmailAndPassword = async (name, email, password) => {
  console.log(email, password, name);
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, {
      uid: user.uid,
      name,
      email,
    });
    return { success: true };
  } catch (error) {
    console.error(error);
  }
};

const loginWithEmailAndPassword = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const userId = res.user.uid;
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    return {
      success: true,
      user: userDoc.data(),
    };
  } catch (err) {
    console.error(err);
  }
};

const loginWithPhoneNumber = async (phoneNumber, recaptchaVerifier) => {
  try {
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      recaptchaVerifier
    );
    return confirmationResult;
  } catch (err) {
    console.error(err);
  }
};

const verifyOTP = async (confirmationResult, otp) => {
  try {
    const result = await confirmationResult.confirm(otp);
    return result;
  } catch (err) {
    console.error(err);
  }
};

const logout = async () => {
  await signOut(auth);
  return { success: true };
};

export {
  loginWithEmailAndPassword,
  logout,
  registerWithEmailAndPassword,
  loginWithPhoneNumber,
  verifyOTP,
};
