import axios from "axios";

class CityService {
  // getCity() {
  //   const options = {
  //     method: "GET",
  //     url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
  //     headers: {
  //       "X-RapidAPI-Key": "f771704608mshcb0b5723129d1f8p14e72djsn47ffb5452c67",
  //       "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  //     },
  //   };
  //   const response = axios.request(options);
  //   console.log(response.data);
  // }

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
}

export default new CityService();
