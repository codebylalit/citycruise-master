import React, { useContext, useState, useEffect } from "react";
import { Text, View, Pressable, ToastAndroid, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import AuthContext from "../features/authContext";
import AuthenticationModal from "../components/AuthenticationModal"; // Import the AuthenticationModal component
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ProfileScreen = () => {
  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } =
    useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false); // State to control the visibility of the authentication modal

  // Function to handle logout
  const handleLogout = async () => {
    await AsyncStorage.removeItem("isLoggedIn"); // Remove isLoggedIn from AsyncStorage
    setIsLoggedIn(false); // Set isLoggedIn state to false
    setCurrentUser(null); // Clear currentUser state
    ToastAndroid.show("Logged Out Successfully", ToastAndroid.BOTTOM);
  };

  // Function to handle login
  const handleLogin = () => {
    // Show authentication modal for login
    setModalVisible(true);
  };

  // Effect to check if the user is logged in when the component mounts
  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedInStatus = await AsyncStorage.getItem("isLoggedIn"); // Check if user is logged in from AsyncStorage
      if (loggedInStatus === "true") {
        setIsLoggedIn(true); // Set isLoggedIn state to true
      }
    };
    checkLoginStatus();
  }, []); // Only run this effect once when the component mounts

  // Effect to persist login status in AsyncStorage
  useEffect(() => {
    const persistLoginStatus = async () => {
      await AsyncStorage.setItem("isLoggedIn", isLoggedIn.toString()); // Persist isLoggedIn state in AsyncStorage
    };
    persistLoginStatus();
  }, [isLoggedIn]); // Run this effect whenever isLoggedIn state changes

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <View style={styles.imageBorder}>
            <MaterialIcons
              style={styles.image}
              name="mood"
              size={80}
              color="black"
            />
          </View>
        </View>
        <View style={styles.userInfoContainer}>
          {isLoggedIn ? (
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Welcome! {currentUser?.name}</Text>
              <Text style={styles.userEmail}>{currentUser?.email}</Text>
            </View>
          ) : (
            <View style={styles.userInfo}>
              <Text style={styles.loginText}>Login to view your Profile!</Text>
              <Pressable onPress={handleLogin} style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Login</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
      {isLoggedIn && (
        <View style={styles.logoutContainer}>
          <Pressable onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </Pressable>
        </View>
      )}
      {/* Render AuthenticationModal if user is not logged in */}
      {!isLoggedIn && (
        <AuthenticationModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 24,
    justifyContent: "space-between",
  },
  profileContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  imageContainer: {
    borderWidth: 1,
    borderRadius: 100,
    overflow: "hidden",
    borderColor: "gray",
  },
  imageBorder: {
    borderRadius: 100,
    borderWidth: 1,
    padding: 4,
    borderColor: "#ccc",
  },
  image: {
    width: 80,
    height: 80,
  },
  userInfoContainer: {
    marginTop: 12,
    alignItems: "center",
  },
  userInfo: {
    alignItems: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#888",
  },
  loginText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  loginButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "black",
    borderRadius: 8,
  },
  loginButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  logoutContainer: {
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "black",
    width: "100%",
    padding: 16,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ProfileScreen;
