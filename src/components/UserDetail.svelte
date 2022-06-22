<script>
  import { getContext, onMount } from "svelte";
  import { pop } from "svelte-spa-router";

  const placemarkService = getContext("PlacemarkService");

  let user,
    userFName,
    userLName,
    userEmail,
    userPassword,
    userType,
    togglePassword,
    password,
    iconPassword;

  onMount(async () => {
    user = await placemarkService.getCurrentUser();
    userFName = user.firstName;
    userLName = user.lastName;
    userEmail = user.email;
    userPassword = user.password;
    userType = user.type;
  });

  async function showPasswordHandler() {
    togglePassword = document.querySelector("#togglePassword");
    password = document.querySelector("#password");
    iconPassword = document.querySelector("#icon-password");
    // toggle the type attribute
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    // toggle the icon
    if (iconPassword.classList.contains("fa-eye"))
      iconPassword.classList.replace("fa-eye", "fa-eye-slash");
    else if (iconPassword.classList.contains("fa-eye-slash"))
      iconPassword.classList.replace("fa-eye-slash", "fa-eye");
  }

  async function updateUserHandler() {
    const returnedUser = await placemarkService.updateUserInformation(
      userFName,
      userLName,
      userEmail,
      userPassword,
      userType
    );
    userFName = returnedUser.firstName;
    userLName = returnedUser.lastName;
    userEmail = returnedUser.email;
    userPassword = returnedUser.password;
    userType = returnedUser.type;
    pop();
  }
</script>

<form on:submit|preventDefault={updateUserHandler} class="panel is-info">
  <div class="panel-heading">Your Information</div>
  <div class="panel-block">
    <div class="field-label is-normal">
      <label class="label">Name</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded has-icons-left">
          <input
            class="input"
            placeholder="First Name"
            name="firstName"
            bind:value={userFName}
          />
          <span class="icon is-small is-left">
            <i class="fas fa-user" />
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control is-expanded has-icons-left">
          <input
            class="input"
            type="text"
            placeholder="Last Name"
            name="lastName"
            bind:value={userLName}
          />
          <span class="icon is-small is-left">
            <i class="fas fa-user" />
          </span>
        </p>
      </div>
    </div>
  </div>

  <div class="panel-block">
    <div class="field-label is-normal">
      <label class="label">Email</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded has-icons-left">
          <input
            class="input"
            type="email"
            placeholder="Email"
            name="email"
            bind:value={userEmail}
          />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope" />
          </span>
        </p>
      </div>
    </div>
  </div>

  <div class="panel-block">
    <div class="field-label is-normal">
      <label class="label">Password</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded has-icons-left">
          <input
            class="input"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            bind:value={userPassword}
          />
          <span
            class="icon is-small is-left"
            id="togglePassword"
            on:click={showPasswordHandler}
            style="pointer-events: all; cursor: pointer"
          >
            <i class="fas fa-eye-slash" id="icon-password" />
          </span>
        </p>
      </div>
    </div>
  </div>

  <div class="panel-block">
    <div class="field-label is-normal">
      <label class="label">Account Type</label>
    </div>
    <div class="field-body">
      <div class="field is-narrow">
        <div class="control">
          <input class="button is-static" name="type" bind:value={userType} />
          <!-- <p>{userType}</p> -->
          <!-- </input> -->
        </div>
      </div>
    </div>
  </div>

  <div class="panel-block">
    <div class="field-label">
      <!-- Left empty for spacing -->
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control">
          <button class="button is-info"> Update </button>
        </div>
      </div>
    </div>
  </div>
</form>
