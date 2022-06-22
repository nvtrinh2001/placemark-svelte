<script>
  import { getContext, onMount } from "svelte";
  import { pop } from "svelte-spa-router";

  const placemarkService = getContext("PlacemarkService");

  let user,
    userFName,
    userLName,
    userEmail,
    userPassword,
    userAvatar,
    userType,
    fileName = "file name";

  onMount(async () => {
    user = await placemarkService.getCurrentUser();
    userFName = user.firstName;
    userLName = user.lastName;
    userEmail = user.email;
    userPassword = user.password;
    userAvatar = user.avatar;
    userType = user.type;
  });
</script>

<div class="card">
  <div class="card-image">
    <figure class="image is-4by3">
      <img src={userAvatar} alt="avatar" style="object-fit: cover;" />
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <img
          src={userAvatar}
          class="image is-48x48"
          alt="avatar"
          style="object-fit: cover;"
        />
      </div>
      <div class="media-content">
        <p class="title is-4">{userFName} {userLName}</p>
        <p class="subtitle is-6">{userEmail}</p>
      </div>
    </div>
    <!-- <hr class="dropdown-divider" /> -->
    <!-- <form
      on:submit|preventDefault={imageUploadHandler}
      enctype="multipart/form-data"
    >
      <div id="file-select" class="file has-name is-fullwidth is-small">
        <label class="file-label">
          <input
            class="file-input"
            name="imagefile"
            type="file"
            accept="image/png, image/jpeg"
            bind:value={fileName}
          />
          <span
            class="file-cta"
            style="border-top-left-radius: 50px; border-bottom-left-radius: 50px;"
          >
            <span class="file-icon">
              <i class="fas fa-upload" />
            </span>
            <span class="file-label"> Choose a file… </span>
          </span>
          <span class="file-name">{fileName}</span>
          <button
            type="submit"
            class="button is-info is-small"
            style="border-top-right-radius: 50px; border-bottom-right-radius: 50px;"
            >Upload</button
          >
        </label>
      </div>
    </form> -->
  </div>
</div>
