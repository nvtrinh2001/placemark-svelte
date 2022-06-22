<script>
  import logo from "../assets/logo-1.png";
  function dropdownHandler() {
    const dropdownElement = document.querySelector(".dropdown");
    dropdownElement.classList.toggle("is-active");
  }
</script>

<nav
  style="z-index: 100; position: fixed; width: 100%; padding: 8px 80px; top: 0; left: 0; right: 0;"
  class="navbar box"
  aria-label="main navigation"
>
  <div class="navbar-brand">
    <a href="#/search" style="display: flex; align-items:center;">
      <img src={logo} width="72" style="padding: 6px;" alt="logo" />
      <strong style="color: rgb(55, 55, 55); font-size:x-large;padding: 6px;"
        >Travisor</strong
      >
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-end">
      <div class="dropdown is-right is-hoverable" style="cursor:pointer;">
        <div
          class="dropdown-trigger"
          style="display: flex; align-items: center;"
        >
          <figure class="image is-32x32">
            <img
              class="is-rounded"
              src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/f6/ee/68/default-avatar-2020-9.jpg?w=100&h=-1&s=1"
              alt=""
            />
          </figure>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
          <div class="dropdown-content">
            <a
              href="#/search"
              class="dropdown-item"
              style="padding-top: 8px; padding-bottom: 8px; font-size: 16px; color: rgb(20,20,20); font-weight:300;"
            >
              Search
            </a>
            <a
              href="#/favorite"
              class="dropdown-item"
              style="padding-top: 8px; padding-bottom: 8px; font-size: 16px; color: rgb(20,20,20); font-weight:300;"
            >
              Favorite
            </a>
            <a
              href="#/charts"
              class="dropdown-item"
              style="padding-top: 8px; padding-bottom: 8px; font-size: 16px; color: rgb(20,20,20); font-weight:300;"
            >
              Charts
            </a>
            <a
              href="#/discovery"
              class="dropdown-item"
              style="padding-top: 8px; padding-bottom: 8px; font-size: 16px; color: rgb(20,20,20); font-weight:300;"
            >
              London Discovery
            </a>
            <hr class="dropdown-divider" />
            <a
              href="#/user"
              class="dropdown-item"
              style="padding-top: 8px; padding-bottom: 8px; font-size: 16px; color: rgb(20,20,20); font-weight:300;"
            >
              My Account
            </a>
            <a
              href="#/logout"
              class="dropdown-item"
              style="padding-top: 8px; padding-bottom: 8px; font-size: 16px; color: rgb(20,20,20); font-weight:300;"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
