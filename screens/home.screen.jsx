import React, { useState } from "react";
import CustomSearchbar from "../components/searchBar";
import cityService from "../services/cityService";
import { ActivityIndicator } from "react-native-paper";
import CustomCard from "../components/card";
import CardContainer from "../components/cardContainer";
import Background from "../components/background";
import MainCard from "../components/mainCard";
import { View } from "react-native";

function HomeScreen() {
  const [cityDetails, setCityDetails] = useState(null);
  const [weather, setWeather] = useState(null);
  const [weatherForcast, setWeatherForcast] = useState(null);
  const [loading, setLoading] = useState(false);

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
    <Background>
      <CustomSearchbar onSearch={handleOnSearch} />
      <View style={{flex: 1, justifyContent: "center"}}>
        {loading && <ActivityIndicator color="white" size="large" />}

        {!loading && (
          <View style={{flex: 1, justifyContent: "space-between"}}>
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
    </Background>
  );
}

export default HomeScreen;
