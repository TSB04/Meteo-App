import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

const Background = ({ children }) => {
    
  return (
    <ImageBackground
      source={require("../assets/night-with-clouds-weather-app-screen-mobile-interface-design-forecast-weather-background-time-concept-vector-banner_87946-4287.avif")}
      style={styles.background}
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: "cover", // Make sure the background image covers the entire container
        // alignItems: "center",
      },
})


export default Background;
