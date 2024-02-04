const getBackgroundImage = (weatherIconCode) => {
  // Define a mapping of weather codes to background images
  const imageMap = {
    "01d": require("../assets/images/clear_sky_day.jpeg"), // Clear sky (day)
    "01n": require("../assets/images/clear_sky_night.webp"), // Clear sky (night)
    "02d": require("../assets/images/few_clouds_day.jpg"), // Few clouds (day)
    "02n": require("../assets/images/few_clouds_night.jpg"), // Few clouds (night)
    "03d": require("../assets/images/scattered_clouds_day.jpg"), // Scattered clouds (day)
    "03n": require("../assets/images/scattered_clouds_night.jpg"), // Scattered clouds (night)
    // "04d": require("../assets/images/broken_clouds_day.jpg"), // Broken clouds (day)
    // "04n": require("../assets/images/broken_clouds_night.jpg"), // Broken clouds (night)
    // "09d": require("../assets/images/shower_rain_day.jpg"), // Shower rain (day)
    // "09n": require("../assets/images/shower_rain_night.jpg"), // Shower rain (night)
    // "10d": require("../assets/images/rain_day.jpg"), // Rain (day)
    // "10n": require("../assets/images/rain_night.jpg"), // Rain (night)
    // "11d": require("../assets/images/thunderstorm_day.jpg"), // Thunderstorm (day)
    // "11n": require("../assets/images/thunderstorm_night.jpg"), // Thunderstorm (night)
    // "13d": require("../assets/images/snow_day.jpg"), // Snow (day)
    // "13n": require("../assets/images/snow_night.jpg"), // Snow (night)
    // "50d": require("../assets/images/mist_day.jpg"), // Mist (day)
    // "50n": require("../assets/images/mist_night.jpg"), // Mist (night)
  };

  // Return the corresponding image from the map, or a default image
  return (
    imageMap[weatherIconCode] || require("../assets/images/default_image.jpg")
  );
};

export default getBackgroundImage;
