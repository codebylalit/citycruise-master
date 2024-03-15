// SearchHandler.js

import React, { useEffect } from "react";
import { Alert, View, TextInput, Pressable } from "react-native"; // Import Pressable
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const SearchHandler = ({ navigation, searchQuery, setSearchQuery }) => {
  // Define the handleSearch function
  const handleSearch = () => {
    const query = searchQuery.toLowerCase();

    // Define mappings for search keywords to category screens
    const categoryMappings = [
      {
        keywords: [
          "jeans",
          "denim",
          "denim pants",
          "blue jeans",
          "men's jeans",
          "women's jeans",
          "ladies jeans",
          "designer jeans",
          "casual jeans",
          "skinny jeans",
          "slim fit jeans",
          "straight jeans",
          "bootcut jeans",
          "distressed jeans",
          "ripped jeans",
          "high-waisted jeans",
        ],
        screen: "JeansCategory",
      },
      {
        keywords: [
          "kurti",
          "women's kurti",
          "ladies kurti",
          "designer kurti",
          "cotton kurti",
          "printed kurti",
          "embroidered kurti",
          "long kurti",
          "short kurti",
        ],
        screen: "KurtisCategory",
      },
      {
        keywords: [
          "kurti sets",
          "kurti and palazzo set",
          "kurti and skirt set",
          "kurti and leggings set",
          "kurti and dupatta set",
          "kurti and bottom set",
          "kurti and pants set",
          "kurti and dhoti set",
          "kurti with jacket set",
          "kurti with shrug set",
          "kurti with cape set",
          "designer kurti sets",
          "party wear kurti sets",
          "embroidered kurti sets",
          "printed kurti sets",
          "cotton kurti sets",
          "silk kurti sets",
          "rayon kurti sets",
          "long kurti sets",
          "short kurti sets",
        ],
        screen: "KurtiSetsCategory",
      },
      {
        keywords: [
          "tops",
          "womens tops",
          "ladies tops",
          "girls tops",
          "designer tops",
          "casual tops",
          "formal tops",
          "tank tops",
          "tunic tops",
          "crop tops",
          "off-shoulder tops",
          "bell sleeve tops",
          "sleeveless tops",
          "long sleeve tops",
          "short sleeve tops",
          "printed tops",
          "embroidered tops",
          "lace tops",
          "chiffon tops",
          "silk tops",
          "cotton tops",
          "denim tops",
          "blouse tops",
          "peplum tops",
          "wrap tops",
          "high-low tops",
        ],
        screen: "TopsCategory",
      },
      {
        keywords: [
          "tees",
          "t-shirts",
          "tee shirts",
          "tee-shirts",
          "tee tops",
          "tee-tops",
          "tees and combos",
          "t-shirts and combos",
          "tops and combos",
          "tee shirts and combos",
          "tee-shirts and combos",
          "tee tops and combos",
          "tee-tops and combos",
          "t-shirts with pants combo",
          "tops with shorts combo",
          "tee shirts with skirts combo",
          "tee-shirts with leggings combo",
          "tee tops with jeans combo",
          "tee-tops with capris combo",
          "tees with accessories combo",
          "t-shirts with jackets combo",
          "tops with scarves combo",
          "tee shirts with hats combo",
          "tee-shirts with bags combo",
        ],
        screen: "CombosCategory",
      },
      {
        keywords: [
          "legis",
          "legi",
          "leegis",
          "leggings",
          "women's leggings",
          "ladies leggings",
          "girls leggings",
          "yoga leggings",
          "sports leggings",
          "high-waisted leggings",
          "capri leggings",
          "ankle-length leggings",
          "cropped leggings",
          "printed leggings",
          "solid color leggings",
          "patterned leggings",
          "seamless leggings",
          "mesh leggings",
          "workout leggings",
          "compression leggings",
          "tummy control leggings",
          "butt lift leggings",
          "fleece-lined leggings",
          "maternity leggings",
        ],
        screen: "LegisCategory",
      },
    ];

    // Check if the query matches any category keyword
    for (const mapping of categoryMappings) {
      for (const keyword of mapping.keywords) {
        if (query.includes(keyword.toLowerCase())) {
          navigation.navigate(mapping.screen);
          return;
        }
      }
    }

    // If no matching category is found, display an alert
  };

  // Call handleSearch whenever searchQuery changes
  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  // Handle search when search icon is pressed
  const handleSearchIconPress = () => {
    handleSearch();
  };

  // Return the search input field and icon
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        padding: 7,
        paddingHorizontal: 15,
        borderRadius: 20,
      }}
    >
      <TextInput
        placeholder="Search..."
        placeholderTextColor="#757575"
        style={{ flex: 1, marginLeft: 1 }}
        value={searchQuery}
        onSubmitEditing={handleSearch} // Handle search on submit
        onChangeText={setSearchQuery}
      />
      <Pressable onPress={handleSearchIconPress}>
        
        <MaterialIcons name="search" size={30} color="#424242" />
      </Pressable>
    </View>
  );
};

export default SearchHandler;
