<script>
  import Router from "svelte-spa-router";
  import Main from "./pages/Main.svelte";
  import Login from "./pages/Login.svelte";
  import Signup from "./pages/Signup.svelte";
  import Search from "./pages/Search.svelte";
  import Favorite from "./pages/FavoriteMain.svelte";
  import Charts from "./pages/Charts.svelte";
  import LocationDetails from "./pages/LocationDetails.svelte";
  import AddFavorite from "./pages/FavoriteAdd.svelte";
  import UpdateFavorite from "./pages/FavoriteUpdate.svelte";
  import RemoveFavorite from "./pages/FavoriteRemove.svelte";
  import User from "./pages/User.svelte";
  import Discovery from "./pages/Discovery.svelte";
  import DiscoveryAdd from "./pages/DiscoveryAdd.svelte";
  import DiscoveryRemove from "./pages/DiscoveryRemove.svelte";
  import DiscoveryUpdate from "./pages/DiscoveryUpdate.svelte";
  import { PlacemarkService } from "./services/placemark-service.js";
  import { setContext } from "svelte";
  import { RestaurantService } from "./services/restaurant-service.js";
  import { HotelService } from "./services/hotel-service.js";
  import { AttractionService } from "./services/attraction-service.js";
  import { ReverseGeocodingService } from "./services/reverse-geocoding-service";
  setContext(
    "PlacemarkService",
    new PlacemarkService("https://travisor-hapi.herokuapp.com/")
  );
  setContext("RestaurantService", new RestaurantService());
  setContext("HotelService", new HotelService());
  setContext("AttractionService", new AttractionService());
  setContext("ReverseGeocodingService", new ReverseGeocodingService());
  let routes = {
    "/": Main,
    "/login": Login,
    "/signup": Signup,
    "/main": Main,
    "/user": User,
    "/search": Search,
    "/charts": Charts,
    "/favorite/add": AddFavorite,
    "/favorite/update": UpdateFavorite,
    "/favorite/remove": RemoveFavorite,
    "/details/*": LocationDetails,
    // "/details/": Details,
    // "/favorite/*": Favorite,
    "/favorite/": Favorite,
    "/discovery/add": DiscoveryAdd,
    "/discovery/update": DiscoveryUpdate,
    "/discovery/remove": DiscoveryRemove,
    "/discovery": Discovery,
    "/logout": Main,
  };
</script>

<Router {routes} />
