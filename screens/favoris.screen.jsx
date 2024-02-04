import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomCard from "../components/card";
import cityService from "../services/cityService";
import { Badge } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import SnackBar from "../components/snackBar";

const FavorisScreen = () => {
  const navigation = useNavigation();
  const [cityDetails, setCityDetails] = useState(null);
  const [weatherForcast, setWeatherForcast] = useState(null);
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");

  // Function to load favorite cities from AsyncStorage
  const loadFavoriteCities = useCallback(async () => {
    try {
      const savedCities = await AsyncStorage.getItem("favoriteCities");
      if (savedCities) {
        setFavoriteCities(JSON.parse(savedCities));
      }
    } catch (error) {
      console.error("Error loading favorite cities:", error);
    }
  }, []);

  // Fetch weather data for a city
  const fetchWeather = async (cityName) => {
    try {
      const cityDetails = await cityService.getCityDetails(cityName);
      const weatherForcastData = await cityService.getCityWeatherForcast(
        cityDetails?.data[0]
      );
      setWeatherForcast((prevWeatherData) => {
        return {
          ...prevWeatherData,
          [cityName]: weatherForcastData?.data?.list,
        };
      });
      setCityDetails((prevCityDetails) => {
        return {
          ...prevCityDetails,
          [cityName]: cityDetails?.data[0],
        };
      });
    } catch (error) {
      console.error("Error fetching city details or weather data:", error);
    }
  };

  useEffect(() => {
    loadFavoriteCities();
  }, []);

  // Use useFocusEffect to fetch weather data for favorite cities
  useFocusEffect(
    useCallback(() => {
      favoriteCities.forEach((city) => fetchWeather(city));
    }, [favoriteCities])
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // Refresh data when the screen is focused
      loadFavoriteCities();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "rgba(150, 150,150, 0.8)" }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ textAlign: "center", fontSize: 20 }}>
          Favorite Cities
        </Text>
        <FlatList
          data={favoriteCities}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <CustomCard
                isFavoritesScreen
                city={item}
                temp={weatherForcast?.[item]?.[0]?.main.temp}
                humidity={weatherForcast?.[item]?.[0]?.main.humidity}
                iconCode={weatherForcast?.[item]?.[0]?.weather[0]?.icon}
                description={
                  weatherForcast?.[item]?.[0]?.weather[0].description
                }
              />

              <TouchableOpacity
                style={styles.removeBadgeContainer}
                onPress={async () => {
                  try {
                    await cityService.removeFromFavorites(item);
                    const updatedCities = favoriteCities.filter(
                      (city) => city !== item
                    );
                    setFavoriteCities(updatedCities);
                    setSnackBarMessage(
                      `${item} has been removed from favorites`
                    );
                    setSnackBarVisible(true);
                  } catch (error) {
                    console.error(error);
                    setSnackBarMessage(error);
                    setSnackBarVisible(true);
                  }
                }}
              >
                <Badge style={styles.removeBadge}>
                  <Icon name="remove-circle-outline" />
                </Badge>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <SnackBar
        message={snackBarMessage}
        setVisible={setSnackBarVisible}
        visible={snackBarVisible}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16, // Adjust margin as needed
    marginBottom: 16, // Adjust margin as needed
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Adjust background color as needed
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)", // Adjust border color as needed
  },
  removeBadgeContainer: {
    position: "absolute",
    right: 0,
  },
  removeBadge: {},
});

export default FavorisScreen;
