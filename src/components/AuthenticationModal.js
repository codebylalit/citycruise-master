import React, { useContext, useEffect, useState } from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Pressable,
  Alert,
} from "react-native";
import AuthContext from "../features/authContext";
import {
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
} from "../features/firebase/userAuth";
import { Ionicons } from "@expo/vector-icons"; // Assuming you're using Expo for vector icons

const AuthenticationModal = ({ modalVisible, setModalVisible }) => {
  const [type, setType] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser, setCurrentUser, setIsLoggedIn } =
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
    if (password.length < 6) {
      Alert.alert(
        "Password Too Short",
        "Password should be at least 6 characters long."
      );
      setLoading(false);
      return;
    }
    const res = await registerWithEmailAndPassword(name, email, password);
    if (res.success === true) {
      setCurrentUser({ name, email });
      setModalVisible(false);
      setIsLoggedIn(true);
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
        <View style={styles.modalContent}>
          {type === "login" ? (
            <View>
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
            <View>
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
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#000" }]}
                onPress={handleRegister}
              >
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
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
    marginLeft: 10,
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
