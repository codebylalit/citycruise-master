// CartItem.js

import React, { useContext } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CartContext from "../features/cartContext";
import { times } from "lodash";

const CartItem = ({ name, title, images, price, quantity, id, size, description }) => {
  const { removeItem } = useContext(CartContext); // Accessing removeItem from CartContext

  const handleRemoveItem = () => {
    removeItem(id); // Call the removeItem function with the item id
    console.log("remove products",id)
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: images[0] }} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>
          {title || name}
        </Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.qty}>Size: {size}</Text>
        <Text style={styles.qty}>Quantity: {quantity}</Text>
        <Text style={styles.price}>₹{price}</Text>
      </View>
      <Pressable onPress={handleRemoveItem} style={styles.removeButton}>
        <MaterialIcons name="delete-outline" size={20} color="black" />
        <Text style={styles.removeButtonText}>Remove</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd", // Adjust border color if needed
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  qty: {
    fontWeight: "bold",
  },
  price: {
    fontWeight: "bold",
  },
  removeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  removeButtonText: {
    marginLeft: 5,
    fontWeight: "bold",
  },
  description: {
    color: "black",
    fontWeight: "bold",
  },
});

export default CartItem;
