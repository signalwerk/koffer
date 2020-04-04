<template>
  <div>
    <board />
  </div>
</template>

<script>
import Board from '~/components/Board.vue'

export default {
  components: { Board },

  transition: {
    name: 'slide-fade',
    mode: 'out-in'
  }
}
</script>
