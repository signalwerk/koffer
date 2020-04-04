<template>
  <div class="page-section-container">
    <progress-bar :amount="progress" class="page-progress" />

    <transition name="section" mode="out-in">
      <page-section v-if="step === 1">
        <h1>
          Signers Koffer
        </h1>
        <p class="lead">
          👋 Start right now, but first of all: What's your name?
        </p>
        <input />
        <button @click="step++" class="button">Submit</button>
      </page-section>
    </transition>

    <transition name="section" mode="out-in">
      <page-section v-if="step === 2">
        <h1>
          Name this session
        </h1>
        <p>
          ✍️ Let the participants know what they are working on.
        </p>
        <input />
        <button @click="step++" class="button">Almost complete</button>
      </page-section>
    </transition>

    <transition name="section" mode="out-in">
      <page-section v-if="step === 3">
        <h1>Invite people</h1>
        <p>
          🚀 Create your crew
        </p>

        <div>
          <h4>Send link to invite more administrators</h4>
          <p>
            Administrators host and moderate the session.
          </p>
          <link-container
            link="https://signers-koffer.github.io/koffer/board/admin"
          />
        </div>

        <div>
          <h4>Send link to invite participants</h4>
          <link-container
            link="https://signers-koffer.github.io/koffer/board/user"
          />
        </div>
      </page-section>
    </transition>
  </div>
</template>

<script>
import ProgressBar from '~/components/ProgressBar.vue'
import PageSection from '~/components/PageSection.vue'
import LinkContainer from '~/components/LinkContainer.vue'

export default {
  components: { ProgressBar, PageSection, LinkContainer },

  data() {
    return {
      step: 1
    }
  },

  computed: {
    progress() {
      const maxSteps = 3

      return this.step / maxSteps
    }
  }
}
</script>

<style>
.page-progress {
  position: absolute;
}

.page-section-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.section-enter-active {
  animation: slideIn 1s;
}
.section-leave-active {
  animation: slideOut 1s;
}

@keyframes slideIn {
  from {
    transform: translateX(30vw);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-30vw);
    opacity: 0;
  }
}
</style>
