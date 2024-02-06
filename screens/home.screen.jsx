import React, { useEffect, useState } from "react";
import CustomSearchbar from "../components/searchBar";
import cityService from "../services/cityService";
import { ActivityIndicator } from "react-native-paper";
import CustomCard from "../components/card";
import CardContainer from "../components/cardContainer";
import Background from "../components/background";
import MainCard from "../components/mainCard";
import { View } from "react-native";
import SnackBar from "../components/snackBar";

function HomeScreen() {
  const [cityDetails, setCityDetails] = useState(null);
  const [weather, setWeather] = useState(null);
  const [weatherForcast, setWeatherForcast] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Function to fetch weather data based on user's current location
    const fetchWeatherDataByLocation = async () => {
      try {
        // Get current position using geolocation API
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          // Fetch current weather based on latitude and longitude
          
          const cityWeather = await cityService.getCityWeather({ latitude, longitude });
          setWeather(cityWeather);
          setLoading(false); // Set loading to false after data is fetched
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    // Call the function to fetch weather data by location
    fetchWeatherDataByLocation();
  }, []);

  const handleOnSearch = async (e) => {
    setLoading(true);
    try {
      const getCityDetails = await cityService.getCityDetails(e);
      // only using weatherData for sun set and rise data
      const weatherData = await cityService.getCityWeather(
        getCityDetails?.data[0]
      );
      // weatherForcastData gives all the needed data except for the sun info
      const weatherForcastData = await cityService.getCityWeatherForcast(
        getCityDetails?.data[0]
      );
      setWeather(weatherData.data);
      setWeatherForcast(weatherForcastData?.data?.list);
      setCityDetails(getCityDetails?.data[0]);
    } catch (error) {
      console.error("Error fetching city details or weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Background iconCode={weatherForcast?.[0]?.weather[0]?.icon}>
      <CustomSearchbar onSearch={handleOnSearch} />
      <View style={{ flex: 1, justifyContent: "center" }}>
        {loading && <ActivityIndicator color="white" size="large" />}

        {!loading && (
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <MainCard
              cityName={cityDetails?.name}
              description={weatherForcast?.[0]?.weather[0]?.description}
              temp={weatherForcast?.[0]?.main?.temp}
              feelsLike={weatherForcast?.[0]?.main?.feels_like}
              max={weatherForcast?.[0]?.main?.temp_max}
              min={weatherForcast?.[0]?.main?.temp_min}
              humidity={weatherForcast?.[0]?.main?.humidity}
              windSpeed={weatherForcast?.[0]?.wind?.speed}
              iconCode={weatherForcast?.[0]?.weather[0]?.icon}
              sunrise={weather?.sys?.sunrise}
              sunset={weather?.sys?.sunset}
            />

            <CardContainer>
              {weatherForcast
                ?.reduce((uniqueDates, data) => {
                  const date = data.dt_txt.split(" ")[0]; // Extract date part
                  if (!uniqueDates.includes(date)) {
                    uniqueDates.push(date);
                  }
                  return uniqueDates;
                }, [])
                .map((date, index) => {
                  // Find the first data entry for each unique date
                  const dataForDate = weatherForcast.find(
                    (data) => data.dt_txt.split(" ")[0] === date
                  );
                  return (
                    <CustomCard
                      key={index}
                      date={dataForDate.dt_txt}
                      temp={dataForDate.main.temp}
                      humidity={dataForDate.main.humidity}
                      iconCode={dataForDate.weather[0].icon}
                    />
                  );
                })}
            </CardContainer>
          </View>
        )}
      </View>
      <SnackBar />
    </Background>
  );
}

export default HomeScreen;
