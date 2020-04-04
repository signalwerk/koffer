<template>
  <div class="Board">
    <div class="CardList">
      <div v-for="(card, id) in cards" :key="id" class="CardList-item">
        <card
          :value="card"
          @drag="(card) => updateCardPosition(id, card)"
          @input="(card) => updateCardContent(id, card)"
          @delete="deleteCard(id)"
        />
      </div>
    </div>
    <div class="ShapeList">
      <div v-for="(shape, id) in shapes" :key="id" class="ShapeList-item">
        <shape
          :value="shape"
          @drag="(shape) => updateShapePosition(id, shape)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Card from '~/components/board/Card'
import Shape from '~/components/board/Shape'

const { mapState: mapCardsState } = createNamespacedHelpers('cards')
const { mapState: mapShapesState } = createNamespacedHelpers('shapes')

export default {
  components: { Card, Shape },

  computed: {
    ...mapCardsState(['cards']),
    ...mapShapesState(['shapes'])
  },

  methods: {
    addCard() {
      this.$store.dispatch('cards/addCard')
    },
    addShape() {
      this.$store.dispatch('shapes/add')
    },

    updateCardContent(id, text) {
      this.$store.dispatch('cards/updateCardContent', { id, text })
    },

    updateShapePosition(id, x, y) {
      this.$store.dispatch('shapes/updatePosition', { id, x, y })
    },
    updateCardPosition(id, x, y) {
      this.$store.dispatch('cards/updateCardPosition', { id, x, y })
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
.ShapeList,
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
