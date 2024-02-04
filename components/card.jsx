import React from "react";
import { Card, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome6";
import { View, StyleSheet, Image } from "react-native";
import dataConversion from "../services/dataConversion";
import cityService from "../services/cityService";

const CustomCard = ({ date, temp, humidity, iconCode, city }) => {
  const weekday = dataConversion.setWeekDay(date);
  const icon = cityService.getCityWeatherIcon(iconCode);

  return (
    <Card style={styles.card}>
      <Text>{city}</Text>
      <Card.Content>
        <View style={styles.dataRow}>
          <Text style={styles.text}>{weekday}</Text>
        </View>
        <Image source={{ uri: icon }} style={{ width: 40, height: 40 }} />
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
    backgroundColor: "rgba(55, 55, 255, 0.3)", 
    margin: 5,
    padding: 8,
    borderRadius: 10, 
    borderWidth: 1, 
    borderColor: "rgba(255, 255, 255, 0.5)",
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
