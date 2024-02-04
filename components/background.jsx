import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import getBackgroundImage from "../services/backgrdService";

const Background = ({ children, iconCode }) => {
  
  return (
    <View style={styles.container}>
      <ImageBackground
        source={getBackgroundImage(iconCode)}
        style={styles.background}
      >
        {children}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    justifyContent: "space-around",
  },
});

export default Background;