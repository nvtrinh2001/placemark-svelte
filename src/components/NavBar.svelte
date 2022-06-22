<script>
  import logo from "../assets/logo-1.png";
</script>

<nav
  style="position: fixed; width: 100%; padding: 8px 80px; top: 0; left: 0; right: 0;"
  class="navbar box"
  aria-label="main navigation"
>
  <div class="navbar-brand">
    <a href="/" style="display: flex; align-items:center;">
      <img src={logo} width="72" style="padding: 6px;" alt="logo" />
      <strong style="color: rgb(55, 55, 55); font-size:x-large;padding: 6px;"
        >Travisor</strong
      >
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a
            class="button"
            data-target="signup-modal"
            style="background-color: #5a7670; color: white;"
            href="/#/signup"
          >
            <strong>Sign up</strong>
          </a>
          <a class="button is-light" href="/#/login"> Log in </a>
        </div>
      </div>
    </div>
  </div>
</nav>
