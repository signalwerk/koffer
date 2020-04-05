<template>
  <div class="button-like">
    <ul class="shape-list">
      <li
        v-for="(shape, index) in shapes"
        :key="index"
        @click="$emit('input', index)"
        :class="{ 'is-active': value === index }"
        class="shape"
      />
    </ul>
  </div>
</template>

<script>
import { SHAPES } from '~/store/shapes'

export default {
  props: {
    value: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      shapes: SHAPES
    }
  }
}
</script>

<style lang="scss">
.shape-list {
  list-style-type: none;
  display: flex;
  padding-left: 0;

  .shape {
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
