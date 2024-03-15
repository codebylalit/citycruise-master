import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import CartContext from "../features/cartContext";
import Swiper from "react-native-swiper";

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Medium");

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    const productWithDetails = {
      ...product,
      quantity: quantity,
      size: selectedSize,
      totalPrice: product.price * quantity,
    };

    addToCart(productWithDetails);
    console.log("prod details",productWithDetails)
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        {product && product.images && product.images.length > 0 ? (
          <Swiper style={styles.wrapper} loop={false} height={350}>
            {product.images.map((image, index) => (
              <View key={index} style={styles.slide}>
                <Image source={{ uri: image }} style={styles.image} />
              </View>
            ))}
          </Swiper>
        ) : (
          <Text>No image available</Text>
        )}
      </View>

      {product && (
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{product.name || product.title}</Text>
          <Text style={styles.price}>₹{product.price}</Text>
          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.selectionContainer}>
            <Text style={styles.selectionLabel}>Quantity:</Text>
            <View style={styles.quantityControl}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={handleDecrement}
              >
                <Text style={{ color: "black" }}>-</Text>
              </TouchableOpacity>
              <Text>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={handleIncrement}
              >
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.sizeVariantBlock}>
            <Text style={styles.selectionLabel}>Size:</Text>
            <View style={styles.sizeSwatches}>
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.circle,
                    selectedSize === size && styles.selectedCircle,
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text style={styles.sizeLabel}>{size}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handleAddToCart}
          >
            <Text style={styles.buttonText}>Add to Bag</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10, // Add border radius
  },
  detailsContainer: {
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: "#FF9057",
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
    color: "#666",
  },
  selectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  selectionLabel: {
    fontSize: 18,
    marginRight: 10,
    color: "#333",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#EAEAEA",
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  sizeVariantBlock: {
    marginBottom: 20,
  },
  sizeSwatches: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginBottom: 10,
  },
  sizeLabel: {
    fontSize: 15,
    color: "#333",
  },
  selectedCircle: {
    backgroundColor: "#FF9057",
  },
  buttonContainer: {
    backgroundColor: "#FF9057",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default ProductDetailScreen;
