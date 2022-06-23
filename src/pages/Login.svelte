<script>
  import image from "../assets/login-1.jpeg";
  import LoginForm from "../components/LoginForm.svelte";
</script>

<div class="background">
  <div class="columns">
    <div class="column is-three-fifths">
      <div class="container" style="margin: 32px;">
        <div class="login-header">
          <a href="/" class="link-back">
            <span class="icon-text">
              <span class="icon">
                <i class="fas fa-home" />
              </span>
              <span>Home</span>
            </span>
          </a>
          <div class="other-option">
            <p class="option-text">Don't have an account yet?</p>
            <a
              href="/#/signup"
              class="button"
              style="color: rgb(159, 183, 197);">Register</a
            >
          </div>
        </div>
        <div class="fill-info">
          <h1 class="title login">Welcome back!</h1>
          <p class="note">
            For the purpose of regulation, your details are required!
          </p>
          <LoginForm />
        </div>
      </div>
    </div>
    <div class="column" style="position: relative;">
      <img class="side-image" width="600" src={image} alt="" />
    </div>
  </div>
</div>

<style>
  .side-image {
    position: absolute;
    top: -120px;
    right: 0;
  }
  .login-header,
  .other-option {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .link-back {
    color: rgb(159, 183, 197);
    font-weight: 400;
  }
  .option-text {
    padding: 8px;
    color: rgb(128, 128, 128);
  }
  .fill-info {
    margin-top: 100px;
    padding: 0 208px;
  }
  .title.login {
    margin: 0;
    padding: 0;
  }
  .note {
    margin: 12px 0;
    color: rgb(128, 128, 128);
    font-size: 18px;
  }
</style>
