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
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Card from '~/components/board/Card'

const { mapState } = createNamespacedHelpers('cards')

export default {
  components: { Card },

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
  left: 200px;
  top: 200px;
}
</style>
