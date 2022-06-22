<script>
  import { push } from "svelte-spa-router";
  import { getContext } from "svelte";

  let email = "";
  let password = "";
  let errorMessage = "";

  const placemarkService = getContext("PlacemarkService");

  async function login() {
    let success = await placemarkService.login(email, password);
    if (success) {
      push("/search");
    } else {
      email = "";
      password = "";
      errorMessage = "Invalid Credentials";
    }
  }
</script>

<div class="" style="margin: 32px 0;">
  <form on:submit|preventDefault={login}>
    <div class="field">
      <label class="label" for="email" style="color: rgb(128, 128, 128);"
        >Email</label
      >
      <input
        bind:value={email}
        class="input"
        id="email"
        type="text"
        placeholder="Enter email"
        name="email"
      />
    </div>
    <div class="field">
      <label class="label" for="password" style="color: rgb(128, 128, 128);"
        >Password</label
      >
      <input
        bind:value={password}
        class="input"
        id="password"
        type="password"
        placeholder="Enter Password"
        name="password"
      />
    </div>
    <div class="field is-grouped" style="margin: 32px 0; ">
      <button
        class="button is-link is-fullwidth"
        style="background-color: #5a7670;">Log in</button
      >
    </div>
  </form>
  {#if errorMessage}
    <div class="section">
      {errorMessage}
    </div>
  {/if}
</div>
