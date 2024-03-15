import React, { useState } from "react";
import { View, TouchableOpacity, Modal, Text, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const CategorySelector = ({ selectedCategory, onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const categories = [
    { title: "Stylish Kurtis", screen: "KurtisCategory" },
    { title: "Fashionable Tops", screen: "TopsCategory" },
    { title: "Tees & Combos", screen: "CombosCategory" },
    { title: "Kurti Sets", screen: "KurtiSetsCategory" },
    { title: "Legis", screen: "LegisCategory" },
    { title: "Jeans", screen: "JeansCategory" },
  ];

  const handleCategorySelect = (category) => {
    onSelect(category);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>{selectedCategory || "Select Category"}</Text>
        <MaterialIcons name="keyboard-arrow-down" size={24} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.categoryItem}
                onPress={() => handleCategorySelect(category.screen)}
              >
                <Text>{category.title}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
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
  categoryItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
    alignItems: "center",
  },
  cancelText: {
    marginTop: 10,
    color: "red",
  },
});

export default CategorySelector;
