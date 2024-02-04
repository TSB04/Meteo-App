import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect from React Navigation
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomCard from "../components/card";
import cityService from "../services/cityService";

const FavorisScreen = () => {
  const [favoriteCities, setFavoriteCities] = useState([]);

  // Function to load favorite cities from AsyncStorage
  const loadFavoriteCities = async () => {
    try {
      const savedCities = await AsyncStorage.getItem("favoriteCities");
      if (savedCities) {
        setFavoriteCities(JSON.parse(savedCities));
      }
    } catch (error) {
      console.error("Error loading favorite cities:", error);
    }
  };

  // Call loadFavoriteCities each time the screen is focused
  useFocusEffect(
    useCallback(() => {
      loadFavoriteCities();
    }, [])
  );

  // Dummy function for fetching weather data (replace with actual implementation)
  const fetchWeather = async (cityName, countryCode) => {
    // Example fetch call to a weather API
    // Implement your logic to fetch weather data for a city
    // Return the weather data
    return { temperature: 20, description: "Sunny" }; // Dummy data
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
                city={item} // Pass the city name directly
                // You might want to fetch weather data for each city here
                
              />
              <TouchableOpacity
                onPress={async () => {
                  try {
                    await cityService.removeFromFavorites(item);
                    // After removing the city, update the favoriteCities state to reflect the change
                    const updatedCities = favoriteCities.filter(
                      (city) => city !== item
                    );
                    setFavoriteCities(updatedCities);
                  } catch (error) {
                    console.error("Error removing city from favorites:", error);
                  }
                }}
              >
                <Text style={{ color: "red", textAlign: "center" }}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default FavorisScreen;
