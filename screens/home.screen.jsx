import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import CustomSearchbar from "../components/searchBar";
import cityService from "../services/cityService";
import { ActivityIndicator, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome"; 
import Icon2 from "react-native-vector-icons/Feather"; 

const HomeScreen = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    background: {
      flex: 1,
      resizeMode: "cover", // Make sure the background image covers the entire container
    },
    overlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay to improve visibility of text
      paddingHorizontal: 20,
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
    weatherInfoContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    weatherInfoText: {
      fontSize: 16,
      color: "white",
    },
    weatherIcon: {
      fontSize: 24,
      color: "white",
      marginRight: 5,
    },
    description: {
      fontSize: 16,
      color: "white",
    },
  });

  const [cityDetails, setCityDetails] = useState({});
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOnSearch = async (e) => {
    setLoading(true);
    try {
      const getCityDetails = await cityService.getCityDetails(e);
      const weatherData = await cityService.getCityWeather(
        getCityDetails?.data[0]
      );
      setWeather(weatherData.data);
      setCityDetails(getCityDetails?.data[0]);
    } catch (error) {
      console.error("Error fetching city details or weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  const kelvinToCelsius = (kelvin) => {
    return Math.round(kelvin - 273.15);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  };

  console.log(weather);
  console.log("details", cityDetails);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/night-with-clouds-weather-app-screen-mobile-interface-design-forecast-weather-background-time-concept-vector-banner_87946-4287.avif")}
        style={styles.background}
      >
        <CustomSearchbar
          onSearch={handleOnSearch}
          style={{ backgroundColor: "transparent" }}
        />

        {loading && (
          <View style={styles.loader}>
            <ActivityIndicator color="white" size="large" />
          </View>
        )}

        {!loading && (
          <View style={styles.overlay}>
            <Text style={styles.title}>{cityDetails?.name}</Text>
            <Text style={styles.temperature}>
              {kelvinToCelsius(weather?.main?.feels_like)}
            </Text>
            <View style={styles.weatherInfoContainer}>
              <Icon
                name="thermometer-three-quarters"
                style={styles.weatherIcon}
              />
              <Text style={styles.weatherInfoText}>
                Max: {kelvinToCelsius(weather?.main?.temp_max)}°C
              </Text>
            </View>
            <View style={styles.weatherInfoContainer}>
              <Icon name="thermometer-quarter" style={styles.weatherIcon} />
              <Text style={styles.weatherInfoText}>
                Min: {kelvinToCelsius(weather?.main?.temp_min)}°C
              </Text>
            </View>
            <View style={styles.weatherInfoContainer}>
              <Icon name="tint" style={styles.weatherIcon} />
              <Text style={styles.weatherInfoText}>
                Humidity: {weather?.main?.humidity}%
              </Text>
            </View>
            <View style={styles.weatherInfoContainer}>
              <Icon2 name="wind" style={styles.weatherIcon} />
              <Text style={styles.weatherInfoText}>
                Wind Speed: {weather?.wind?.speed} m/s
              </Text>
            </View>
            <View style={styles.weatherInfoContainer}>
              <Icon2 name="sunrise" style={styles.weatherIcon} />
              <Text style={styles.weatherInfoText}>
                Sunrise: {formatTime(weather?.sys?.sunrise)}
              </Text>
            </View>
            <View style={styles.weatherInfoContainer}>
              <Icon2 name="sunset" style={styles.weatherIcon} />
              <Text style={styles.weatherInfoText}>
                Sunset: {formatTime(weather?.sys?.sunset)}
              </Text>
            </View>
            <Text style={styles.description}>
              {weather?.weather[0]?.description}
            </Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;
