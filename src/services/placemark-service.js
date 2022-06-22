import axios from "axios";
import { user } from "../stores.js";

export class PlacemarkService {
  baseUrl = "";

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    const placemarkCredentials = localStorage.placemark;
    if (placemarkCredentials) {
      const savedUser = JSON.parse(placemarkCredentials);
      user.set({
        email: savedUser.email,
        token: savedUser.token,
      });
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + savedUser.token;
    }
  }

  async login(email, password) {
    try {
      const response = await axios.post(
        `${this.baseUrl}/api/users/authenticate`,
        { email, password }
      );
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + response.data.token;
      if (response.data.success) {
        user.set({
          email: email,
          token: response.data.token,
        });
        localStorage.placemark = JSON.stringify({
          email: email,
          token: response.data.token,
        });
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  async logout() {
    user.set({
      email: "",
      token: "",
    });
    localStorage.removeItem("placemark");
    axios.defaults.headers.common["Authorization"] = "";
  }

  async signup(firstName, lastName, email, password) {
    try {
      const userDetails = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };
      await axios.post(this.baseUrl + "/api/users", userDetails);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getCurrentUser() {
    try {
      const response = await axios.get(this.baseUrl + "/api/user");
      return response.data;
    } catch (err) {
      return [];
    }
  }

  async updateUserInformation(firstName, lastName, email, password, type) {
    try {
      const userData = {
        firstName,
        lastName,
        email,
        password,
        type,
      };
      const response = await axios.post(
        this.baseUrl + "/api/user/update",
        userData
      );
      return response.data;
    } catch (err) {
      return [];
    }
  }

  async getAllLocations() {
    try {
      const response = await axios.get(this.baseUrl + "/api/locations");
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async getAllAttractionLocations() {
    try {
      const response = await axios.get(
        this.baseUrl + "/api/locations/attractions"
      );
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async getAllHotelLocations() {
    try {
      const response = await axios.get(this.baseUrl + "/api/locations/hotels");
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async getAllRestaurantLocations() {
    try {
      const response = await axios.get(
        this.baseUrl + "/api/locations/restaurants"
      );
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async deleteLocationById(id) {
    try {
      const res = await axios.delete(this.baseUrl + `/api/locations/${id}`);
      return res.data;
    } catch (error) {
      return [];
    }
  }

  async updateLocationById(id, location) {
    try {
      const res = await axios.put(
        this.baseUrl + `/api/locations/${id}`,
        location
      );
      return res.data;
    } catch (error) {
      return [];
    }
  }

  async addNewLocation(location) {
    try {
      const res = await axios.post(this.baseUrl + `/api/locations`, location);
      return res.data;
    } catch (error) {
      return [];
    }
  }

  async getLocationById(id) {
    try {
      const res = await axios.get(this.baseUrl + `/api/locations/${id}`);
      return res.data;
    } catch (error) {
      return [];
    }
  }

  async getAllLondonLocations() {
    try {
      const response = await axios.get(this.baseUrl + "/api/discovery");
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async getLondonAttractionLocations() {
    try {
      const response = await axios.get(
        this.baseUrl + "/api/discovery/attractions"
      );
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async getLondonHotelLocations() {
    try {
      const response = await axios.get(this.baseUrl + "/api/discovery/hotels");
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async getLondonRestaurantLocations() {
    try {
      const response = await axios.get(
        this.baseUrl + "/api/discovery/restaurants"
      );
      return response.data;
    } catch (error) {
      return [];
    }
  }

  async getLondonLocationById(id) {
    try {
      const res = await axios.get(this.baseUrl + `/api/discovery/${id}`);
      return res.data;
    } catch (error) {
      return [];
    }
  }

  async addNewLondonLocation(location) {
    try {
      const res = await axios.post(this.baseUrl + `/api/discovery`, location);
      return res.data;
    } catch (error) {
      return [];
    }
  }

  async deleteLondonLocationById(id) {
    try {
      const res = await axios.delete(this.baseUrl + `/api/discovery/${id}`);
      return res.data;
    } catch (error) {
      return [];
    }
  }

  async updateLondonLocationById(id, location) {
    try {
      const res = await axios.put(
        this.baseUrl + `/api/discovery/${id}`,
        location
      );
      return res.data;
    } catch (error) {
      return [];
    }
  }
}
