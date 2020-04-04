<template>
  <div class="Board">
    <div class="CardList">
      <div v-for="(card, id) in cards" class="CardList-item">
        <card
          :value="card"
          @drag="(card) => updateCardPosition(id, card)"
          @input="(card) => updateCardContent(id, card)"
          @delete="deleteCard(id)"
          :key="id"
        />
      </div>
    </div>
    <button @click="addCard" class="Button--addCard">
      <icon icon="draw" size="small" />
    </button>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Card from '~/components/Card'
import Icon from '~/components/Icon'

const { mapState } = createNamespacedHelpers('cards')

export default {
  components: { Card, Icon },

  computed: {
    ...mapState(['cards'])
  },

  methods: {
    addCard() {
      this.$store.dispatch('cards/addCard')
    },

    updateCardContent(id, text) {
      this.$store.dispatch('cards/updateCardContent', {
        id,
        text
      })
    },

    updateCardPosition(id, x, y) {
      this.$store.dispatch('cards/updateCardPosition', {
        id,
        x,
        y
      })
    },

    deleteCard(id) {
      this.$store.dispatch('cards/deleteCard', id)
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.Board {
  position: relative;
  height: 100vh;
  width: 100vw;
  background-color: #f8f8fc;
}
.CardList {
  position: relative;
  transform: translate(50vw, 50vh);
  // outline: 1px dashed red;
}
.Button--addCard {
  position: absolute;
  font-size: 21px;
  left: 0;
  top: 0;
}
</style>
