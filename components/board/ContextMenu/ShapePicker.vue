<template>
  <div class="button-like">
    <ul class="shape-list">
      <li
        v-for="(shape, index) in shapes"
        :key="index"
        @click="$emit('input', index)"
        :class="[{ 'is-active': value === index }, shapes[index]]"
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
      type: Number,
      default: 0
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

    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
    }
    &.circle::after {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-0.1 -0.1 1.2 1.2'%3E%3Ccircle fill='black' cx='0.5' cy='0.5' r='0.5'/%3E%3C/svg%3E%0A");
    }
    &.triangle::after {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-0.1 -0.1 1.2 1.2'%3E%3Cpath fill='black' stroke-width='0.1' d='M0 1H1L0.5 0Z' /%3E%3C/svg%3E%0A");
    }
    &.rectangle::after {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-0.1 -0.1 1.2 1.2'%3E%3Cpath fill='black' stroke-width='0.1' d='M0 0H1V1H-1v-1' /%3E%3C/svg%3E%0A");
    }

    &.is-active.circle::after {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-0.1 -0.1 1.2 1.2'%3E%3Ccircle fill='%233985f7' cx='0.5' cy='0.5' r='0.5'/%3E%3C/svg%3E");
    }
    &.is-active.triangle::after {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-0.1 -0.1 1.2 1.2'%3E%3Cpath fill='%233985f7' stroke-width='0.1' d='M0 1H1L0.5 0Z' /%3E%3C/svg%3E");
    }
    &.is-active.rectangle::after {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-0.1 -0.1 1.2 1.2'%3E%3Cpath fill='%233985f7' stroke-width='0.1' d='M0 0H1V1H-1v-1' /%3E%3C/svg%3E%0A");
    }
  }
}
</style>
