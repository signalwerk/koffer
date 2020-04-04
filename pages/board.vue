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

    <board ref="board" class="board" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Board from '~/components/board/Board.vue'
import NavItem from '~/components/board/NavItem.vue'

export default {
  components: { NavItem, Board },

  transition: {
    name: 'slide-fade',
    mode: 'out-in'
  },

  data() {
    return {
      activeTool: 'select',
      navItems: [
        { item: 'select', handler: () => {} },
        { item: 'artboard', handler: () => {} },
        { item: 'sticky-note', handler: this.addSticky },
        { item: 'text', handler: () => {} },
        { item: 'shape', handler: () => {} },
        { item: 'draw', handler: () => {} },
        { item: 'eraser', handler: () => {} },
        { item: 'stopwatch', handler: () => {} }
      ]
    }
  },

  computed: {
    ...mapState('session', ['sessionName'])
  },

  methods: {
    addSticky() {
      this.$refs.board.addCard()
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
  grid-template-rows: 56px auto;
}

.header {
  background-color: #3985f7;
  color: #fff;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  z-index: 99999;
  position: relative;

  grid-column-start: 1;
  grid-column-end: span 2;
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
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .icon {
    margin-bottom: 20px;
    cursor: pointer;
  }
}

.board {
  overflow: hidden;
}
</style>
