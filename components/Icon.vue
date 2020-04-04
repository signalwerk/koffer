<template>
  <span :class="cssClass">
    <img :src="iconLink" />
  </span>
</template>

<script>
import iconArrow from '~/assets/icons/iconArrow.svg'
import iconArtboard from '~/assets/icons/iconArtboard.svg'
import iconClose from '~/assets/icons/iconClose.svg'
import iconDraw from '~/assets/icons/iconDraw.svg'
import iconEraser from '~/assets/icons/iconEraser.svg'
import iconExport from '~/assets/icons/iconExport.svg'
import iconLink from '~/assets/icons/iconLink.svg'
import iconLocked from '~/assets/icons/iconLocked.svg'
import iconSelect from '~/assets/icons/iconSelect.svg'
import iconShape from '~/assets/icons/iconShape.svg'
import iconStickyNote from '~/assets/icons/iconStickyNote.svg'
import iconStopwatch from '~/assets/icons/iconStopwatch.svg'
import iconText from '~/assets/icons/iconText.svg'
import iconUnlocked from '~/assets/icons/iconUnlocked.svg'
import iconArrowActive from '~/assets/icons/iconArrow--active.svg'
import iconArtboardActive from '~/assets/icons/iconArtboard--active.svg'
import iconCloseActive from '~/assets/icons/iconClose--active.svg'
import iconDrawActive from '~/assets/icons/iconDraw--active.svg'
import iconEraserActive from '~/assets/icons/iconEraser--active.svg'
import iconExportActive from '~/assets/icons/iconExport--active.svg'
import iconLinkActive from '~/assets/icons/iconLink--active.svg'
import iconLockedActive from '~/assets/icons/iconLocked--active.svg'
import iconSelectActive from '~/assets/icons/iconSelect--active.svg'
import iconShapeActive from '~/assets/icons/iconShape--active.svg'
import iconStickyNoteActive from '~/assets/icons/iconStickyNote--active.svg'
import iconStopwatchActive from '~/assets/icons/iconStopwatch--active.svg'
import iconTextActive from '~/assets/icons/iconText--active.svg'
import iconUnlockedActive from '~/assets/icons/iconUnlocked--active.svg'

export default {
  props: {
    isActive: {
      type: Boolean,
      default: false
    },

    icon: {
      type: String,
      required: true
    },

    size: {
      type: String,
      default: 'medium'
    }
  },

  computed: {
    iconLink() {
      if (!this.isActive) {
        switch (this.icon) {
          case 'arrow':
            return iconArrow
          case 'artboard':
            return iconArtboard
          case 'close':
            return iconClose
          case 'draw':
            return iconDraw
          case 'eraser':
            return iconEraser
          case 'export':
            return iconExport
          case 'link':
            return iconLink
          case 'locked':
            return iconLocked
          case 'select':
            return iconSelect
          case 'shape':
            return iconShape
          case 'sticky-note':
            return iconStickyNote
          case 'stopwatch':
            return iconStopwatch
          case 'text':
            return iconText
          case 'unlocked':
            return iconUnlocked
          default:
            throw new Error(`Unknown icon: ${this.icon}`)
        }
      } else {
        switch (this.icon) {
          case 'arrow':
            return iconArrowActive
          case 'artboard':
            return iconArtboardActive
          case 'close':
            return iconCloseActive
          case 'draw':
            return iconDrawActive
          case 'eraser':
            return iconEraserActive
          case 'export':
            return iconExportActive
          case 'link':
            return iconLinkActive
          case 'locked':
            return iconLockedActive
          case 'select':
            return iconSelectActive
          case 'shape':
            return iconShapeActive
          case 'sticky-note':
            return iconStickyNoteActive
          case 'stopwatch':
            return iconStopwatchActive
          case 'text':
            return iconTextActive
          case 'unlocked':
            return iconUnlockedActive
          default:
            throw new Error(`Unknown icon: ${this.icon}`)
        }
      }
    },

    cssClass() {
      return `icon icon--${this.size}`
    }
  }
}
</script>
<style lang="scss">
.icon {
  &.icon--small img {
    width: 14px;
    height: 14px;
  }
  &.icon--medium img {
    width: 20px;
    height: 20px;
  }
  &.icon--large img {
    width: 26px;
    height: 26px;
  }
}
</style>
