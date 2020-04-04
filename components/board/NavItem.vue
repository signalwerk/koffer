<template>
  <div class="nav-item" @click="$emit('click')">
    <icon :is-active="isActive" :icon="icon" size="xl" />
  </div>
</template>

<script>
import Icon from '~/components/Icon.vue'

export default {
  components: {
    Icon
  },

  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.nav-item {
  margin-bottom: 40px;

  &:active,
  &:focus {
    outline: none;
  }
}
</style>
