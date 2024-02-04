import moment from "moment";

class DataConversion {
  kelvinToCelsius = (kelvin) => {
    return Math.round(kelvin - 273.15);
  };

  formatTime = (timestamp) => {
   const  date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  };

  weatherIcons = {
    "clear sky": "sun", // Example: You need to replace "sun" with the actual icon name you want to use
    "few clouds": "cloud-sun", // Example: You need to replace "cloud-sun" with the actual icon name you want to use
    // Add more mappings for other weather descriptions as needed
  };

  getWeatherIcon = (description) => {
    lowerCaseDescription = description;
    return weatherIcons[lowerCaseDescription] || "question"; // Default to a question mark icon if no matching icon found
  };

  setWeekDay (date) {
    let weekday;
    const today = moment().startOf("day"); // Start of today
    const cardDate = moment(date);

    if (today.isSame(cardDate, "day")) {
      return weekday = "Now";
    } else {
      return weekday = moment(date).format("ddd");
    }
  };
}

export default new DataConversion();
