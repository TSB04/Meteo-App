import React from "react";
import { Card, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome6";
import { View, StyleSheet, Image } from "react-native";
import dataConversion from "../services/dataConversion";
import cityService from "../services/cityService";

const CustomCard = ({
  date,
  temp,
  humidity,
  iconCode,
  city,
  isFavoritesScreen,
}) => {
  const weekday = dataConversion.setWeekDay(date);
  let icon = "";

  try {
    icon = cityService.getCityWeatherIcon(iconCode);
  } catch (error) {
    console.error("Error getting weather icon:", error);
  }

  const getBackgroundColor = (weatherCode) => {
    // Define a mapping of weather codes to background colors
    const colorMap = {
      // Add your mappings here based on the weather codes
      // For example:
      "01d": "rgba(255, 255, 0, 0.3)", // Clear sky (day)
      "01n": "rgba(0, 0, 255, 0.3)",   // Clear sky (night)
      // Add more mappings as needed
    };

    // Return the corresponding color from the map, or a default color
    return colorMap[weatherCode] || "rgba(55, 55, 255, 0.3)"; // Default color
  };

  const backgroundColor = isFavoritesScreen ? getBackgroundColor(iconCode) : "rgba(55, 55, 255, 0.3)";

  return (
    <Card style={[styles.card, isFavoritesScreen && styles.favoriteCard, { backgroundColor }]}>
      <Card.Content
        style={isFavoritesScreen ? styles.favoriteCardContent : null}
      >
        <View style={isFavoritesScreen ? styles.favoriteDataContainer : null}>
          <Text style={styles.text}>{isFavoritesScreen ? city : weekday}</Text>
          <Image source={{ uri: icon }} style={{ width: 40, height: 40 }} />
        </View>
        <View style={styles.dataRow}>
          <Icon name="temperature-half" style={styles.icon} />
          <Text style={styles.text}>
            {dataConversion.kelvinToCelsius(temp)}°C
          </Text>
        </View>
        <View style={styles.dataRow}>
          <Icon name="cloud-showers-water" style={styles.icon} />
          <Text style={styles.text}> {humidity}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 5,
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  favoriteCard: {
    // Additional styles for the card in the Favorites screen
  },
  favoriteCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  favoriteDataContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  dataRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  icon: {
    marginRight: 5,
    fontSize: 20,
    color: "white",
  },
  text: {
    fontSize: 16,
    color: "white",
  },
});

export default CustomCard;