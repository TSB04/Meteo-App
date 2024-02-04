import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Card, Surface, IconButton } from "react-native-paper";
import Icon1 from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Feather";
import Icon3 from "react-native-vector-icons/FontAwesome6";
import dataConversion from "../services/dataConversion";
import cityService from "../services/cityService";
import SnackBar from "./snackBar";

const MainCard = ({
  description,
  temp,
  feelsLike,
  max,
  min,
  humidity,
  windSpeed,
  cityName,
  iconCode,
  sunrise,
  sunset,
}) => {
  const icon = cityService.getCityWeatherIcon(iconCode);
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  const handleSaveClick = () => {
    try {
      cityService.addCityToFavorites(cityName);

      setSnackBarMessage(`${cityName} added to favorites`);
      setSnackBarVisible(true);
    } catch (error) {
      setSnackBarMessage(error);
      setSnackBarVisible(true);
    }
  };

  return (
    <>
      <SnackBar
        message={snackBarMessage}
        setVisible={setSnackBarVisible}
        visible={snackBarVisible}
      />
      <Card
        style={{
          backgroundColor: "red",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(55, 155, 205, 0.2)",
          padding: 0,
        }}
      >
        <Surface style={styles.Surface2}>
          <Card.Title
            title={cityName}
            subtitle={description}
            titleStyle={{
              color: "white",
              fontSize: 26,
              textAlign: "center",
            }}
            subtitleStyle={{
              color: "white",
              fontSize: 16,
              textAlign: "center",
            }}
            left={(props) => (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 50,
                  width: 80,
                  height: 80,
                }}
              >
                <Image
                  source={{ uri: icon }}
                  style={{ width: 120, height: 100 }}
                />
              </View>
            )}
          />
        </Surface>

        <Card.Content style={{ flexDirection: "row", alignItems: "center" }}>
          <Surface style={styles.surface}>
            <Text style={styles.weatherInfoText}>
              Temp: {dataConversion.kelvinToCelsius(temp)}°C
            </Text>
            <Text style={styles.weatherInfoText}>
              Feels like: {dataConversion.kelvinToCelsius(feelsLike)}°C
            </Text>
          </Surface>
          <Surface style={styles.surface}>
            <View style={styles.weatherInfoItem}>
              <Icon1
                name="thermometer-three-quarters"
                style={styles.weatherIcon}
              />
              <Text style={styles.weatherInfoText}>
                Max: {dataConversion.kelvinToCelsius(max)}
                °C
              </Text>
            </View>
            <View style={styles.weatherInfoItem}>
              <Icon1 name="thermometer-quarter" style={styles.weatherIcon} />
              <Text style={styles.weatherInfoText}>
                Min: {dataConversion.kelvinToCelsius(min)}
                °C
              </Text>
            </View>
          </Surface>
          <Surface style={styles.surface}>
            <View style={styles.weatherInfoItem}>
              {humidity > 60 ? (
                <Icon3 name="cloud-showers-water" style={styles.weatherIcon} />
              ) : (
                <Icon1 name="tint" style={styles.weatherIcon} />
              )}
              <Text style={styles.weatherInfoText}>
                {""} {humidity}%
              </Text>
            </View>
            <View style={styles.weatherInfoItem}>
              <Icon2 name="wind" style={styles.weatherIcon} />
              <Text style={styles.weatherInfoText}>
                {""} {windSpeed} m/s
              </Text>
            </View>
          </Surface>
        </Card.Content>

        <Surface style={styles.Surface2}>
          <View style={styles.weatherInfoItem}>
            <Icon2 name="sunrise" style={styles.weatherIcon} />
            <Text style={styles.weatherInfoText}>
              Sunrise: {dataConversion.formatTime(sunrise)}
            </Text>
          </View>
          <View style={styles.weatherInfoItem}>
            <Icon2 name="sunset" style={styles.weatherIcon} />
            <Text style={styles.weatherInfoText}>
              Sunset: {dataConversion.formatTime(sunset)}
            </Text>
          </View>
        </Surface>

        <Card.Actions>
          <IconButton
            icon="bookmark-plus"
            iconColor="white"
            size={30}
            onPress={handleSaveClick}
          />
        </Card.Actions>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  surface: {
    padding: 5,
    height: 120,
    width: 120,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "transparent",
  },
  Surface2: {
    flexDirection: "row",
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "transparent",
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
});

export default MainCard;
