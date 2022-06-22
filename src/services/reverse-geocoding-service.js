import axios from "axios";

const options = {
  method: "GET",
  url: "https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse",
  params: {
    lat: "41.8755616",
    lon: "-87.6244212",
    "accept-language": "en",
    polygon_threshold: "0.0",
  },
  headers: {
    "X-RapidAPI-Key": "1323ff75f3msh4dc7cd5fd6c3079p17ce57jsnde714362bee3",
    "X-RapidAPI-Host": "forward-reverse-geocoding.p.rapidapi.com",
  },
};

export class ReverseGeocodingService {
  async getLocation(lat, lng) {
    try {
      options.params.lat = lat;
      options.params.lon = lng;
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
