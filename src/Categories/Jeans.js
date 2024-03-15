import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // Import your Firebase configuration
import ProductCard from "../components/ProductItem";
const Jeans = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = [];
      querySnapshot.forEach((doc) => {
        const product = doc.data();
        if (product.category === "JeansCategory") {
          productsData.push(product);
        }
      });
      setProducts(productsData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };


  const handleProductPress = (product) => {
    navigation.navigate("ProductDetails", { product });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="black" />;
  }

  if (products.length === 0) {
    return <Text style={{textAlign:"center",marginTop:50}}>No Jeans products available.</Text>;
  }

  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginVertical: 30,
          textAlign: "center",
        }}
      >
        Jeans
      </Text>
      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()} // Use index as the key if item.id is not unique
        renderItem={({ item }) => (
          <ProductCard
            title={item.name}
            images={item.images}
            description={item.description}
            price={item.price}
            onPress={() => handleProductPress(item)}
          />
        )}
      />
    </View>
  );
};

export default Jeans;
