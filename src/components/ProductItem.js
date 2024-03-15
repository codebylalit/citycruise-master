import React, { useState, useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CartContext from "../features/cartContext";
import { Button } from "react-native";

const ProductItem = ({ id, title, name, description, images, price, isSold }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Medium"); // Default size
  const { addToCart } = useContext(CartContext);
  const navigation = useNavigation();

  const handleAddToCart = () => {
    const product = {
      id,
      title,
      name,
      description,
      images,
      price,
      quantity,
      size: selectedSize,
    };
    addToCart(product);
    navigation.navigate("CartScreen");
  };

  const handleProductDetail = () => {
    navigation.navigate("ProductDetailScreen", {
      product: { id, title, name, description, images, price },
    });
  };


  return (
    <TouchableOpacity onPress={handleProductDetail} style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: images[0] }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {title || name}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
          <Text style={styles.price}>₹{price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5, // Add horizontal padding to the container
    marginBottom: 10,
    width: "100%", // Each card occupies 50% of the container width
  },
  card: {
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF9057",
  },
});

export default ProductItem;
