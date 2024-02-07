import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

class CityService {
  getCityDetails(cityName) {
    const options = {
      method: "GET",
      url: `https://api.api-ninjas.com/v1/city?name=${cityName}`,
      headers: {
        "X-Api-Key": "KWARq4Tsl6eKE8zdyVu3QA==RhIhJ6UtAR1KMe6Z",
      },
    };

    return axios.request(options);
  }

  getCityWeather(city) {
    const apikey = "375703f2b2811efd7bd2d2a9f77682b7";

    return axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${city?.latitude}&lon=${city?.longitude}&appid=${apikey}`
    );
  }

  getCityWeatherForecast(city) {
    const apikey = "375703f2b2811efd7bd2d2a9f77682b7";

    return axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${city?.latitude}&lon=${city?.longitude}&appid=${apikey}`
    );
  }

  // getLocalCityWeather(lat, lon) {
  //   const apikey = "375703f2b2811efd7bd2d2a9f77682b7";

  //   return axios.get(
  //     `https://api.openweathermap.org/data/2.5/weather?lat=${lon}&lon=${lat}&appid=${apikey}`
  //   );
  // }

  // getLocalCityWeatherForcast(lat, lon) {
  //   const apikey = "375703f2b2811efd7bd2d2a9f77682b7";

  //   return axios.get(
  //     `http://api.openweathermap.org/data/2.5/forecast?lat=${lon}&lon=${lat}&appid=${apikey}`
  //   );
  // }

  getCityWeatherIcon(icon) {
    return `http://openweathermap.org/img/wn/${icon}.png`;
  }

  async addCityToFavorites(cityName) {
    try {
      // Retrieve existing favorite cities or initialize an empty array
      const existingFavoriteCitiesJson = await AsyncStorage.getItem(
        "favoriteCities"
      );
      let existingFavoriteCities = existingFavoriteCitiesJson
        ? JSON.parse(existingFavoriteCitiesJson)
        : [];

      // If existingFavoriteCities is not an array (e.g., it's null or undefined), initialize it as an empty array
      if (!Array.isArray(existingFavoriteCities)) {
        existingFavoriteCities = [];
      }

      // Add the new city name to the array if it's not already in the list
      if (!existingFavoriteCities.includes(cityName)) {
        existingFavoriteCities.push(cityName);

        // Save updated array back to AsyncStorage
        await AsyncStorage.setItem(
          "favoriteCities",
          JSON.stringify(existingFavoriteCities)
        );

        console.log("City added to favorites successfully!");
      } else {
        console.log("City is already in favorites.");
      }
    } catch (error) {
      console.error("Error adding city to favorites:", error);
    }
  }

  async removeFromFavorites(cityName) {
    try {
      // Get favoriteCities from AsyncStorage
      const favoriteCitiesString = await AsyncStorage.getItem("favoriteCities");

      // Parse favoriteCities into an array
      let favoriteCities = JSON.parse(favoriteCitiesString) || [];

      // Filter out the cityName from the array
      favoriteCities = favoriteCities.filter((city) => city !== cityName);

      // Save updated favoriteCities back to AsyncStorage
      await AsyncStorage.setItem(
        "favoriteCities",
        JSON.stringify(favoriteCities)
      );
    } catch (error) {
      console.error("Error removing city from favorites:", error);
    }
  }
}

export default new CityService();
