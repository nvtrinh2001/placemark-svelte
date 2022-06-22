<script>
  import { push } from "svelte-spa-router";
  import { getContext } from "svelte";

  let firstName = "";
  let lastName = "";
  let email = ""
  let password = "";
  let errorMessage = "";

  const placemarkService = getContext("PlacemarkService");

  async function signup() {
    let success = await placemarkService.signup(firstName, lastName, email, password)
    if (success) {
      push("/");
    } else {
      errorMessage = "Error Trying to sign up";
    }
  }
</script>

<form on:submit|preventDefault={signup}>
  <div class="field is-horizontal">
    <div class="field-body">
      <div class="field">
        <label for="firstname" class="label" style="color: rgb(128, 128, 128);">First name</label>
        <input bind:value={firstName} class="input" id="firstname" type="text" placeholder="Enter first name" name="firstName">
      </div>
      <div class="field">
        <label for="lastname" class="label" style="color: rgb(128, 128, 128);">Last name </label>
        <input bind:value={lastName} class="input" id="lastname" type="text" placeholder="Enter last name" name="lastName">
      </div>
    </div>
  </div>
  <div class="field">
    <label for="email" class="label" style="color: rgb(128, 128, 128);">Email</label>
    <input bind:value={email} class="input" id="email" type="text" placeholder="Enter email" name="email">
  </div>
  <div class="field">
    <label for="password" class="label" style="color: rgb(128, 128, 128);">Password</label>
    <input bind:value={password} class="input" id="password"type="password" placeholder="Enter Password" name="password">
  </div>
  <div class="field">
    <button class="button is-link is-fullwidth" style="margin: 32px 0; background-color: #5a7670;">Register</button>
  </div>
</form>
{#if errorMessage}
  <div class="section">
    {errorMessage}
  </div>
{/if}