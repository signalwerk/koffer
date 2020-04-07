import Vue from 'vue'
import Icon from '~/components/Icon'
import DebugInfo from '~/components/helpers/debug-info.vue'
import ContextMenu from '~/components/board/ContextMenu/ContextMenu.vue'
import DeleteButton from '~/components/board/ContextMenu/DeleteButton.vue'
import ColorPicker from '~/components/board/ContextMenu/ColorPicker.vue'

Vue.component('icon', Icon)
Vue.component('debig-info', DebugInfo)
Vue.component('context-menu', ContextMenu)
Vue.component('delete-button', DeleteButton)
Vue.component('color-picker', ColorPicker)
