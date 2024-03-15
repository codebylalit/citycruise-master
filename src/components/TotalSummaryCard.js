import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ToastAndroid,
  Linking,
} from "react-native";
import CartContext from "../features/cartContext";
import { Share } from "react-native";

const TotalSummaryCard = () => {
  const { cartItems, setCartItems } = useContext(CartContext);

  const calculateTotalPrice = () => {
    let total = 0;
    if (cartItems && cartItems.length > 0) {
      // Check if cartItems is defined
      cartItems.forEach((item) => {
        const price = parseFloat(item.price);
        const qty = parseInt(item.quantity);
        if (!isNaN(price) && !isNaN(qty)) {
          total += price * qty;
        }
      });
    }
    return total.toFixed(2);
  };

  const placeOrder = async () => {
    try {
      if (!cartItems || cartItems.length === 0) {
        // Show a message if the cart is empty
        ToastAndroid.show("Your cart is empty", ToastAndroid.SHORT);
        return;
      }
      const orderDetails = generateOrderDetails(cartItems);
      await Share.share({
        message: orderDetails,
        title: "Place Order",
      });
      ToastAndroid.show("Order placed successfully!!!", ToastAndroid.BOTTOM);
      setCartItems([]); // Clear cartItems after placing order
    } catch (error) {
      console.error("Error placing order:", error);
      ToastAndroid.show(
        "An error occurred while placing the order. Please try again.",
        ToastAndroid.BOTTOM
      );
    }
  };

  const generateOrderDetails = (items, deliveryType) => {
    let orderDetails = "";
    if (items && items.length > 0) {
      orderDetails = items
        .map(
          (item) =>
            ` Name: ${item.name} - Qty: ${item.quantity} Size: ${item.size} Description: ${item.description} Price: ${item.price} `
        )
        .join("\n");
    } else {
      orderDetails = "No items in the cart";
    }
    if (deliveryType === "home") {
      orderDetails += "\nDelivery Type: Home Delivery";
    }
    return orderDetails;
  };
  console.log("productdetails",generateOrderDetails)

  const openWhatsApp = async (deliveryType) => {
    const message = generateOrderDetails(cartItems, deliveryType);
    console.log(message)
    const phoneNumber = "+91 8094466693";
    Linking.openURL(`whatsapp://send?phone=${phoneNumber}&text=${message}`);
  };

  const totalPrice = calculateTotalPrice();

  return (
    <View style={styles.container}>
      <View style={styles.priceContainer}>
        <Text style={styles.totalPriceLabel}>Total Price:</Text>
        <Text style={styles.totalPriceValue}>₹{totalPrice}</Text>
      </View>
      <View style={{ flexDirection: "column", paddingVertical: 10 }}>
        <Pressable
          onPress={() => openWhatsApp("home")}
          style={styles.whatsappButton}
        >
          <Text style={styles.whatsappButtonText}>
            Home Delivery{" "}
            <Text style={styles.additionalInfoText}>(Extra Charges Apply)</Text>
          </Text>
        </Pressable>
      </View>
      <Pressable onPress={() => openWhatsApp()} style={styles.whatsappButton}>
        <Text style={styles.whatsappButtonText}>Shop Visit</Text>
      </Pressable>
    </View>
  );
};

export default TotalSummaryCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  totalPriceLabel: {
    fontWeight: "bold",
    fontSize: 16,
  },
  totalPriceValue: {
    fontWeight: "bold",
    fontSize: 20,
  },
  whatsappButton: {
    padding: 15,
    backgroundColor: "black",
    borderRadius: 8,
  },
  whatsappButtonText: {
    fontWeight: "bold",
    fontSize: 12,
    color: "white",
    textAlign: "center",
  },
  additionalInfoText: {
    fontSize: 7,
    color: "red",
  },
});
