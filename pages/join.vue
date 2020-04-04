<template>
  <div class="page-section-container">
    <header class="header">
      <div class="bold">
        {{ sessionName }}
      </div>
    </header>
    <transition name="slide" mode="out-in">
      <page-section>
        <h1 class="bold">
          Signers Koffer
        </h1>
        <p class="h2 lead">
          👋 John invites you to his session.
        </p>
        <input v-model="userName" placeholder="Name" />
        <nuxt-link
          @click="persistSettings"
          to="/board"
          tag="button"
          class="button button--primary"
        >
          Submit
        </nuxt-link>
      </page-section>
    </transition>
  </div>
</template>

<script>
import PageSection from '~/components/PageSection.vue'

export default {
  components: { PageSection },

  transition: {
    name: 'slide-fade',
    mode: 'out-in'
  },

  data() {
    return {
      step: 1,
      userName: '',
      sessionName: 'Dummy name until hooked'
    }
  },

  methods: {
    persistSettings() {
      this.$store.dispatch('session/setSettings', {
        userName: this.userName,
        sessionName: this.sessionName
      })
    }
  }
}
</script>

<style>
.page-progress {
  position: absolute;
}

.lead {
  margin-bottom: 40px;
}

.done-button {
  margin-top: 40px;
  width: 100px;
}
</style>
