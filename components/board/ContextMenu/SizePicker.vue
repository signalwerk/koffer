<template>
  <div class="button-like">
    <span class="size" @click="$emit('sizeChange', -1 * sizeStep)">
      A-
    </span>
    <span class="size" @click="$emit('sizeChange', sizeStep)">
      A+
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sizeStep: 8
    }
  }
}
</script>

<style lang="scss">
.size {
  cursor: pointer;
  user-select: none;

  &:not(:last-child) {
    margin-right: 15px;
  }
}
</style>
