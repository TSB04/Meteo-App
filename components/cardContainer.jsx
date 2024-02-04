import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const CardContainer = ({ children }) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      >
        {React.Children.map(children, (child, index) => (
          <View style={{ marginRight: 10 }}>{child}</View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(55, 155, 205, 0.3)", 
    borderWidth: 1, 
    borderColor: "grey",
  },
})

export default CardContainer;
