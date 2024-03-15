import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

const CategoryCard = ({ title, image, price, onPress }) => {
  const rotationAngle = Math.floor(Math.random() * 9) - 5;
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View
        style={[
          styles.innerContainer,
          { transform: [{ rotate: `${rotationAngle}deg` }] },
        ]}
      >
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>From ₹{price}</Text>
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
  innerContainer: {
    width: "75%",
    height: "75%", // Adjusted height for smaller image
    borderRadius: 6, // Inner border radius
    overflow: "hidden",
    borderWidth: 2, // Inner border width
    borderColor: "#fff", // Inner border color
    transform: [{ rotate: "-1deg" }],
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Maintain aspect ratio
  },
  title: {
    fontSize: 10,
    marginTop:4,
    fontWeight: "bold",
    textAlign: "center",
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default CategoryCard;
