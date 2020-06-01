import axios from "axios";
import moment from "moment-timezone";

export const getWeatherOfLocation = async (location) => {
  const URL = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_KEY}`;
  try {
    const response = await axios.get(URL);
    return { coordinate: response.data.coord, weather: response.data.weather };
  } catch (error) {
    console.log("An error occur when getting location weather", error);
  }
};

export const getLocationTime = async (location) => {
  try {
    const date = new Date();
    const timestamp = date.getTime() / 1000 + date.getTimezoneOffset() * 60;
    const googleurl = `https://maps.googleapis.com/maps/api/timezone/json?location=${
      location.lat
    },${
      location.lon
    }&timestamp=${timestamp}&key=${process.env.GOOGLE_API_KEY}`;

    const response = await axios.get(googleurl);
    return response.data;
  } catch (error) {
    console.log("An error occur when getting location time", error);
  }
};

export const getFormattedTimeFromTimeZone = (timezone) =>
  timezone && typeof timezone === "string"
    ? moment().tz(timezone).format("MMMM Do YYYY, h:mm:ss a")
    : "Timezone argument required on getFormattedTimeFromTimeZone functon";

export const printWeatherAndTime = async ([location, zipCode]) => {
  const { coordinate, weather } = await getWeatherOfLocation(location);
  const time = await getLocationTime(coordinate);
  const formattedTimestamp = getFormattedTimeFromTimeZone(time.timeZoneId);
  console.log({
    timestamp: formattedTimestamp,
    weather: weather[0].description,
  });
};

printWeatherAndTime(["new york", 10001]);
