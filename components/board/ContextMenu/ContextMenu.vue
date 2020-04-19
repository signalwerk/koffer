<template>
  <transition name="fade-fast">
    <div class="Context-menu">
      <div v-show="visible" class="context Context-menuInner">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    visible: Boolean
  }
}
</script>

<style lang="scss" scoped>
.Context-menuInner {
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}
</style>
