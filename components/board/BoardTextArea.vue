<template>
  <div v-on-clickaway="handleEditEnd">
    <Moveable
      v-bind="moveable"
      @dragStart="handleDragStart"
      @dragEnd="handleDragEnd"
      @drag="handleDrag"
      :class="[isEditing ? 'is-editing' : '']"
      :style="transform"
      class="TextArea"
    >
      <div class="Textarea--inner">
        <div
          v-show="!isEditing"
          @click="handleEditStart"
          :style="fontSize"
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
            :style="fontSize"
          />
        </div>
      </div>
    </Moveable>
    <portal v-if="isEditing" to="context-menu">
      <context-menu ref="contextMenu" :visible="isEditing">
        <size-picker @sizeChange="handleSizeChange" />
        <delete-button :callback="deleteTextarea" />
      </context-menu>
    </portal>
  </div>
</template>

<script>
// https://www.npmjs.com/package/vue-clickaway
import { mixin as clickaway } from 'vue-clickaway'

// https://vuejsexamples.com/a-vue-component-that-create-moveable-and-resizable/
import Moveable from 'vue-moveable'
import positionAwareMixin from '~/mixins/positionAware'

export default {
  components: {
    Moveable
  },
  mixins: [clickaway, positionAwareMixin],
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
    isDraging: false,
    moveable: {
      draggable: true,
      throttleDrag: 0
    }
  }),
  computed: {
    transform() {
      const x = (this.isDraging ? this.x : this.value.x) + this.deltaX
      const y = (this.isDraging ? this.y : this.value.y) + this.deltaY

      return {
        transform: `translate(${x}px, ${y}px)`
      }
    },

    fontSize() {
      return `font-size: ${this.value.size}px; line-height: ${this.value.size +
        8}px; height: ${this.value.size + 8}px; width: auto;`
    }
  },
  methods: {
    handleDragStart() {
      this.x = this.value.x
      this.y = this.value.y
      this.isDraging = true
      this.$emit('contextOpen')
    },

    handleDragEnd() {
      this.isDraging = false
    },

    handleEditStart() {
      this.isEditing = true
      this.$nextTick(() => {
        this.$emit('contextOpen')
        this.$refs.inputText.focus()
      })
    },

    handleEditEnd(e) {
      if (
        this.$refs.contextMenu &&
        e.target.closest('.Context-menu') === this.$refs.contextMenu.$el
      ) {
        return
      }

      const uuid = this.value.uuid
      const text = this.$refs.inputText.value

      this.$store.dispatch('textareas/updateTextareaContent', { uuid, text })

      this.$nextTick(() => {
        this.isEditing = false
      })
    },

    handleSizeChange(changeValue) {
      const uuid = this.value.uuid
      console.log(this.value.size, changeValue)
      const size = this.value.size + changeValue

      this.$store.dispatch('textareas/updateTextareaSize', { uuid, size })
    },

    deleteTextarea() {
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
      const x = this.x + delta[0] / this.zoomFactor
      const y = this.y + delta[1] / this.zoomFactor

      this.x = x
      this.y = y
      const { uuid } = this.value
      this.$store.dispatch('textareas/updateTextareaPosition', { uuid, x, y })
    }
  }
}
</script>

<style lang="scss" scoped>
$button-size: 22px;

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
.Textarea--Text {
  user-select: none;
}
</style>

<style>
.moveable-control-box {
  display: none !important;
}
</style>
