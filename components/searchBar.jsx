import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Searchbar, useTheme } from "react-native-paper";

const CustomSearchbar = ({ onSearch }) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      padding: "8%",
      backgroundColor: theme.colors.tertiary
    },
  });
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        onSubmitEditing={handleSearch}
      />
    </View>
  );
};



export default CustomSearchbar;
