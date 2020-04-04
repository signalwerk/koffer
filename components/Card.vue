<template>
  <Moveable v-bind="moveable" @drag="handleDrag" class="moveable">
    <div class="Card">
      <button @click="$emit('delete')">Delete</button>
      <div>
        <span>@({{ value.x }}/{{ value.y }})</span>
        <label>
          Text: <input ref="text" :value="value.text" @input="handleInput" />
        </label>
      </div>
    </div>
  </Moveable>
</template>

<script>
// https://vuejsexamples.com/a-vue-component-that-create-moveable-and-resizable/
import Moveable from 'vue-moveable'

export default {
  components: {
    Moveable
  },
  props: {
    value: {
      type: Object,
      default: () => ({
        x: this.$store.card.x,
        y: this.$store.card.y,
        text: ''
      })
    }
  },
  data: () => ({
    moveable: {
      draggable: true,
      throttleDrag: 0,
      resizable: false,
      throttleResize: 1,
      keepRatio: true,
      scalable: false,
      throttleScale: 0,
      rotatable: false,
      throttleRotate: 0
    }
  }),
  methods: {
    handleInput() {
      this.$emit('input', {
        text: this.$refs.text.value
      })
    },
    handleDrag({ target, left, top }) {
      target.style.transform = `translate3d(${left}px, ${top}px, 0)`
      this.$store.commit({
        type: 'card/drag',
        x: left,
        y: top
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.Card {
  $size: 250px;
  width: $size;
  height: $size;
  background-color: palegoldenrod;
}
</style>
