<template>
  <div class="Board">
    <div class="CardList">
      <div v-for="(card, id) in cards" :key="id" class="CardList-item">
        <card :value="card" @contextOpen="$emit('contextOpen')" />
      </div>
    </div>
    <div class="ShapeList">
      <div v-for="(shape, id) in shapes" :key="id" class="ShapeList-item">
        <shape :value="shape" @contextOpen="$emit('contextOpen')" />
      </div>
    </div>

    <div class="TextareaList">
      <div
        v-for="(textarea, id) in textareas"
        :key="id"
        class="TextareaList-item"
      >
        <board-text-area
          :value="textarea"
          @contextOpen="$emit('contextOpen')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import Card from '~/components/board/Card'
import Shape from '~/components/board/Shape'
import BoardTextArea from '~/components/board/BoardTextArea'

const { mapState: mapCardsState } = createNamespacedHelpers('cards')
const { mapState: mapShapesState } = createNamespacedHelpers('shapes')
const { mapState: mapTextareaState } = createNamespacedHelpers('textareas')

export default {
  components: { Card, Shape, BoardTextArea },

  computed: {
    ...mapCardsState(['cards']),
    ...mapShapesState(['shapes']),
    ...mapTextareaState(['textareas'])
  },

  methods: {
    addCard() {
      this.$store.dispatch('cards/addCard')
    },

    addShape() {
      this.$store.dispatch('shapes/addShape')
    },

    addTextarea() {
      this.$store.dispatch('textareas/addTextarea')
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.ShapeList,
.CardList,
.TextareaList {
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
