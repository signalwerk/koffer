<template>
  <div>
    <Moveable
      v-bind="moveable"
      @drag="handleDrag"
      :class="[isEditing ? 'is-editing' : '']"
      :style="transform"
      class="Card"
    >
      <div :style="cssProps" class="Card--inner">
        <button @click="deleteCard">
          <icon icon="close" size="small" />
        </button>
        <div v-if="!isEditing" @click="handleEditStart" class="Card--Text">
          <div class="Card--TextInner">
            {{ value.text }}
          </div>
        </div>
        <div v-else class="Card--Input">
          <input
            ref="inputText"
            @click="handleInputClick"
            @change="handleEditEnd"
            @keydown.enter="handleEditEnd"
            :value="value.text"
          />
        </div>
      </div>
      <details v-if="true">
        <summary>debug info</summary>
        <code>
          <pre>{{ JSON.stringify(value, null, 2) }}</pre>
        </code>
      </details>
    </Moveable>
    <transition name="fade-fast">
      <div class="Context-menu">
        <div v-show="isEditing" class="context Context-menuInner">
          <color-picker :value="value.color" @input="handleColorChange" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// https://www.npmjs.com/package/vue-clickaway
import { mixin as clickaway } from 'vue-clickaway'

// https://vuejsexamples.com/a-vue-component-that-create-moveable-and-resizable/
import Moveable from 'vue-moveable'
import { COLORS } from '~/store/cards'
import ColorPicker from '~/components/board/ColorPicker.vue'
import Icon from '~/components/Icon'

export default {
  components: {
    Moveable,
    ColorPicker,
    Icon
  },
  mixins: [clickaway],
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    isEditing: false,
    moveable: {
      draggable: true,
      throttleDrag: 0
    }
  }),
  computed: {
    transform() {
      return {
        transform: `translate(${this.value.x}px, ${this.value.y}px)`
      }
    },
    cssProps() {
      return `--card-bg-color: ${COLORS[this.value.color]};`
    }
  },
  methods: {
    handleColorChange(color) {
      const { uuid } = this.value
      const { value: text } = this.$refs.inputText
      this.$store.dispatch('cards/updateCardColor', { uuid, text, color })
    },
    handleEditStart() {
      this.isEditing = true
      this.$nextTick(() => {
        this.$emit('contextOpen')
        this.$refs.inputText.focus()
      })
    },

    handleEditEnd() {
      this.isEditing = false
      const { uuid } = this.value
      const { value: text } = this.$refs.inputText
      this.$store.dispatch('cards/updateCardContent', { uuid, text })
    },

    deleteCard(id) {
      this.$store.dispatch('cards/deleteCard', {
        uuid: this.value.uuid,
        deleted: true
      })
    },

    handleInputClick() {
      this.$nextTick(() => {
        this.$refs.inputText.focus()
      })
    },

    handleDrag({ transform, beforeDelta, beforeDist, delta, dist }) {
      const x = this.value.x + delta[0]
      const y = this.value.y + delta[1]
      const { uuid } = this.value
      this.$store.dispatch('cards/updateCardPosition', { uuid, x, y })
    }
  }
}
</script>

<style lang="scss" scoped>
$size: 250px;
$button-size: 22px;
$colors: (
  '.blue' #7dc8e9,
  '.orange' #f5b57a,
  '.green' #d3e187,
  '.pink' #e7909a,
  '.umbra' #efd351,
  '.lavender' #e5acc8,
  '.yellow' #fcf4a9
);

* {
  box-sizing: border-box;
}

.Card {
  position: absolute;
  width: $size;
  height: $size;
  box-shadow: 1px 1px 3px rgba(100, 100, 100, 0.4);
  transition: box-shadow 300ms ease-in-out;

  &--inner {
    display: flex;
    flex-direction: column;
    padding: 20px;
    height: 100%;
    background-color: #fcf4a9;
    background-color: var(--card-bg-color);
  }
  @each $class, $color in $colors {
    &#{$class} &--inner {
      background-color: $color;
    }
  }

  &--Text,
  &--Input {
    // outline: 1px dashed red;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    text-align: center;
  }
  &.is-editing {
    z-index: 1;
    box-shadow: 15px 3px 25px rgba(100, 100, 100, 0.4);
  }
}

input {
  width: auto;
  display: block;
  font: inherit;
  text-transform: inherit;
  background-color: transparent;
  border-color: black;
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  background: transparent;
  border: none;
  padding: 5px;
  width: $button-size;
  height: $button-size;
}
.icon,
.icon > img {
  display: inline-block;
}

.Context-menu {
  transform: translate(-50vw, -50vh);
}
.Context-menuInner {
  left: 50%;
  top: 24px;
  transform: translateX(-50%);
}
</style>

<style>
.moveable-control-box {
  display: none !important;
}
</style>
