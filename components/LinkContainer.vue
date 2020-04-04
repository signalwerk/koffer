<template>
  <div class="link-container">
    <icon :is-active="true" icon="link" size="medium" />
    <p>
      {{ link }}
    </p>
    <button @click="copyLink" class="text-button">
      Copy link
    </button>
  </div>
</template>

<script>
import Icon from '~/components/Icon'

export default {
  components: { Icon },

  props: {
    link: {
      type: String,
      required: true
    }
  },

  methods: {
    async copyLink() {
      try {
        await this.$copyText(this.link)
        this.$toast.success('Copied', {
          duration: 3000
        })
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
      }
    }
  }
}
</script>

<style lang="scss">
.link-container {
  background-color: #f8f8fc;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 650px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 3px 8px -4px rgba(0, 0, 0, 0.75);

  p,
  button {
    margin: 0;
  }

  p {
    flex: 1 0;
    margin-left: 20px;
    margin-right: 20px;
  }
}
</style>
