<template>
  <div class="board-container">
    <header class="header">
      <div class="bold">
        {{
          sessions[this.$router.currentRoute.query.id] &&
            sessions[this.$router.currentRoute.query.id].name
        }}
      </div>
      <div>
        Zoom: {{ Math.round(zoomLevel * 100) }}%
        <button
          @click="zoomReset"
          class="button button--secondary invite-button bold"
        >
          Reset
        </button>
      </div>
      <div>
        <span class="participants-dropdown">
          Participants (4)
        </span>
        <button class="button button--secondary invite-button bold">
          Invite
        </button>
      </div>
    </header>

    <aside :class="{ 'stopwatch-running': isRunning }" class="nav">
      <nav-item
        v-for="(navItem, index) in navItems"
        :key="index"
        :is-active="activeTool === navItem.item"
        :icon="navItem.item"
        :class="{ 'is-disabled': navItem.disabled, ...navItem.classes }"
        v-tooltip.right="{ content: navItem.name, class: 'tooltip' }"
        @click="
          () => {
            if (!navItem.disabled) {
              activeTool = navItem.item
              navItem.handler()
            }
          }
        "
      />
    </aside>

    <transition name="fade-fast">
      <stop-watch v-show="hasStopwatch" class="context" />
    </transition>

    <div @wheel.capture.prevent="zoom" class="board">
      <portal-target name="context-menu" />
      <board
        ref="board"
        @contextOpen.capture="hasStopwatch = false"
        :style="boardScale"
      />
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Board from '~/components/board/Board.vue'
import NavItem from '~/components/board/NavItem.vue'
import StopWatch from '~/components/board/StopWatch.vue'
import { socket } from '~/util/socketio'
import { DEFAULT_TIMER } from '~/store/timers'
import zoomAwareMixin from '~/mixins/zoomAware'

const { mapState: mapSessionsState } = createNamespacedHelpers('sessions')
const { mapState: mapTimersState } = createNamespacedHelpers('timers')

export default {
  components: { NavItem, Board, StopWatch },

  mixins: [zoomAwareMixin],

  transition: {
    name: 'slide-fade',
    mode: 'out-in'
  },

  data() {
    return {
      activeTool: 'select',
      hasStopwatch: false,
      color: null,
      navItems: [
        {
          item: 'select',
          name: 'Select something',
          disabled: false,
          classes: {},
          handler: () => {}
        },
        {
          item: 'sticky-note',
          name: 'Add a sticky note',
          disabled: false,
          classes: {},
          handler: this.addSticky
        },
        {
          item: 'text',
          name: 'Add a text',
          disabled: false,
          classes: {},
          handler: this.addTextarea
        },
        {
          item: 'shape',
          name: 'Add a shape',
          disabled: false,
          classes: {},
          handler: this.addShape
        },
        {
          item: 'stopwatch',
          name: 'Stopwatch',
          disabled: false,
          classes: { 'stopwatch-icon': true },
          handler: this.toggleStopwatch
        },
        {
          item: 'artboard',
          name: 'Coming soon',
          disabled: true,
          classes: {},
          handler: () => {}
        },
        {
          item: 'draw',
          name: 'Coming soon',
          disabled: true,
          classes: {},
          handler: () => {}
        },
        {
          item: 'eraser',
          name: 'Coming soon',
          disabled: true,
          classes: {},
          handler: () => {}
        }
      ]
    }
  },

  computed: {
    ...mapSessionsState(['sessions']),
    ...mapTimersState(['timers']),

    isRunning() {
      return this.timers[DEFAULT_TIMER] && this.timers[DEFAULT_TIMER].mode === 1
    },

    boardScale() {
      return `transform: scale(${this.zoomLevel})`
    }
  },

  created() {
    // eslint-disable-next-line no-console
    console.log('router', this.$router.currentRoute)
    const id = this.$router.currentRoute.query.id
    socket.emit('session:join', id)

    // eslint-disable-next-line no-console
    console.log('joindedboard: ', id)
  },

  methods: {
    addShape() {
      this.$refs.board.addShape()
    },

    addSticky() {
      this.$refs.board.addCard()
    },

    addTextarea() {
      this.$refs.board.addTextarea()
    },

    toggleStopwatch() {
      this.hasStopwatch = !this.hasStopwatch
    },

    zoom(event) {
      let scale = this.zoomLevel

      scale += event.deltaY * -0.001

      // Restrict scale
      scale = Math.min(Math.max(0.05, scale), 5)

      this.$store.dispatch('artboardPositioning/updateZoomLevel', scale)
    },

    zoomReset() {
      this.$store.dispatch('artboardPositioning/updateZoomLevel', 1.0)
    }
  }
}
</script>

<style lang="scss">
.board-container {
  width: 100vw;
  height: 100vh;

  display: grid;
  grid-template-columns: 80px auto;
  grid-template-rows: 56px calc(100vh - 56px);

  grid-template-areas:
    'header header'
    'sidebar main';
}

.header {
  grid-area: header;
}

.invite-button {
  width: auto;
  height: 32px;
  margin: 0;
}

.participants-dropdown {
  margin-right: 20px;
}

.nav {
  grid-area: sidebar;
  display: flex;
  align-items: center;
  flex-direction: column;

  .icon {
    margin-bottom: 20px;
    cursor: pointer;
  }

  overflow-y: auto;
  height: calc(100vh - 56px);

  @media only screen and (min-height: 700px) {
    overflow-y: visible;
    justify-content: center;
  }

  .nav-item {
    &:first-child {
      margin-top: 40px;
    }

    &.is-disabled {
      opacity: 0.2;
      .icon {
        cursor: wait;
      }
    }
  }
}

.board {
  background-color: #f8f8fc;
  overflow: hidden;
  grid-area: main;
  .Board {
    width: 100%;
    height: 100%;
  }
}

.stopwatch-running .stopwatch-icon {
  animation: pulse 1s infinite;
}
</style>
