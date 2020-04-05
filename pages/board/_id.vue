<template>
  <div class="board-container">
    <header class="header">
      <div class="bold">
        {{ sessionName }}
      </div>
      <div>
        Zoom placeholder
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
        @click="
          () => {
            activeTool = navItem.item
            navItem.handler()
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
import { mapState } from 'vuex'
import Board from '~/components/board/Board.vue'
import NavItem from '~/components/board/NavItem.vue'
import StopWatch from '~/components/board/StopWatch.vue'
import { socket } from '~/util/socketio'

export default {
  components: { NavItem, Board, StopWatch },

  transition: {
    name: 'slide-fade',
    mode: 'out-in'
  },

  created() {
    const id = this.$router.currentRoute.params.id
    socket.emit('session:join', id)
    console.log('joindedboard: ', id)
  },

  data() {
    return {
      activeTool: 'select',
      hasStopwatch: false,
      color: null,
      navItems: [
        { item: 'select', handler: () => {} },
        { item: 'artboard', handler: () => {} },
        { item: 'sticky-note', handler: this.addSticky },
        { item: 'text', handler: () => {} },
        { item: 'shape', handler: this.addShape },
        { item: 'draw', handler: () => {} },
        { item: 'eraser', handler: () => {} },
        { item: 'stopwatch', handler: this.toggleStopwatch }
      ]
    }
  },

  computed: {
    ...mapState('sessions', ['sessionName'])
  },

  methods: {
    addShape() {
      this.$refs.board.addShape()
    },

    addSticky() {
      this.$refs.board.addCard()
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

  .nav-item:first-child {
    margin-top: 40px;
  }
}

.board {
  overflow: hidden;
  grid-area: main;
}
</style>
