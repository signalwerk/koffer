<template>
  <Moveable
    ref="moveable-shape"
    v-bind="moveableShape"
    @drag="handleDrag"
    class="Shape"
  >
    <svg viewBox="0 0 100 100">
      <circle
        v-if="type === 'circle'"
        cx="50"
        cy="50"
        r="40"
        stroke="black"
        stroke-width="3"
        fill="red"
      />
      <rect v-else-if="type === 'rectangle'" width="300" height="100" />
    </svg>
    <div class="ControlsToggle">
      <icon icon="draw" size="small" />
    </div>
    <div v-if="isEditing" class="controls">hello</div>
  </Moveable>
</template>

<script>
import Moveable from 'vue-moveable'
import Icon from '~/components/Icon'

export default {
  components: {
    Moveable,
    Icon
  },
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    type: 'circle',
    isEditing: false,
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

  &:hover .ControlsToggle {
    opacity: 1;
  }
}

.ControlsToggle {
  opacity: 0.2;
}
</style>
