<template>
  <div :style="width" class="progress-bar" />
</template>

<script>
export default {
  props: {
    amount: {
      type: Number,
      default: 0.5
    }
  },

  computed: {
    width() {
      return `width: ${this.amount * 100}%`
    }
  }
}
</script>

<style>
.progress-bar {
  height: 20px;
  background-color: #0089f1;

  transition: width 1s;
}
</style>
