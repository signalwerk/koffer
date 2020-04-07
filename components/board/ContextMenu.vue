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
.Context-menu {
  transform: translate(-50vw, -50vh);
}
.Context-menuInner {
  left: 50%;
  top: 24px;
  transform: translateX(-50%);
}
</style>
