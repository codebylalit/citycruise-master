import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

const NewArrivalsCard = ({ title, image, price, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>₹{price}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 115,
    height: 170,
    margin: 5,
    marginTop: 10,
    paddingTop: 10,
    alignItems: "center",
    backgroundColor: "#e6e6fa",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: "90%",
    height: 110,
    borderWidth: 2,
    borderColor: "white", // Inner border color
    borderRadius: 5,
  },
  content: {
    padding: 5,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default NewArrivalsCard;
