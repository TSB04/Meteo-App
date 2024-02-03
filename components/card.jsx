import React from "react";
import { Card, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome6";
import { View, StyleSheet } from "react-native";
import dataConversion from "../services/dataConversion";

const CustomCard = ({ date, temp, humidity }) => {
  const weekday = dataConversion.setWeekDay(date);

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.dataRow}>
          <Text style={styles.text}>{weekday}</Text>
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
    backgroundColor: "transparent", // Set card background to transparent
    margin: 10,
    padding: 10,
    gap: 5,
  },
  dataRow: {
    flexDirection: "row",
    alignItems: "center", // Align items horizontally
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
