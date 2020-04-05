<template>
  <div class="landing-page">
    <div class="main">
      <img src="~/assets/images/logo.svg" class="logo" />
      <h1 class="bold title">
        PLACE is both your online meeting room and set of useful workshop tools
        at the same time!
      </h1>
      <p class="h3">
        No room to meet with your colleagues? Invite them to a session in PLACE,
        where you can discuss your ideas using real-time tools like a digital
        whiteboard, sticky notes, voting options and more.
      </p>
      <p class="h3">
        The results of your work will be easily archived, converted into
        different file types and sent to your colleagues.
      </p>

      <ul class="links">
        <li>
          <a href="https://github.com/signers-koffer" class="link">GitHub</a>
        </li>
        <li>
          <a href="https://www.versusvirus.ch/" class="link">versusvirus</a>
        </li>
        <li>
          <nuxt-link to="/license" tag="a" class="link">
            License
          </nuxt-link>
        </li>
      </ul>
    </div>

    <div class="video-container">
      <div class="video-button-container">
        <h2 class="bold h4 center">
          Get started right now - free and without login or registration!
        </h2>
        <nuxt-link to="/create" tag="button" class="button button--primary">
          Create a session
        </nuxt-link>
      </div>
      <video class="video" autoplay loop playsinline>
        <source src="~/assets/video/intro.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
</template>

<style lang="scss">
.landing-page {
  display: flex;
  flex-direction: column;

  @media only screen and (min-width: 1180px) {
    flex-direction: row;
  }

  .logo {
    height: 32px;
    width: auto;
    margin-bottom: 40px;
  }

  .main {
    padding-top: 80px;
    padding-left: 128px;
    padding-right: 128px;
    height: 100vh;
  }

  .title {
    margin-bottom: 40px;
  }

  .video-button-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    position: absolute;
    z-index: 99999;
  }

  .video-container {
    width: 100%;
    height: 100vh;
    flex: 1 0 auto;

    background-color: #f8f8fc;

    position: relative;

    @media only screen and (min-width: 1180px) {
      width: 576px;
    }

    .video {
      object-fit: cover;
      height: 100%;
      width: 100%;
      object-position: 50% 50%;
    }
  }

  .links {
    list-style-type: none;
    display: flex;
    margin-left: 0;
    padding: 0;
    margin-top: 80px;

    li:not(:last-child) {
      margin-right: 40px;
    }
  }
}
</style>
