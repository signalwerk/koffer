<template>
  <Moveable
    v-bind="moveable"
    @drag="handleDrag"
    :class="[isEditing ? 'is-editing' : '']"
    class="Card"
    :style="transform"
  >
    <div class="Card--inner">
      <button @click="deleteCard">
        <icon icon="close" size="small" />
      </button>
      <div>
        <label>
          <div v-if="!isEditing" @click="handleEditStart">
            <icon icon="draw" size="small" />: {{ value.text }}
          </div>
          <input
            ref="inputText"
            v-else
            @click="handleInputClick"
            @keydown.enter="handleEditEnd"
            @blur="handleEditEnd"
            :value="value.text"
          />
        </label>
      </div>
      <details>
        <summary>[i]</summary>
        <code>
          <pre>{{ JSON.stringify(value, null, 2) }}</pre>
        </code>
      </details>
    </div>
  </Moveable>
</template>

<script>
// https://vuejsexamples.com/a-vue-component-that-create-moveable-and-resizable/
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
    isEditing: false,
    moveable: {
      draggable: true,
      throttleDrag: 0
    }
  }),
  // mounted() {
  //   this.$refs.moveable.$el.style.transform = this.value.transform
  // },

  computed: {
    transform() {
      return {
        transform: `translate(${this.value.x}px, ${this.value.y}px)`
      }
    }
  },
  methods: {
    handleEditStart() {
      this.isEditing = true
    },
    handleEditEnd() {
      this.isEditing = false
      this.$store.dispatch('cards/updateCardContent', {
        uuid: this.value.uuid,
        text: this.$refs.inputText.value
      })
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
    handleDrag({
      // target,
      // top: y,
      // left: x,
      transform,
      beforeDelta,
      beforeDist,
      delta,
      dist
    }) {
      const x = this.value.x + delta[0]
      const y = this.value.y + delta[1]

      // target.style.transform = transform
      this.$store.dispatch('cards/updateCardPosition', {
        uuid: this.value.uuid,
        // transform,
        x,
        y
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$size: 250px;
$button-size: 22px;

* {
  box-sizing: border-box;
}

.Card {
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
</style>

<style>
.moveable-control-box {
  display: none !important;
}
</style>
