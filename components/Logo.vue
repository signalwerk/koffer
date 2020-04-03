<template>
  <div class="post-it">
    <span v-if="isEditing">📝</span>
    <span v-else>👋</span>
    <input
      ref="form_input"
      v-if="isEditing"
      @keydown.enter="toggleInput"
      type="text"
    />
    <button v-else @click="toggleInput" type="button">
      Hello
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEditing: false
    }
  },
  methods: {
    toggleInput(event) {
      this.isEditing = !this.isEditing
      if (this.isEditing) {
        this.$nextTick(() => this.$refs.form_input.focus())
      }
    }
  }
}
</script>

<style scoped lang="scss">
input,
button {
  display: block;
  font-size: inherit;
  appearance: none;
  background: transparent;
  border: none;
}
.post-it {
  $size: 300px;

  font-size: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: $size;
  height: $size;
  margin: 0 auto;
  color: black;
  background: palegoldenrod;
  clip-path: polygon(
    0px 0px,
    25% 0,
    2% 33%,
    35% 0,
    100% 0px,
    100% 100%,
    0px 100%
  );
}
</style>
