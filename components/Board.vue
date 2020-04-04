<template>
  <div>
    <div v-for="(card, id) in cards">
      <card
        :value="card"
        @drag="(card) => updateCardPosition(id, card)"
        @input="(e) => updateCard(id, e)"
        @delete="deleteCard(id)"
        :key="id"
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
      this.$store.dispatch('cards/addCard')
    },

    deleteCard(index) {
      this.$store.dispatch('cards/deleteCard', index)
    },

    updateCard(index, card) {
      this.$store.dispatch('cards/updateCard', {
        index,
        card
      })
    },

    updateCardPosition(index, card) {
      this.$store.dispatch('updateCardPosition', {
        index,
        card
      })
    }
  }
}
</script>
