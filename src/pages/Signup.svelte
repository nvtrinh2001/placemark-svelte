<script>
  import SignupForm from "../components/SignupForm.svelte";
  import image from "../assets/signup.jpeg";
</script>

<div class="background">
  <div class="columns">
    <div class="column" style="position: relative;">
      <img
        width="600"
        style="position: absolute; top: -120px; left: 0;"
        src={image}
        alt=""
      />
    </div>
    <div class="column is-three-fifths">
      <div class="container" style="margin: 32px;">
        <div
          class="signup-header"
          style="display: flex; justify-content:space-between; align-items: center;"
        >
          <a href="/" style="color: rgb(159, 183, 197); font-weight:400;">
            <span class="icon-text">
              <span class="icon">
                <i class="fas fa-home" />
              </span>
              <span>Home</span>
            </span>
          </a>
          <div
            class="other-option"
            style="display: flex; justify-content:space-between; align-items: center;"
          >
            <p style="padding: 8px; color: rgb(128, 128, 128);">
              Already have an account?
            </p>
            <a
              href="/#/login"
              class="button"
              style="color: rgb(159, 183, 197); ">Login</a
            >
          </div>
        </div>
        <div class="fill-info" style="margin-top: 68px; padding: 0 208px;">
          <h1 class="title has-text-centered" style="margin: 0; padding: 0;">
            Register Your New Account!
          </h1>
          <p
            class=""
            style="margin: 12px 0;color: rgb(128, 128, 128); font-size: 18px;"
          >
            For the purpose of regulation, your details are required!
          </p>
          <SignupForm />
        </div>
      </div>
    </div>
  </div>
</div>
