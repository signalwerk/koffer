<template>
  <div v-on-clickaway="handleEditEnd">
    <Moveable
      v-bind="moveable"
      @dragStart="handleDragStart"
      @dragEnd="handleDragEnd"
      @drag="handleDrag"
      :class="[isEditing ? 'is-editing' : '']"
      :style="transform"
      class="Card"
    >
      <div :style="cssProps" class="Card--inner">
        <div v-show="!isEditing" @click="handleEditStart" class="Card--Text">
          <div class="Card--TextInner">
            {{ value.text }}
          </div>
        </div>
        <div v-show="isEditing" class="Card--Input">
          <input
            ref="inputText"
            @click="handleInputClick"
            @keydown.enter="handleEditEnd"
            :value="value.text"
          />
        </div>
      </div>
      <debug-info :visible="false" :dump="value" />
    </Moveable>
    <context-menu :visible="isEditing">
      <color-picker :value="value.color" @input="handleColorChange" />
      <delete-button :callback="deleteCard" />
    </context-menu>
  </div>
</template>

<script>
// https://www.npmjs.com/package/vue-clickaway
import { mixin as clickaway } from 'vue-clickaway'
// https://vuejsexamples.com/a-vue-component-that-create-moveable-and-resizable/
import Moveable from 'vue-moveable'

import { COLORS } from '~/store/cards'

export default {
  components: { Moveable },
  mixins: [clickaway],
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    x: 0,
    y: 0,
    isEditing: false,
    moveable: {
      draggable: true,
      throttleDrag: 0
    }
  }),
  computed: {
    transform() {
      const x = this.isDraging ? this.x : this.value.x
      const y = this.isDraging ? this.y : this.value.y

      return {
        transform: `translate(${x}px, ${y}px)`
      }
    },
    cssProps() {
      return `--card-bg-color: ${COLORS[this.value.color]};`
    }
  },
  methods: {
    handleDragStart() {
      this.x = this.value.x
      this.y = this.value.y
      this.isDraging = true
    },
    handleDragEnd() {
      this.isDraging = true
    },
    handleColorChange(color) {
      const { uuid } = this.value
      this.$store.dispatch('cards/updateCardColor', { uuid, color })
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
      const x = this.x + delta[0]
      const y = this.y + delta[1]

      this.x = x
      this.y = y
      const { uuid } = this.value
      this.$store.dispatch('cards/updateCardPosition', { uuid, x, y })
    }
  }
}
</script>

<style lang="scss" scoped>
$size: 250px;

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

  &:hover .icon,
  &:hover .icon > img {
    opacity: 1;
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

.icon,
.icon > img {
  display: inline-block;
  opacity: 0;
  transition: opacity 300ms ease-in-out;
}
</style>

<style>
.moveable-control-box {
  display: none !important;
}
</style>
