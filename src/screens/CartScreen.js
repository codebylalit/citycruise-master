import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, StyleSheet, View } from "react-native";
import CartItem from "../components/CartItem";
import TotalSummaryCard from "../components/TotalSummaryCard";
import CartContext from "../features/cartContext";
import { getCartItems } from "../features/firebase/cart";
import AuthContext from "../features/authContext";

const CartScreen = ({ navigation }) => {
  const [total, setTotal] = useState();
  const { isLoggedIn } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext); // Removed setCartItems
  const [itemCount, setItemCount] = useState(0);

  const fetchCartItems = async () => {
    const res = await getCartItems();
    if (res.success === true) {
      console.log(res.data);
      setTotal(res.subTotal);
      if (res.data) {
        calculateTotalAmount(res.data);
      } else {
      }
    }
  };

  useEffect(() => {
    if (cartItems) {
      setItemCount(cartItems.length);
    }
  }, [cartItems]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    fetchCartItems();
  }, [isLoggedIn, cartItems?.length]);

  return (
    <SafeAreaView style={styles.container}>
      {isLoggedIn ? (
        <>
          <View>
            <Text style={styles.title}>
              My Bag (<Text>{itemCount}</Text>)
            </Text>
          </View>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {cartItems?.map((item, index) => (
              <CartItem
                key={`${item.id}-${index}`} // Ensure each key is unique by combining id and index
                id={item.id}
                name={item.name || item.title}
                size={item.size}
                quantity={item.quantity}
                images={item.images}
                price={item.price}
                description={item.description}
              />
            ))}
          </ScrollView>
          <View>
            <TotalSummaryCard totalPrice={total} />
          </View>
        </>
      ) : (
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Login to view your Cart!</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    paddingHorizontal: 5,
    backgroundColor: "white",
  },
  title: {
    marginTop: 40,
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
    color: "black",
  },
  scrollView: {
    marginTop: 4,
  },
  loginContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default CartScreen;
