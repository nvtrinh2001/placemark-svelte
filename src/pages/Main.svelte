<script>
  import NavBar from "../components/NavBar.svelte";
  import Background from "../components/Background.svelte";
  import Footer from "../components/Footer.svelte";
  import { getContext } from "svelte";

  const placemarkService = getContext("PlacemarkService");
  placemarkService.logout();
</script>

<NavBar />

<Background />

<Footer />
