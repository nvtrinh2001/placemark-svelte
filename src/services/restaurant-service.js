import axios from "axios";

let encodedParams = new URLSearchParams();
encodedParams.append("q", "Dublin");
encodedParams.append("language", "en_US");
encodedParams.append("limit", "30");
encodedParams.append("location_id", "297704");
encodedParams.append("currency", "USD");

const Location_URL = "https://worldwide-restaurants.p.rapidapi.com/typeahead";
const Search_URL = "https://worldwide-restaurants.p.rapidapi.com/search";

const options = {
  method: "POST",
  url: "",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "X-RapidAPI-Host": "worldwide-restaurants.p.rapidapi.com",
    "X-RapidAPI-Key": "1323ff75f3msh4dc7cd5fd6c3079p17ce57jsnde714362bee3",
  },
  data: encodedParams,
};

export class RestaurantService {
  async getLocations(cityName) {
    try {
      options.url = Location_URL;
      encodedParams.append("q", cityName);
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getRestaurants(location_id) {
    try {
      options.url = Search_URL;
      encodedParams.append("location_id", location_id);
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
