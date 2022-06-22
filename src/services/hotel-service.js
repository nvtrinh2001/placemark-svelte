import axios from "axios";

const Location_URL =
  "https://hotels-com-provider.p.rapidapi.com/v1/destinations/search";
const Hotel_URL = "https://hotels-com-provider.p.rapidapi.com/v1/hotels/search";

let locationParams = { query: "London", currency: "USD", locale: "en_US" };

let hotelParams = {
  checkin_date: "2022-03-26",
  checkout_date: "2022-03-27",
  sort_order: "STAR_RATING_HIGHEST_FIRST",
  destination_id: "1708350",
  adults_number: "1",
  locale: "en_US",
  currency: "USD",
  children_ages: "4,0,15",
  price_min: "10",
  star_rating_ids: "3,4,5",
  accommodation_ids: "20,8,15,5,1",
  price_max: "500",
  page_number: "1",
  theme_ids: "14,27,25",
  amenity_ids: "527,2063",
  guest_rating_min: "4",
};

let options = {
  method: "GET",
  url: "",
  params: {},
  headers: {
    "X-RapidAPI-Key": "1323ff75f3msh4dc7cd5fd6c3079p17ce57jsnde714362bee3",
    "X-RapidAPI-Host": "hotels-com-provider.p.rapidapi.com",
  },
};

export class HotelService {
  async getLocations(cityName) {
    try {
      locationParams.query = cityName;
      options.params = locationParams;
      options.url = Location_URL;
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getHotels(checkinDate, checkoutDate, cityId, numAdult) {
    try {
      hotelParams.checkin_date = checkinDate;
      hotelParams.checkout_date = checkoutDate;
      hotelParams.destination_id = cityId;
      hotelParams.adults_number = numAdult;
      options.params = hotelParams;
      options.url = Hotel_URL;
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
