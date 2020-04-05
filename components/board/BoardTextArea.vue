<template>
  <div v-on-clickaway="handleEditEnd">
    <Moveable
      v-bind="moveable"
      @drag="handleDrag"
      :class="[isEditing ? 'is-editing' : '']"
      :style="transform"
      class="TextArea"
    >
      <div class="Textarea--inner">
        <div
          v-show="!isEditing"
          @click="handleEditStart"
          class="Textarea--Text"
        >
          {{ value.text }}
        </div>
        <div v-show="isEditing">
          <input
            ref="inputText"
            @click="handleInputClick"
            @change="handleEditEnd"
            @keydown.enter="handleEditEnd"
            :value="value.text"
          />
        </div>
        <button @click="deleteTextarea">
          <icon icon="close" size="small" />
        </button>
      </div>
    </Moveable>
  </div>
</template>

<script>
// https://www.npmjs.com/package/vue-clickaway
import { mixin as clickaway } from 'vue-clickaway'

// https://vuejsexamples.com/a-vue-component-that-create-moveable-and-resizable/
import Moveable from 'vue-moveable'
import Icon from '~/components/Icon'

export default {
  components: {
    Moveable,
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
    }
  },
  methods: {
    handleColorChange(color) {
      const { uuid } = this.value
      const { value: text } = this.$refs.inputText
      this.$store.dispatch('textareas/updateTextareaColor', {
        uuid,
        text,
        color
      })
    },
    handleEditStart() {
      this.isEditing = true
      this.$nextTick(() => {
        this.$emit('contextOpen')
        this.$refs.inputText.focus()
      })
    },

    handleEditEnd() {
      const uuid = this.value.uuid
      const text = this.$refs.inputText.value

      this.$store.dispatch('textareas/updateTextareaContent', { uuid, text })

      this.$nextTick(() => {
        this.isEditing = false
      })
    },

    deleteTextarea(id) {
      this.$store.dispatch('textareas/deleteTextarea', {
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
      this.$store.dispatch('textareas/updateTextareaPosition', { uuid, x, y })
    }
  }
}
</script>

<style lang="scss" scoped>
$button-size: 22px;

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
  margin-left: 10px;
  cursor: pointer;

  transition: opacity ease-in-out 300ms;

  opacity: 0;
}

.TextArea:hover button {
  opacity: 1;
}

input {
  margin-bottom: 0;
}

.Textarea--inner {
  display: flex;
  align-items: center;
}
</style>

<style>
.moveable-control-box {
  display: none !important;
}
</style>
