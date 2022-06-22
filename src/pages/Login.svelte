<script>
  import image from "../assets/login-1.jpeg";
  import LoginForm from "../components/LoginForm.svelte";
</script>

<div class="background">
  <div class="columns">
    <div class="column is-three-fifths">
      <div class="container" style="margin: 32px;">
        <div class="signup-header" style="display: flex; justify-content:space-between; align-items: center;">
          <a href="/" style="color: rgb(159, 183, 197); font-weight:400;">
            <span class="icon-text">
              <span class="icon">
                <i class="fas fa-home"></i>
              </span>
              <span>Home</span>
            </span>
          </a>
          <div class="other-option" style="display: flex; justify-content:space-between; align-items: center;">
            <p style="padding: 8px; color: rgb(128, 128, 128);">
              Don't have an account yet?
            </p> 
            <a href="/#/signup" class="button" style="color: rgb(159, 183, 197); ">Register</a>
          </div>
        </div>
        <div class="fill-info" style="margin-top: 100px; padding: 0 208px;">
          <h1 class="title" style="margin: 0; padding: 0;">Welcome back!</h1>
          <p class="" style="margin: 12px 0;color: rgb(128, 128, 128); font-size: 18px;">For the purpose of regulation, your details are required!</p>
          <LoginForm />
        </div>
      </div>
    </div>
    <div class="column" style="position: relative;">
      <img width="600" style="position: absolute; top: -120px; right: 0;" src={image} alt="">
    </div>
  </div>

</div>