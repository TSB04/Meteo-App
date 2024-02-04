import React from "react";
import { Card, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome6";
import Icon1 from "react-native-vector-icons/FontAwesome";
import { View, StyleSheet, ImageBackground, Image } from "react-native";
import dataConversion from "../services/dataConversion";
import cityService from "../services/cityService";
import getBackgroundImage from "../services/backgrdService";

const CustomCard = ({
  date,
  temp,
  humidity,
  iconCode,
  city,
  description,
  isFavoritesScreen,
}) => {
  const styles = StyleSheet.create({
    card: {
      margin: 5,
      padding: isFavoritesScreen ? 20 : 8,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.5)",
      overflow: "hidden", // Ensure the background image fits within the card
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
  const weekday = dataConversion.setWeekDay(date);
  let icon = "";

  try {
    icon = cityService.getCityWeatherIcon(iconCode);
  } catch (error) {
    console.error("Error getting weather icon:", error);
  }

  const backgroundImage = isFavoritesScreen
    ? getBackgroundImage(iconCode)
    : null;

  return (
    <ImageBackground
      source={backgroundImage}
      style={[styles.card, isFavoritesScreen && styles.favoriteCard]}
    >
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
          {humidity > 60 ? (
            <Icon name="cloud-showers-water" style={styles.icon} />
          ) : (
            <Icon1 name="tint" style={styles.icon} />
          )}
          <Text style={styles.text}> {humidity}</Text>
        </View>
      </Card.Content>
      {isFavoritesScreen && <Text style={styles.text}>{description}</Text>}
    </ImageBackground>
  );
};

export default CustomCard;
