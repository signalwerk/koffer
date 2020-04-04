<template>
  <div>
    <div v-for="(card, index) in cards">
      <card
        :value="card"
        @input="(e) => updateCard(index, e)"
        @delete="deleteCard(index)"
        :key="index"
      />
    </div>
    <button @click="addCard">Add new card</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Card from '~/components/Card'

export default {
  components: { Card },

  computed: {
    ...mapState(['cards'])
  },

  methods: {
    addCard() {
      this.$store.dispatch('addCard')
    },

    deleteCard(index) {
      this.$store.dispatch('deleteCard', index)
    },

    updateCard(index, card) {
      this.$store.dispatch('updateCard', {
        index,
        card
      })
    }
  }
}
</script>
