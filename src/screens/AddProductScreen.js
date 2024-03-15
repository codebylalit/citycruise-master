import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import * as ImagePicker from "expo-image-picker";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

const AddProductScreen = ({ route }) => {
  const navigation = useNavigation();
  const [category, setCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Define your categories with their corresponding screens
  const categories = [
    { title: "Stylish Kurtis", screen: "KurtisCategory" },
    { title: "Fashionable Tops", screen: "TopsCategory" },
    { title: "Tees & Combos", screen: "CombosCategory" },
    { title: "Kurti Sets", screen: "KurtiSetsCategory" },
    { title: "Legis", screen: "LegisCategory" },
    { title: "Jeans", screen: "JeansCategory" },
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    // You can perform any additional actions here when a category is selected
  };

  useEffect(() => {
    console.log("Category:", category);
  }, [category]);

  const [productData, setProductData] = useState({
    imageName: "",
    description: "",
    price: "",
    images: [],
    category: category, // Include category in product data
  });
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Permission to access photo library required!");
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        multiple: true,
      });

      if (!result.canceled) {
        const formattedImages = result.assets.map((asset) => ({
          uri: asset.uri,
        }));
        setProductData({
          ...productData,
          images: [...productData.images, ...formattedImages],
        });
      }
    } catch (error) {
      console.error("Error picking image from gallery:", error);
      Alert.alert("Error", "Failed to pick image. Please try again later.");
    }
  };

  const addProductToFirestore = async (productData) => {
    try {
      const docRef = await addDoc(collection(db, "products"), productData);
      console.log("Product added with ID: ", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error adding product: ", error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (
      !productData.imageName ||
      !productData.description ||
      !productData.price ||
      !productData.images.length ||
      !selectedCategory
    ) {
      Alert.alert(
        "Missing Information",
        "Please fill in all fields and upload at least one image"
      );
      return;
    }

    setLoading(true);

    try {
      const downloadURLs = await Promise.all(
        productData.images.map(async (image, index) => {
          const response = await fetch(image.uri);
          const blob = await response.blob();
          const imageFileName = `${productData.imageName
            .trim()
            .replace(/\s+/g, "_")}_${index}.jpg`;
          const storageRef = ref(storage, `products/${imageFileName}`);
          await uploadBytes(storageRef, blob);
          return getDownloadURL(storageRef);
        })
      );

      await addProductToFirestore({
        name: productData.imageName,
        description: productData.description,
        price: productData.price,
        images: downloadURLs,
        category: selectedCategory,
        categoryId:
          categories.find((cat) => cat.screen === selectedCategory)?.id || null,
      });

      setLoading(false);
      Alert.alert("Success", "Product added successfully");

      // Navigate to the appropriate category screen based on selectedCategory
      navigation.navigate(selectedCategory);

      setProductData({
        imageName: "",
        description: "",
        price: "",
        images: [],
        category: category,
      });
    } catch (error) {
      console.error("Error adding product:", error);
      setLoading(false);
      Alert.alert("Error", "Failed to add product. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.label}>Product Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Product Name"
          value={productData.imageName}
          onChangeText={(text) =>
            setProductData({ ...productData, imageName: text })
          }
        />

        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Description"
          value={productData.description}
          onChangeText={(text) =>
            setProductData({ ...productData, description: text })
          }
        />

        <Text style={styles.label}>Price:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Price"
          value={productData.price}
          onChangeText={(text) =>
            setProductData({ ...productData, price: text })
          }
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#2196F3" }]}
          onPress={handleImageUpload}
        >
          <Text style={styles.buttonText}>Select Images</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Select Category:</Text>
        <View style={styles.categoryContainer}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                selectedCategory === category.screen &&
                  styles.selectedCategoryButton,
              ]}
              onPress={() => handleCategorySelect(category.screen)}
            >
              <Text style={styles.categoryButtonText}>{category.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.imageContainer}>
          {productData.images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image.uri }}
              style={styles.image}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#4CAF50" }]}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Add Product</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator style={styles.loading} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
    fontSize: 14,
  },
  button: {
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  loading: {
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  categoryButton: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    margin: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  selectedCategoryButton: {
    backgroundColor: "#FF7F50",
  },
  categoryButtonText: {
    fontSize: 14,
    color: "#333",
  },
});

export default AddProductScreen;
