<template>
  <Moveable
    ref="moveable-shape"
    v-bind="moveableShape"
    @drag="handleDrag"
    class="Shape"
  >
    Hello Shapies
  </Moveable>
</template>

<script>
import Moveable from 'vue-moveable'
export default {
  components: {
    Moveable
  },
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    moveableShape: {
      draggable: true,
      throttleDrag: 0
    }
  }),
  methods: {
    handleDrag({ target, top: y, left: x, transform }) {
      const { id } = this.value
      target.style.transform = transform
      this.$store.dispatch('shapes/updatePosition', { id, transform, x, y })
    }
  }
}
</script>

<style lang="scss" scoped>
$size: 250px;

* {
  box-sizing: border-box;
}

.Shape {
  position: absolute;
  width: $size;
  height: $size;
  box-shadow: 0 0 0 rgba(100, 100, 100, 0.4);
  transition: box-shadow 300ms ease-in-out;

  &--inner {
    padding: 20px;
    height: 100%;
    background-color: #fefac7;
  }
}
</style>
