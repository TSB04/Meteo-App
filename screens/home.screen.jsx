import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";

const HomeScreen = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    // Mock API call to fetch weather data
    fetchWeatherData();
  }, []);

  const fetchWeatherData = () => {
    // Mock API response
    const mockWeatherData = {
      temperature: 25,
      description: "Sunny",
    };
    // Simulating API call delay
    setTimeout(() => {
      setWeather(mockWeatherData);
    }, 1000);
  };

  return (
    <ImageBackground
      source={require("../assets/night-with-clouds-weather-app-screen-mobile-interface-design-forecast-weather-background-time-concept-vector-banner_87946-4287.avif")} // Change the path to your image
      style={styles.container}
    >
      <View style={styles.overlay}>
        {weather ? (
          <>
            <Text style={styles.title}>Weather App</Text>
            <Text style={styles.temperature}>{weather.temperature}°C</Text>
            <Text style={styles.description}>{weather.description}</Text>
          </>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Overlay to improve readability of text
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  temperature: {
    fontSize: 20,
    marginBottom: 5,
    color: "white",
  },
  description: {
    fontSize: 16,
    color: "white",
  },
});

export default HomeScreen;
