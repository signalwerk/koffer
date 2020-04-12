<template>
  <div class="stopwatch">
    <div class="timer button-like">
      <icon icon="stopwatch" />

      <span class="timer-value">
        {{ timerStr }}
      </span>
    </div>

    <button
      v-text="isRunning ? 'Stop' : 'Start'"
      @click="toggle"
      :class="{
        'button--error': isRunning,
        'button--primary': !isRunning
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
import { DEFAULT_TIMER } from '~/store/timers'

const { mapState } = createNamespacedHelpers('timers')

const formatTime = (timestamp) => {
  const timestampInSec = timestamp / 1000
  const hours = String(Math.floor(timestampInSec / 60 / 60)).padStart(2, '0')
  const minutes = String(Math.floor(timestampInSec / 60)).padStart(2, '0')
  const seconds = String(Math.floor(timestampInSec % 60)).padStart(2, '0')

  return `${hours}:${minutes}:${seconds}`
}
export default {
  components: { Icon },

  data() {
    return { timeElapsed: 0, interval: null }
  },

  computed: {
    ...mapState(['timers']),

    isRunning() {
      return this.timers[DEFAULT_TIMER] && this.timers[DEFAULT_TIMER].mode === 1
    },
    debug() {
      return {
        'this.isRunning': this.isRunning
        // 'this.clientNowOnUpdate': this.clientNowOnUpdate
      }
    },
    timerStr() {
      return formatTime(this.timer)
    },
    timer() {
      console.log('-- timer', this.timers[DEFAULT_TIMER])

      // no time from server yet
      if (!this.timers[DEFAULT_TIMER]) {
        return 0
      }

      // timer stands still
      if (this.timers[DEFAULT_TIMER].mode === 0) {
        return this.timers[DEFAULT_TIMER].value || 0
      }

      const sinceUpdate = Date.now() - this.timers[DEFAULT_TIMER].__meta.gotAt

      // const timeOffset =
      //   this.timers[DEFAULT_TIMER].__meta.sentAt -
      //   this.timers[DEFAULT_TIMER].__meta.gotAt

      // console.log({
      //   sentAt: this.timers[DEFAULT_TIMER].__meta.sentAt,
      //   updatedAt: this.timers[DEFAULT_TIMER].updatedAt,
      //   diff:
      //     this.timers[DEFAULT_TIMER].__meta.sentAt -
      //     this.timers[DEFAULT_TIMER].updatedAt,
      //   clientNowOnUpdate: this.clientNowOnUpdate
      // })

      console.log({
        sinceUpdate,
        timeElapsed: this.timeElapsed
      })

      const newTimer = sinceUpdate + this.timers[DEFAULT_TIMER].value

      return newTimer
    }
  },

  watch: {
    timer: {
      handler(newValue) {
        if (
          this.timers[DEFAULT_TIMER] &&
          this.timers[DEFAULT_TIMER].mode === 1
        ) {
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
      this.$store.dispatch('timers/updateMode', {
        uuid: DEFAULT_TIMER,
        mode: 1
      })
    },

    stop() {
      console.log('----- method run stop')

      this.$store.dispatch('timers/updateMode', {
        uuid: DEFAULT_TIMER,
        mode: 0,
        value: this.timer
      })
      this.timeElapsed = 0
    },

    toggle() {
      if (this.timers[DEFAULT_TIMER] && this.timers[DEFAULT_TIMER].mode === 1) {
        console.log('----- toggle stop')
        this.stop()
      } else {
        console.log('----- toggle start')
        this.start()
      }
    },

    reset() {
      this.$store.dispatch('timers/updateMode', {
        uuid: DEFAULT_TIMER,
        mode: 0,
        value: 0
      })
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
