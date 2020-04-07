<template>
  <button @click="callback" class="button-like">
    <icon icon="close" size="small" />
  </button>
</template>

<script>
export default {
  props: {
    callback: {
      type: Function,
      default: () => {
        throw new ErrorEvent('No callback supplied, pleas do so')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  height: auto;
  width: auto;
  background-color: white;
}
</style>
