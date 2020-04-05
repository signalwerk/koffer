<template>
  <div class="button-like">
    <ul class="color-list">
      <li
        v-for="(color, index) in colors"
        :style="`background-color: ${color}; border-color: ${color}`"
        :key="index"
        @click="$emit('input', index)"
        :class="{ 'is-active': value === index }"
        class="color"
      />
    </ul>
  </div>
</template>

<script>
import { COLORS } from '~/store/cards'

export default {
  props: {
    value: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      colors: COLORS
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
