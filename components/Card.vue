<template>
  <Moveable v-bind="moveable" @drag="handleDrag" class="moveable Card">
    <div class="Card--inner">
      <button @click="$emit('delete')">Delete</button>
      <div>
        <label>
          Text:
          <input ref="inputText" :value="value.text" @input="handleInput" />
        </label>
      </div>
      <details>
        <summary>info</summary>
        <code>
          <pre>{{ JSON.stringify(value, null, 2) }}</pre>
        </code>
      </details>
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
      this.$store.dispatch('cards/updateContent', {
        id: this.value.id,
        text: this.$refs.inputText.value
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
$size: 250px;

* {
  box-sizing: border-box;
}

.Card {
  position: absolute;
  width: $size;
  height: $size;
  padding: 20px;

  &--inner {
    height: 100%;
    background-color: #fefac7;
  }
}

input {
  width: auto;
  margin: 20px;
  display: block;
}
</style>
