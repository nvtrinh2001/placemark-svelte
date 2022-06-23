<script>
  import logo from "../assets/logo-1.png";
</script>

<nav class="navbar box" aria-label="main navigation">
  <a class="navbar-brand" href="/">
    <img src={logo} width="72" style="padding: 6px;" alt="logo" />
    <strong class="brand-name">Travisor</strong>
  </a>

  <div class="navbar-menu">
    <div class="navbar-end">
      <div class="navbar-item buttons">
        <a class="button signup" href="/#/signup">
          <strong>Sign up</strong>
        </a>
        <a class="button is-light" href="/#/login"> Log in </a>
      </div>
    </div>
  </div>
</nav>

<style>
  .navbar.box {
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
  .brand-name {
    color: rgb(55, 55, 55);
    font-size: x-large;
    padding: 6px;
  }
  .button.signup {
    background-color: #5a7670;
    color: white;
  }
</style>
