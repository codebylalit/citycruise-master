import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const OrderItem = ({ orderId, title, image, brand, date, price, qty }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.brand}>{brand}</Text>
        <Text style={styles.text}>Quantity: {qty}</Text>
        <Text style={styles.text}>Date: {date}</Text>
        <Text style={styles.text}>
          OrderId: <Text style={styles.orderId}>#{orderId}</Text>
        </Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>${price}</Text>
      </View>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
  imageContainer: {
    padding: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  brand: {
    fontSize: 14,
    marginTop: 4,
  },
  text: {
    fontSize: 12,
    marginTop: 2,
  },
  orderId: {
    fontWeight: "bold",
  },
  priceContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
