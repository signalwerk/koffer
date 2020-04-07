<template>
  <div class="stopwatch">
    <div class="timer button-like">
      <icon icon="stopwatch" />

      <span class="timer-value">
        {{ timer }}
      </span>
    </div>

    <button
      v-text="isRunning.isRunning ? 'Stop' : 'Start'"
      @click="toggle"
      :class="{
        'button--error': isRunning.isRunning,
        'button--primary': !isRunning.isRunning
      }"
      class="button"
    />

    <button @click="reset" class="button button--secondary">
      Reset
    </button>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Icon from '~/components/Icon'

const { mapState: mapStopWatch } = createNamespacedHelpers('stopwatch')

export default {
  components: { Icon },

  data() {
    return {
      timeElapsed: 0,
      interval: null
    }
  },

  computed: {
    ...mapStopWatch(['isRunning']),

    timer() {
      const hours = String(
        Math.floor(this.timeElapsed / 1000 / 60 / 60)
      ).padStart(2, '0')
      const minutes = String(Math.floor(this.timeElapsed / 1000 / 60)).padStart(
        2,
        '0'
      )
      const seconds = String(
        Math.floor((this.timeElapsed / 1000) % 60)
      ).padStart(2, '0')

      return `${hours}:${minutes}:${seconds}`
    }
  },

  watch: {
    isRunning: {
      handler(newValue) {
        if (newValue.isRunning) {
          if (!this.interval) {
            this.interval = setInterval(() => {
              this.timeElapsed += 500
            }, 500)
          }
        } else {
          clearInterval(this.interval)
          this.interval = null
        }
      },
      deep: true
    }
  },

  methods: {
    start() {
      this.$store.dispatch('stopwatch/start')
    },

    stop() {
      this.$store.dispatch('stopwatch/stop')
    },

    toggle() {
      if (this.isRunning.isRunning) {
        this.stop()
      } else {
        this.start()
      }
    },

    reset() {
      this.timeElapsed = 0
    }
  }
}
</script>

<style lang="scss">
.stopwatch {
  display: flex;
  justify-content: center;
  align-items: center;

  .button {
    width: 100px;
    margin-bottom: 0;

    &:not(:last-child) {
      margin-right: 10px;
    }
  }

  .timer {
    margin-right: 10px;

    height: 48px;
    width: 150px;

    .icon {
      margin-right: 10px;
    }

    .timer-value {
      width: 60px;
      text-align: right;
    }
  }
}
</style>
