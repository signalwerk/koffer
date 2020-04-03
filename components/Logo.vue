<template>
  <div class="post-it">
    <span v-if="isEditing">📝</span>
    <span v-else>👋</span>
    <input
      ref="form_input"
      v-if="isEditing"
      @keydown.enter="setText"
      :placeholder="[[text]]"
      type="text"
    />
    <button v-else @click="editText" type="button">
      {{ text }}
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEditing: false,
      text: 'Hellou!'
    }
  },
  methods: {
    setText(event) {
      this.text = event.target.value
      this.isEditing = false
    },
    editText(event) {
      this.isEditing = true
      this.$nextTick(() => this.$refs.form_input.focus())
    }
  }
}
</script>

<style scoped lang="scss">
* {
  box-sizing: border-box;
}
span {
  font-size: 72px;
}
input,
button {
  display: block;
  margin: 20px;
  width: 100%;
  text-align: center;
  font-size: inherit;
  appearance: none;
  background: transparent;
  border: none;
}
input {
  outline: 1px dashed white;
}
.post-it {
  $size: 210px;

  font-size: 36px;
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
