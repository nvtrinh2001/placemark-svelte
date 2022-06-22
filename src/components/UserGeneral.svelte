<script>
  import { getContext, onMount } from "svelte";

  const placemarkService = getContext("PlacemarkService");

  let user, userFName, userLName, userEmail, userAvatar;

  onMount(async () => {
    user = await placemarkService.getCurrentUser();
    userFName = user.firstName;
    userLName = user.lastName;
    userEmail = user.email;
    userAvatar = user.avatar;
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
  </div>
</div>
