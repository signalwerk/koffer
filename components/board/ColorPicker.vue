<template>
  <div class="button-like">
    <ul class="color-list">
      <li
        v-for="(color, index) in colors"
        :style="`background-color: ${color}; border-color: ${color}`"
        :key="index"
        @click="$emit('input', color)"
        :class="{ 'is-active': value === color }"
        class="color"
      />
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      colors: [
        '#fcf4a9',
        '#efd351',
        '#f5b57a',
        '#e5acc8',
        '#e7909a',
        '#77ddcc',
        '#d3e187'
      ]
    }
  }
}
</script>

<style lang="scss">
.color-list {
  list-style-type: none;
  display: flex;
  padding-left: 0;

  .color {
    width: 25px;
    height: 25px;
    display: block;
    margin-right: 10px;
    cursor: pointer;
    border-width: 2px;
    border-style: solid;
    border-radius: 50%;

    &.is-active {
      border: 3px solid #3985f7 !important;
    }
  }
}
</style>
