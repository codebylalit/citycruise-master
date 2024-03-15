import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Pressable,
  ActivityIndicator,
  Alert
} from "react-native";
import AuthContext from "../features/authContext";

import {
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  loginUserWithPhoneNumber,
  confirmOTP, // Import the function for OTP verification
} from "../features/firebase/userAuth"; // Import the function for phone number authentication

const AuthenticationModal = ({ modalVisible, setModalVisible }) => {
  const [type, setType] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // Add state for phone number
  const [verificationId, setVerificationId] = useState(""); // Add state for verification ID
  const [otp, setOtp] = useState(""); // Add state for OTP
  const [loading, setLoading] = useState(false);

  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } =
    useContext(AuthContext);

 const handleLogin = async () => {
   setLoading(true);
   try {
     const res = await loginWithEmailAndPassword(email, password);
     console.log("Login response:", res);
     setCurrentUser(res.user);
     setModalVisible(false);
     setIsLoggedIn(true);
   } catch (error) {
     console.error("Login error:", error.message);
     Alert.alert("Login Failed", "Incorrect email or password.");
   }
   setLoading(false);
 };

  const handleRegister = async () => {
    setLoading(true);
    const res = await registerWithEmailAndPassword(name, email, password);
    if (res.success === true) {
      setCurrentUser({ name, email });
      setModalVisible(false);
      setIsLoggedIn(true);
    }
    setLoading(false);
  };

  const handlePhoneLogin = async () => {
    setLoading(true);
    try {
      // Check if email is provided
      if (!email) {
        // Email not provided, proceed with phone number login without email
        const verificationId = await loginUserWithPhoneNumber(phoneNumber);
        setVerificationId(verificationId);
      } else {
        // Email provided, proceed with phone number login including email
        const verificationId = await loginUserWithPhoneNumber(
          phoneNumber,
          email
        );
        setVerificationId(verificationId);
      }
    } catch (error) {
      console.error("Phone login error:", error);
      // Handle error
    }
    setLoading(false);
  };


  const handleOTPVerification = async () => {
    setLoading(true);
    try {
      const res = await confirmOTP(verificationId, otp);
      if (res.success === true) {
        setCurrentUser(res.user);
        setModalVisible(false);
        setIsLoggedIn(true);
      } else {
        // Handle OTP verification failure
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      // Handle error
    }
    setLoading(false);
  };

  useEffect(() => {
    if (currentUser) {
      setIsLoggedIn(true);
    }
  }, [currentUser]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.overlay}>
        {type === "login" ? (
          <View style={styles.modalContent}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <Text style={styles.label}>Password:</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#000" }]}
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.switch}>
              <Text style={styles.switchText}>Not a User?</Text>
              <Pressable onPress={() => setType("register")}>
                <Text style={[styles.switchText, { fontWeight: "bold" }]}>
                  {" "}
                  Register
                </Text>
              </Pressable>
            </View>
            {loading && <ActivityIndicator />}
          </View>
        ) : (
          <View style={styles.modalContent}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <Text style={styles.label}>Password:</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
            {/* Render phone number input only for phone login */}
            {type === "phone" && (
              <>
                <Text style={styles.label}>Phone Number:</Text>
                <TextInput
                  style={styles.input}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                />
              </>
            )}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#000" }]}
              onPress={
                type === "phone" ? handlePhoneLogin : handleRegister // Use phone login handler if type is phone
              }
            >
              <Text style={styles.buttonText}>
                {type === "phone" ? "Login with Phone" : "Register"}
              </Text>
            </TouchableOpacity>
            {/* Render OTP input only if verificationId exists */}
            {verificationId && (
              <>
                <Text style={styles.label}>Enter OTP:</Text>
                <TextInput
                  style={styles.input}
                  value={otp}
                  onChangeText={setOtp}
                />
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: "#000" }]}
                  onPress={handleOTPVerification}
                >
                  <Text style={styles.buttonText}>Verify OTP</Text>
                </TouchableOpacity>
              </>
            )}
            <View style={styles.switch}>
              <Text style={styles.switchText}>Already a User?</Text>
              <Pressable onPress={() => setType("login")}>
                <Text style={[styles.switchText, { fontWeight: "bold" }]}>
                  {" "}
                  Login
                </Text>
              </Pressable>
            </View>
            {loading && <ActivityIndicator />}
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: Dimensions.get("window").width * 0.8,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  switch: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  switchText: {
    color: "#666",
  },
});

export default AuthenticationModal;
