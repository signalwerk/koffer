<template>
  <Moveable v-bind="moveable" @drag="handleDrag" class="moveable">
    <div class="Card">
      <button @click="$emit('delete')">Delete</button>
      <div>
        <details>
          <summary>info</summary>
          <code>
            <pre>{{ JSON.stringify(value, null, 2) }}</pre>
          </code>
        </details>
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
      default: () => ({})
    }
  },
  data: () => ({
    initialPos: {
      x: 0,
      y: 0
    },
    moveable: {
      draggable: true,
      throttleDrag: 0
    }
  }),
  methods: {
    handleInput() {
      this.$emit('input', {
        text: this.$refs.text.value
      })
    },
    handleDrag({ target, top, left, transform }) {
      target.style.transform = transform
      this.$store.dispatch('cards/updateCardPosition', {
        id: this.value.id,
        x: top,
        y: left
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
