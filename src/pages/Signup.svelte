<script>
  import SignupForm from "../components/SignupForm.svelte";
  import image from "../assets/signup.jpeg";
</script>

<div class="background">
  <div class="columns">
    <div class="column" style="position: relative;">
      <img width="600" class="side-image" src={image} alt="" />
    </div>

    <div class="column is-three-fifths">
      <div class="container" style="margin: 32px;">
        <div class="signup-header">
          <a href="/" class="link-back">
            <span class="icon-text">
              <span class="icon">
                <i class="fas fa-home" />
              </span>
              <span>Home</span>
            </span>
          </a>

          <div class="other-option">
            <p class="option-text">Already have an account?</p>
            <a href="/#/login" class="button" style="color: rgb(159, 183, 197);"
              >Login</a
            >
          </div>
        </div>

        <div class="fill-info">
          <h1 class="title has-text-centered" style="margin: 0; padding: 0;">
            Register Your New Account!
          </h1>
          <p class="note">
            For the purpose of regulation, your details are required!
          </p>
          <SignupForm />
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .side-image {
    position: absolute;
    top: -120px;
    left: 0;
  }
  .signup-header,
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
    margin-top: 68px;
    padding: 0 208px;
  }
  .note {
    margin: 12px 0;
    color: rgb(128, 128, 128);
    font-size: 18px;
  }
</style>
