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
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  height: auto;
  width: auto;
  appearance: none;
  background-color: white;
}
</style>
