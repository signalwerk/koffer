<template>
  <div class="page-section-container">
    <progress-bar :amount="progress" class="page-progress" />

    <transition name="slide" mode="out-in">
      <page-section v-if="step === 1">
        <h1 class="bold">
          Let's get to know each other
        </h1>
        <p class="h2 lead">
          👋 Start right now, but first of all: What's your name?
        </p>
        <input
          v-model="name"
          @change="(e) => updateName(e.target.value)"
          placeholder="NAME"
        />
        <button @click="step++" class="button button--primary">Submit</button>
      </page-section>
    </transition>

    <transition name="slide" mode="out-in">
      <page-section v-if="step === 2">
        <h1 class="bold">
          Name this session
        </h1>
        <p class="h2 lead">
          ✍️ Let the participants know what they are working on.
        </p>
        <input v-model="sessionName" placeholder="" />
        <button @click="persistSettings" class="button button--primary">
          Almost complete
        </button>
      </page-section>
    </transition>

    <transition name="slide" mode="out-in">
      <page-section v-if="step === 3">
        <h1 class="bold">Invite people</h1>
        <p class="h2 lead">
          🚀 Create your crew
        </p>

        <div>
          <h2 class="h5 bold">Send link to invite more administrators</h2>
          <p>
            Administrators host and moderate the session.
          </p>
          <link-container
            :link="
              `https://signers-koffer.github.io/koffer/board/?id=${uuid}&admin=${admin}`
            "
          />
        </div>

        <div>
          <h2 class="h5 bold">Send link to invite participants</h2>
          <link-container
            :link="`https://signers-koffer.github.io/koffer/board/?id=${uuid}`"
          />
        </div>

        <div>
          <nuxt-link
            :to="`/board/?id=${uuid}`"
            tag="button"
            class="button button--primary done-button"
          >
            Done
          </nuxt-link>
        </div>
      </page-section>
    </transition>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import ShortId from '~/util/shortId'
import ProgressBar from '~/components/ProgressBar.vue'
import PageSection from '~/components/PageSection.vue'
import LinkContainer from '~/components/LinkContainer.vue'

const { mapState, mapActions } = createNamespacedHelpers('me')

export default {
  components: { ProgressBar, PageSection, LinkContainer },

  transition: {
    name: 'slide-fade',
    mode: 'out-in'
  },

  data() {
    return {
      step: 1,
      sessionName: '',
      uuid: ShortId(),
      admin: ShortId()
    }
  },

  computed: {
    ...mapState(['name']),

    progress() {
      const maxSteps = 3

      return this.step / maxSteps
    }
  },

  methods: {
    ...mapActions(['updateName']),
    persistSettings() {
      this.$store.dispatch('sessions/addSession', {
        uuid: this.uuid,
        name: this.sessionName,
        admin: this.admin
      })

      this.step++
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
