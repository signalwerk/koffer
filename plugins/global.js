import Vue from 'vue'
import Icon from '~/components/Icon'
import DebugInfo from '~/components/helpers/debug-info.vue'
import ContextMenu from '~/components/board/ContextMenu/ContextMenu.vue'
import DeleteButton from '~/components/board/ContextMenu/DeleteButton.vue'
import ColorPicker from '~/components/board/ContextMenu/ColorPicker.vue'
import ShapePicker from '~/components/board/ContextMenu/ShapePicker.vue'
import SizePicker from '~/components/board/ContextMenu/SizePicker.vue'

Vue.component('icon', Icon)
Vue.component('debug-info', DebugInfo)
Vue.component('context-menu', ContextMenu)
Vue.component('delete-button', DeleteButton)
Vue.component('color-picker', ColorPicker)
Vue.component('shape-picker', ShapePicker)
Vue.component('size-picker', SizePicker)
