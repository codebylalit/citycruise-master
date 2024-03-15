import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import OfferCard from "../components/OfferCard";
import NewArrivalsCard from "../components/NewArrivalsCard";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthenticationModal from "../components/AuthenticationModal";
import AuthContext from "../features/authContext";
import ProductContext from "../features/productContext";
import { getProducts } from "../features/firebase/product";
import "react-native-tailwindcss";
import { StyleSheet } from "react-native";
import CategoryCard from "../Categories/CategoryCard";
import SearchHandler from "../components/SearchHandler";
import { Modal, Button} from "react-native";
import { color } from "react-native-tailwindcss";

const Home = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { isLoggedIn, currentUser } = useContext(AuthContext);
  const { products, setProducts } = useContext(ProductContext);
  const [showAddIcon, setShowAddIcon] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
const [passwordModalVisible, setPasswordModalVisible] = useState(false);
const [enteredPassword, setEnteredPassword] = useState("");
const [correctPassword, setCorrectPassword] = useState("arvind8094#");

const handleMenuPress = () => {
  setShowAddIcon((prev) => !prev);
};

const fetchAllProducts = async () => {
  const result = await getProducts();
  setProducts(result);
};

useEffect(() => {
  navigation.setOptions({
    headerShown: false,
  });

  fetchAllProducts();
}, []);

const handleAddProduct = () => {
  setPasswordModalVisible(true);
};

const handlePasswordSubmit = () => {
  if (enteredPassword === correctPassword) {
    navigateToAddProductScreen();
  } else {
    // Handle incorrect password
    console.log("Incorrect password");
  }
};

const navigateToAddProductScreen = () => {
  // Navigate to the addproductscreen
  navigation.navigate("addproductscreen");
  setPasswordModalVisible(false);
};
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e6e6fa" }}>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            marginTop: 15,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={handleAddProduct}>
              {showAddIcon && (
                <MaterialIcons name="add-circle" size={25} color="black" />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={handleMenuPress}>
              <View
                style={{
                  backgroundColor: "black",
                  borderRadius: 20,
                  width: 30,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialIcons name="mood" size={25} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: 20,
                fontFamily: "sans-serif",
                marginLeft: 2,
              }}
            >
              Lucky Fashions
            </Text>
          </View>
          {!isLoggedIn ? (
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "black",
                borderRadius: 50,
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  borderRadius: 20,
                  color: "black",
                  height: 22,
                  width: 55,
                }}
              >
                Login
              </Text>
            </Pressable>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  justifyContent: "center",
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 50,
                  paddingVertical: 5,
                  paddingHorizontal: 16,
                  fontWeight: "bold",
                  color: "black",
                  height: 30,
                  width: 60,
                }}
              >
                {currentUser?.name}
              </Text>
            </View>
          )}
        </View>
        <View style={{ marginTop: 15, paddingHorizontal: 15 }}>
          <SearchHandler
            navigation={navigation}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </View>

        <View style={{ marginTop: 10, paddingHorizontal: 5 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: "800",
                paddingHorizontal: 10,
                color: "black",
                marginBottom: 4,
              }}
            >
              New Arrivals
            </Text>

            <Pressable onPress={() => navigation.navigate("productlistscreen")}>
              <Text style={{ fontSize: 14, color: "#757575" }}>View All</Text>
            </Pressable>
          </View>
          <View
            style={{
              height: 3,
              backgroundColor: "black",
              marginLeft: 10,
              borderRadius: 1,
              width: 120,
            }}
          />
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {products?.map((product) => (
              <Pressable key={product.id}>
                <NewArrivalsCard
                  title={product.name}
                  image={product.images[0]}
                  price={product.price}
                  onPress={() => {
                    navigation.navigate("ProductDetailScreen", {
                      product: product,
                    });
                  }}
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={{ paddingHorizontal: 15 }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "800",
              color: "black",
              marginBottom: 4,
            }}
          >
            Categories
          </Text>
          <View
            style={{
              height: 3,
              backgroundColor: "black",
              borderRadius: 1,
              width: 120,
            }}
          />
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <CategoryCard
                title="Stylish Kurtis"
                image="https://2.bp.blogspot.com/-86LQWvBQaDY/WaAR6wp1pFI/AAAAAAAAAOA/ryxea8RIboAVKqQqM5rV4HFTrOx-C8AygCLcBGAs/s1600/A%2Bline%2Bkurti.jpg"
                price={299}
                title1="Legis"
                onPress={() => navigation.navigate("KurtisCategory")}
              />
              <CategoryCard
                title="Fashionable Tops"
                price={119}
                image="https://th.bing.com/th/id/OIP.nCoLlj-ECH4LGreqsjHizgHaJo?rs=1&pid=ImgDetMain"
                onPress={() => navigation.navigate("TopsCategory")}
              />
              <CategoryCard
                title="Tees & Combos"
                price={109}
                image="https://i.pinimg.com/originals/5a/ae/3c/5aae3c251abcafa2d7ea2a6ef3d28f7e.jpg"
                onPress={() => navigation.navigate("CombosCategory")}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <CategoryCard
                title="Kurti Sets"
                price={450}
                image="https://assets0.mirraw.com/images/8911086/image_zoom.jpeg?1619075604"
                onPress={() => navigation.navigate("KurtiSetsCategory")}
              />
              <CategoryCard
                title="Legis"
                price={199}
                image="https://n2.sdlcdn.com/imgs/a/u/j/Legis-Multicolour-Viscose-leggings-Pack-SDL116795715-1-65e27.jpg"
                onPress={() => navigation.navigate("LegisCategory")}
              />
              <CategoryCard
                title="Jeans"
                price={599}
                image="https://i.pinimg.com/originals/b5/24/06/b52406bf35c9354245e5177d9b8a4b2b.jpg"
                onPress={() => navigation.navigate("JeansCategory")}
              />
            </View>
          </View>
        </View>

        <AuthenticationModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={passwordModalVisible}
          onRequestClose={() => {
            setPasswordModalVisible(!passwordModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Enter Password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={(text) => setEnteredPassword(text)}
              />
              <Button title="Submit" color={"green"} onPress={handlePasswordSubmit} />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  modalView: {
    margin: 10,
    backgroundColor: "whitesmoke",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: "100%",
  },
});

export default Home;
