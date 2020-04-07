<template>
  <div @click="callback" class="button-like">
    <icon icon="close" size="small" />
  </div>
</template>

<script>
import Icon from '~/components/Icon'
export default {
  components: {
    Icon
  },
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

<style lang="scss" scoped></style>
