<template>
  <div class="post-it">
    👋
    <br />
    Hello
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style scoped>
.post-it {
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  color: black;
  background: palegoldenrod;
  clip-path: polygon(
    0px 0px,
    30px 0,
    10px 30px,
    50px 0,
    100% 0px,
    100% 100%,
    0px 100%
  );
}
</style>
