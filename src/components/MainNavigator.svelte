<script>
  import logo from "../assets/logo-1.png";
</script>

<nav class="navbar box" aria-label="main navigation">
  <a class="navbar-brand" href="#/search">
    <img src={logo} width="72" style="padding: 6px;" alt="logo" />
    <strong>Travisor</strong>
  </a>

  <div class="navbar-menu">
    <div
      class="navbar-end dropdown is-right is-hoverable"
      style="cursor: pointer;"
    >
      <div class="dropdown-trigger user-avatar">
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
          <a href="#/search" class="dropdown-item list-item"> Search </a>
          <a href="#/favorite" class="dropdown-item list-item"> Favorite </a>
          <a href="#/charts" class="dropdown-item list-item"> Charts </a>
          <a href="#/discovery" class="dropdown-item list-item">
            London Discovery
          </a>
          <hr class="dropdown-divider" />
          <a href="#/user" class="dropdown-item list-item"> My Account </a>
          <a href="#/logout" class="dropdown-item list-item"> Logout </a>
        </div>
      </div>
    </div>
  </div>
</nav>

<style>
  .navbar.box {
    z-index: 100;
    position: fixed;
    width: 100%;
    padding: 8px 80px;
    top: 0;
    left: 0;
    right: 0;
  }
  .navbar-brand {
    display: flex;
    align-items: center;
  }
  a > strong {
    color: rgb(55, 55, 55);
    font-size: x-large;
    padding: 6px;
  }
  .user-avatar {
    display: flex;
    align-items: center;
  }
  .list-item {
    padding-top: 8px;
    padding-bottom: 8px;
    font-size: 16px;
    color: rgb(20, 20, 20);
    font-weight: 300;
  }
</style>
