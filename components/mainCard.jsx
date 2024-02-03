import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Card, Surface } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Feather";
import dataConversion from "../services/dataConversion"
const MainCard = ({ weatherForcast, weather, cityName }) => {
  
  return (
    <Card
      style={{
        backgroundColor: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Surface style={styles.Surface2}>
        <Card.Title
          title={cityName}
          subtitle={weatherForcast?.[0]?.weather?.[0]?.description}
          titleStyle={{
            color: "white",
            fontSize: 20,
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
                width: 60,
                height: 60,
              }}
            >
              {/* <Avatar.Icon {...props} icon="folder" fontSize={20} /> */}
              <Icon2
                name="cloud" // Example icon name, replace with dynamic value if needed
                style={{ fontSize: 50, color: "white" }} // Adjust styling as needed
              />
            </View>
          )}
        />
      </Surface>

      <Card.Content style={{ flexDirection: "row", alignItems: "center" }}>
        <Surface style={styles.surface}>
          <Text style={styles.weatherInfoText}>
            Temp: {dataConversion.kelvinToCelsius(weatherForcast?.[0]?.main?.temp)}°C
          </Text>
          <Text style={styles.weatherInfoText}>
            Feels like: {dataConversion.kelvinToCelsius(weather?.main?.feels_like)}°C
          </Text>
        </Surface>
        <Surface style={styles.surface}>
          <View style={styles.weatherInfoItem}>
            <Icon
              name="thermometer-three-quarters"
              style={styles.weatherIcon}
            />
            <Text style={styles.weatherInfoText}>
              Max: {dataConversion.kelvinToCelsius(weatherForcast?.[0]?.main?.temp_max)}°C
            </Text>
          </View>
          <View style={styles.weatherInfoItem}>
            <Icon name="thermometer-quarter" style={styles.weatherIcon} />
            <Text style={styles.weatherInfoText}>
              Min: {dataConversion.kelvinToCelsius(weatherForcast?.[0]?.main?.temp_min)}°C
            </Text>
          </View>
        </Surface>
        <Surface style={styles.surface}>
          <View style={styles.weatherInfoItem}>
            <Icon name="tint" style={styles.weatherIcon} />
            <Text style={styles.weatherInfoText}>
              {""} {weatherForcast?.[0]?.main?.humidity}%
            </Text>
          </View>
          <View style={styles.weatherInfoItem}>
            <Icon2 name="wind" style={styles.weatherIcon} />
            <Text style={styles.weatherInfoText}>
              {""} {weatherForcast?.[0]?.wind?.speed} m/s
            </Text>
          </View>
        </Surface>
      </Card.Content>

      <Surface style={styles.Surface2}>
        <View style={styles.weatherInfoItem}>
          <Icon2 name="sunrise" style={styles.weatherIcon} />
          <Text style={styles.weatherInfoText}>
            Sunrise: {dataConversion.formatTime(weather?.sys?.sunrise)}
          </Text>
        </View>
        <View style={styles.weatherInfoItem}>
          <Icon2 name="sunset" style={styles.weatherIcon} />
          <Text style={styles.weatherInfoText}>
            Sunset: {dataConversion.formatTime(weather?.sys?.sunset)}
          </Text>
        </View>
      </Surface>

      <Card.Actions>
        <Button>+</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  surface: {
    padding: 5,
    height: 70,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  Surface2: {
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

export default MainCard;
