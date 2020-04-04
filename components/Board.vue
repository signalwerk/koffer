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
import { createNamespacedHelpers } from 'vuex'
import Card from '~/components/Card'
const { mapState } = createNamespacedHelpers('cards')

export default {
  components: { Card },

  computed: {
    ...mapState(['cards'])
  },

  methods: {
    addCard() {
      this.$store.dispatch('cards/addCard')
    },

    updateCard(id, card) {
      this.$store.dispatch('cards/updateCard', {
        id,
        card
      })
    },

    updateCardPosition(id, x, y) {
      this.$store.dispatch('cards/updateCardPosition', {
        id,
        x,
        y
      })
    },

    deleteCard(id) {
      this.$store.dispatch('cards/deleteCard', id)
    }
  }
}
</script>
