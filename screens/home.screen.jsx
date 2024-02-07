import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import CustomSearchbar from "../components/searchBar";
import cityService from "../services/cityService";
import Background from "../components/background";
import MainCard from "../components/mainCard";
import CardContainer from "../components/cardContainer";
import CustomCard from "../components/card";
import SnackBar from "../components/snackBar";

function HomeScreen() {
  const [cityDetails, setCityDetails] = useState(null);
  const [weather, setWeather] = useState(null);
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [onSearch, setOnSearch] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherDataByLocation = async () => {
      try {
        setLoading(true);
        //get current position fails on app mobile cause the module requiert param that are not available on dev mode
        // But it works in web 
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const [cityWeather, weatherForecastData] = await Promise.all([
            cityService.getCityWeather({ latitude, longitude }),
            cityService.getCityWeatherForecast({ latitude, longitude }),
          ]);
          setWeather(cityWeather.data);
          setWeatherForecast(weatherForecastData?.data?.list);
          setLoading(false);
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("Error fetching weather data");
        setLoading(false);
      }
    };

    if (!onSearch) {
      fetchWeatherDataByLocation();
    }
  }, [onSearch]);

  const handleOnSearch = async (e) => {
    setLoading(true);
    try {
      const getCityDetails = await cityService.getCityDetails(e);
      const [cityWeather, weatherForecastData] = await Promise.all([
        cityService.getCityWeather(getCityDetails?.data[0]),
        cityService.getCityWeatherForecast(getCityDetails?.data[0]),
      ]);
      setWeather(cityWeather.data);
      setWeatherForecast(weatherForecastData?.data?.list);
      setCityDetails(getCityDetails?.data[0]);
      setOnSearch(true);
    } catch (error) {
      console.error("Error fetching city details or weather data:", error);
      setError("Error fetching city details or weather data");
    } finally {
      setLoading(false);
    }
  };
console.log(weather)
console.log(weatherForecast)
  return (
    <Background iconCode={weatherForecast?.[0]?.weather[0]?.icon}>
      <CustomSearchbar onSearch={handleOnSearch} />
      <View style={{ flex: 1, justifyContent: "center" }}>
        {loading && <ActivityIndicator color="white" size="large" />}
        {!loading && (
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <MainCard
              cityName={onSearch ? cityDetails?.name : weather?.name}
              description={weatherForecast?.[0]?.weather[0]?.description}
              temp={weatherForecast?.[0]?.main?.temp}
              feelsLike={weatherForecast?.[0]?.main?.feels_like}
              max={weatherForecast?.[0]?.main?.temp_max}
              min={weatherForecast?.[0]?.main?.temp_min}
              humidity={weatherForecast?.[0]?.main?.humidity}
              windSpeed={weatherForecast?.[0]?.wind?.speed}
              iconCode={weatherForecast?.[0]?.weather[0]?.icon}
              sunrise={weather?.sys?.sunrise}
              sunset={weather?.sys?.sunset}
            />
            <CardContainer>
              {weatherForecast &&
                weatherForecast
                  .reduce((uniqueDates, data) => {
                    const date = data.dt_txt.split(" ")[0];
                    if (!uniqueDates.includes(date)) {
                      uniqueDates.push(date);
                    }
                    return uniqueDates;
                  }, [])
                  .map((date, index) => {
                    const dataForDate = weatherForecast.find(
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
        {error && <SnackBar message={error} />}
      </View>
    </Background>
  );
}

export default HomeScreen;