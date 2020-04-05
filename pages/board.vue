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
        View: 100%
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

    <aside class="nav">
      <nav-item
        v-for="(navItem, index) in navItems"
        :key="index"
        :is-active="activeTool === navItem.item"
        :icon="navItem.item"
        :class="{ 'is-disabled': navItem.disabled }"
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

    <board
      ref="board"
      @contextOpen.capture="hasStopwatch = false"
      class="board"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Board from '~/components/board/Board.vue'
import NavItem from '~/components/board/NavItem.vue'
import StopWatch from '~/components/board/StopWatch.vue'
import { socket } from '~/util/socketio'

const { mapState: mapSessionsState } = createNamespacedHelpers('sessions')

export default {
  components: { NavItem, Board, StopWatch },

  transition: {
    name: 'slide-fade',
    mode: 'out-in'
  },

  created() {
    console.log('router', this.$router.currentRoute)
    const id = this.$router.currentRoute.query.id
    socket.emit('session:join', id)
    console.log('joindedboard: ', id)
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
          handler: () => {}
        },
        {
          item: 'sticky-note',
          name: 'Add a sticky note',
          disabled: false,
          handler: this.addSticky
        },
        {
          item: 'text',
          name: 'Add a text',
          disabled: false,
          handler: this.addTextarea
        },
        {
          item: 'shape',
          name: 'Add a shape',
          disabled: false,
          handler: this.addShape
        },
        {
          item: 'stopwatch',
          name: 'Stopwatch',
          disabled: false,
          handler: this.toggleStopwatch
        },
        {
          item: 'artboard',
          name: 'Coming soon',
          disabled: true,
          handler: () => {}
        },
        {
          item: 'draw',
          name: 'Coming soon',
          disabled: true,
          handler: () => {}
        },
        {
          item: 'eraser',
          name: 'Coming soon',
          disabled: true,
          handler: () => {}
        }
      ]
    }
  },

  computed: {
    ...mapSessionsState(['sessions'])
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
  overflow: hidden;
  grid-area: main;
}
</style>
