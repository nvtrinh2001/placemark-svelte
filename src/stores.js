import { writable } from "svelte/store";

export const user = writable({
  email: "",
  token: "",
});

export const location = writable({
  lat: "",
  lng: "",
  location_array: [],
  type: "",
});

export const addNewLocation = writable({
  add_type: "",
  lat: "",
  lng: "",
});

export const updatedLocationId = writable({ id: "" });

export const storeTypeMap = writable({ type: "" });
