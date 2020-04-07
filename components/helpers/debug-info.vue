<template>
  <details v-show="visible">
    <summary>debug info</summary>
    <code>
      <pre>{{ JSON.stringify(dump, null, 2) }}</pre>
    </code>
  </details>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    dump: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped></style>
