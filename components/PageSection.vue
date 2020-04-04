<template>
  <section class="page-section">
    <slot></slot>
  </section>
</template>

<style>
.page-section {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
}
</style>
