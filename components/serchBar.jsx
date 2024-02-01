import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SearchBar } from "react-native-elements";

const CustomSearchbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        onSubmitEditing={handleSearch}
        containerStyle={styles.searchContainer}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        cancelButtonTitle="Cancel"
        cancelButtonTitleStyle={styles.cancelButton}
        cancelButtonProps={{ color: "#333" }}
        clearIcon={{ color: "#333" }}
        searchIcon={{ color: "#333" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  searchContainer: {
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
  },
  inputContainer: {
    backgroundColor: "#f5f5f5",
  },
  input: {
    color: "#333",
  },
  cancelButton: {
    color: "#333",
  },
});

export default CustomSearchbar;
