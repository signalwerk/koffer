<template>
  <Moveable
    ref="moveable"
    v-bind="moveable"
    @drag="handleDrag"
    :class="[isEditing ? 'is-editing' : '']"
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
  data: () => ({
    type: 'Triangle',
    moveable: {
      draggable: true,
      throttleDrag: 0
    }
  })
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
