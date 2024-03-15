import {
  Text,
  View,
  Image,
  Pressable,
  ToastAndroid,
  StyleSheet,
} from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthContext from "../features/authContext";
import { logout } from "../features/firebase/userAuth";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


const ProfileScreen = () => {
  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } =
    useContext(AuthContext);

  const handleLogout = async () => {
    const res = await logout();
    if (res.success === true) {
      ToastAndroid.show("Logged Out Successfully", ToastAndroid.BOTTOM);
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <View style={styles.imageBorder}>
            <MaterialIcons style={styles.image} name="mood" size={80} color="black" />
          </View>
        </View>
        <View style={styles.userInfoContainer}>
          {isLoggedIn ? (
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{currentUser?.name}</Text>
              <Text style={styles.userEmail}>{currentUser?.email}</Text>
            </View>
          ) : (
            <View style={styles.userInfo}>
              <Text style={styles.loginText}>Login to view your Profile!</Text>
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
