import React, { useEffect, useContext, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Pressable,
  StyleSheet,
  Image,
  Text,
  ActivityIndicator,
  View,
} from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import ProductContext from "../features/productContext";
import CartContext from "../features/cartContext";
import { useNavigation } from "@react-navigation/native";

const ProductListScreen = () => {
  const { products, setProducts } = useContext(ProductContext);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      if (!snapshot) {
        console.error("Snapshot is undefined");
        return;
      }

      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        qty: 1,
        size: "Medium",
      }));

      setProducts(productsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddToCart = (product) => {
    navigation.navigate("ProductDetailScreen", { product });
  };

  const renderProductCards = () => {
    return products.map((product) => {
      if (product.images && product.images.length > 0) {
        return (
          <Pressable
            key={product.id}
            style={styles.cardContainer}
            onPress={() => handleAddToCart(product)}
          >
            <View style={styles.productContainer}>
              <Image
                source={{ uri: product.images[0] }}
                style={styles.image}
                resizeMode="cover"
              />
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productPrice}>₹{product.price}</Text>
            </View>
          </Pressable>
        );
      } else {
        return null;
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>New Arrivals</Text>
      {loading ? (
        <ActivityIndicator style={styles.loading} />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.productGrid}>{renderProductCards()}</View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
    
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardContainer: {
    width: "48%",
    marginBottom: 10,
  },
  productContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: "#333",
  },
  loading: {
    marginTop: 20,
  },
});

export default ProductListScreen;
