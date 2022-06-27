![Travisor](./src/assets/Travisor.png)

# Travisor: A Travel Advisor Application

![NPM](https://img.shields.io/npm/l/svelte?color=orange)

The application provides basic information when travelling to new places.

Travisor is built using [Svelte](https://svelte.dev/), [Leaflet](https://leafletjs.com/), and some other packages.

It relies on several APIs hosted on RapidAPI:

- [Places](https://rapidapi.com/opentripmap/api/places1/)
- [Hotels com Provider](https://rapidapi.com/tipsters/api/hotels-com-provider/)
- [Worldwide Restaurants](https://rapidapi.com/ptwebsolution/api/worldwide-restaurants/)
- [Forward & Reverse Geocoding](https://rapidapi.com/GeocodeSupport/api/forward-reverse-geocoding/)

It is also connected to [Travisor Server](https://travisor-hapi.herokuapp.com/) to save locations provided by users.

## Website

Check out [Travisor](https://travisor-svelte.vercel.app/) website:

- https://travisor-svelte.vercel.app/

## Key Features

- Search: search locations around the world:
  - Tourist attractions
  - Hotels
  - Restaurants
- Favorite: add your own favorite locations.
- London Discovery: discover London with recommendations.
- Map: locations can be shown on the map.

## Installation

**Clone this directory**

```
git clone git@github.com:nvtrinh2001/placemark-svelte.git
```

**Update new versions for dependent packages**

    // Check if there is any new versions
    ncu
    // Update new versions in package.json
    ncu -u

**Build**

```
npm install
```

To run the application on your local machine:

```
npm run dev
```

The application should start running:

- http://localhost:3000/
