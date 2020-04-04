<template>
  <div>
    <button @click="$emit('delete')">Delete</button>
    <div>
      X:
      <input ref="x" :value="value.x" @input="handleInput" type="number" />
    </div>
    <div>
      Y:
      <input ref="y" :value="value.y" @input="handleInput" type="number" />
    </div>
    <div>
      Text: <input ref="text" :value="value.text" @input="handleInput" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => ({
        x: 0,
        y: 0,
        text: ''
      })
    }
  },

  methods: {
    handleInput() {
      this.$emit('input', {
        x: parseInt(this.$refs.x.value),
        y: parseInt(this.$refs.y.value),
        text: this.$refs.text.value
      })
    }
  }
}
</script>
