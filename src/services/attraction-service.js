import axios from "axios";

const Attraction_URL =
  "https://opentripmap-places-v1.p.rapidapi.com/en/places/radius";
const Location_URL =
  "https://opentripmap-places-v1.p.rapidapi.com/en/places/geoname";
const Properties_URL =
  "https://opentripmap-places-v1.p.rapidapi.com/en/places/xid";

const options = {
  method: "GET",
  url: "",
  params: { name: "London", radius: "500", lon: "38.364285", lat: "59.855685" },
  headers: {
    "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
    "X-RapidAPI-Key": "1323ff75f3msh4dc7cd5fd6c3079p17ce57jsnde714362bee3",
  },
};

export class AttractionService {
  async getLocations(cityName) {
    try {
      options.url = Location_URL;
      options.params.name = cityName;
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getAttractions(cityLat, cityLon) {
    try {
      options.url = Attraction_URL;
      options.params.lat = cityLat;
      options.params.lon = cityLon;
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getAttractionProperties(xid) {
    try {
      options.url = Properties_URL + `/${xid}`;
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
