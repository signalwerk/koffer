<template>
  <div class="page-section-container">
    <progress-bar :amount="progress" class="page-progress" />

    <transition name="section" mode="out-in">
      <page-section v-if="step === 1">
        <h1>
          Signers Koffer
        </h1>
        <p class="lead">
          Start right now, but first of all: What's your name?
        </p>
        <input />
        <button @click="step++">Submit</button>
      </page-section>
    </transition>

    <transition name="section" mode="out-in">
      <page-section v-if="step === 2">
        <h1>Step 2</h1>
        <button @click="step++">Submit</button>
      </page-section>
    </transition>

    <transition name="section" mode="out-in">
      <page-section v-if="step === 3">
        <h1>Step 3</h1>
        <button @click="step++">Submit</button>
      </page-section>
    </transition>
  </div>
</template>

<script>
import ProgressBar from '~/components/ProgressBar.vue'
import PageSection from '~/components/PageSection.vue'

export default {
  components: { ProgressBar, PageSection },

  data() {
    return {
      step: 1
    }
  },

  computed: {
    progress() {
      const maxSteps = 3

      return this.step / (maxSteps + 1)
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
