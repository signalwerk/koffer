<template>
  <div class="page-section-container">
    <page-section>
      <h1>I'm a landing page</h1>
      <nuxt-link to="/create" tag="button" class="button button--primary">
        Create a session
      </nuxt-link>
    </page-section>
  </div>
</template>

<script>
import PageSection from '~/components/PageSection.vue'

export default {
  components: { PageSection }
}
</script>
