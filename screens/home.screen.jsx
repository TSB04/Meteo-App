import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import CustomSearchbar from "../components/searchBar";
import cityService from "../services/cityService";
import {
  ActivityIndicator,
  Button,
  Card,
  Surface,
  useTheme,
} from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    background: {
      flex: 1,
      resizeMode: "cover", // Make sure the background image covers the entire container
      // alignItems: "center",
    },
    overlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(250, 0, 0, 0.5)", // Semi-transparent overlay to improve visibility of text
      paddingHorizontal: 20,
      flexDirection: "column",
      gap: 2,
    },
    globalWeatherInfo: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 250, 0.5)", // Semi-transparent overlay to improve visibility of text
      paddingHorizontal: 20,
      flexDirection: "column",
      gap: 2,
    },
    surface: {
      padding: 5,
      height: 70,
      width: 120,
      alignItems: "center",
      justifyContent: "center",
      gap: 3,
      backgroundColor: "transparent",
    },
    Surface2: {
      flex: 1,
      flexDirection: "row",
      paddingVertical: 30,
      alignItems: "center",
      justifyContent: "space-around",
      backgroundColor: "transparent",
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
      flexDirection: "columnn",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },
    weatherInfoItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    },

    weatherInfoText: {
      fontSize: 14,
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

  const averageTemperature = (maxTemp, minTemp) => {
    return (maxTemp + minTemp) / 2;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  };

  const weatherIcons = {
    "clear sky": "sun", // Example: You need to replace "sun" with the actual icon name you want to use
    "few clouds": "cloud-sun", // Example: You need to replace "cloud-sun" with the actual icon name you want to use
    // Add more mappings for other weather descriptions as needed
  };

  const getWeatherIcon = (description) => {
    const lowerCaseDescription = description
    return weatherIcons[lowerCaseDescription] || "question"; // Default to a question mark icon if no matching icon found
  };

  console.log(weather);
  console.log("details", cityDetails);

  return (
    <SafeAreaView style={styles.container}>
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
          <SafeAreaView style={styles.globalWeatherInfo}>
            <View style={styles.overlay}>
              <Card style={{ backgroundColor: "transparent", color: "white" }}>
                <Surface style={styles.Surface2}>
                  <Icon
                    name={getWeatherIcon(weather?.weather[0]?.description)}
                    style={{ fontSize: 100, color: "white" }}
                  />
                  <Card.Title
                    title={cityDetails?.name}
                    subtitle={weather?.weather[0]?.description}
                    titleStyle={{ color: "white", fontSize: 20 }}
                    subtitleStyle={{ color: "white", fontSize: 16 }}
                  />
                </Surface>

                <Card.Content style={{ flexDirection: "row" }}>
                  <Surface style={styles.surface}>
                    <Text style={{ ...styles.weatherInfoText, color: "white" }}>
                      Temp:
                      {kelvinToCelsius(
                        averageTemperature(
                          weather?.main?.temp_max,
                          weather?.main?.temp_min
                        )
                      )}
                      °C
                    </Text>
                    <Text style={{ ...styles.weatherInfoText, color: "white" }}>
                      Feels like: {kelvinToCelsius(weather?.main?.feels_like)}°C
                    </Text>
                  </Surface>
                  <Surface style={styles.surface}>
                    <View style={styles.weatherInfoItem}>
                      <Icon
                        name="thermometer-three-quarters"
                        style={styles.weatherIcon}
                      />
                      <Text
                        style={{ ...styles.weatherInfoText, color: "white" }}
                      >
                        Max: {kelvinToCelsius(weather?.main?.temp_max)}°C
                      </Text>
                    </View>
                    <View style={styles.weatherInfoItem}>
                      <Icon
                        name="thermometer-quarter"
                        style={styles.weatherIcon}
                      />
                      <Text
                        style={{ ...styles.weatherInfoText, color: "white" }}
                      >
                        Min: {kelvinToCelsius(weather?.main?.temp_min)}°C
                      </Text>
                    </View>
                  </Surface>
                  <Surface style={styles.surface}>
                    <View style={styles.weatherInfoItem}>
                      <Icon name="tint" style={styles.weatherIcon} />
                      <Text
                        style={{ ...styles.weatherInfoText, color: "white" }}
                      >
                        {""} {weather?.main?.humidity}%
                      </Text>
                    </View>
                    <View style={styles.weatherInfoItem}>
                      <Icon2 name="wind" style={styles.weatherIcon} />
                      <Text
                        style={{ ...styles.weatherInfoText, color: "white" }}
                      >
                        {""} {weather?.wind?.speed} m/s
                      </Text>
                    </View>
                  </Surface>
                </Card.Content>
                <Surface style={styles.Surface2} elevation={0}>
                  <View style={styles.weatherInfoItem}>
                    <Icon2 name="sunrise" style={styles.weatherIcon} />
                    <Text style={{ ...styles.weatherInfoText, color: "white" }}>
                      Sunrise: {formatTime(weather?.sys?.sunrise)}
                    </Text>
                  </View>
                  <View style={styles.weatherInfoItem}>
                    <Icon2 name="sunset" style={styles.weatherIcon} />
                    <Text style={{ ...styles.weatherInfoText, color: "white" }}>
                      Sunset: {formatTime(weather?.sys?.sunset)}
                    </Text>
                  </View>
                </Surface>

                <Card.Actions>
                  <Button>+</Button>
                </Card.Actions>
              </Card>

            </View>
            {/* <View>forcast for the week end</View> */}
          </SafeAreaView>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomeScreen;
