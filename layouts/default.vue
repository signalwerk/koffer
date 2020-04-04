<template>
  <div>
    <nuxt />
  </div>
</template>

<style>
html,
body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}

* {
  box-sizing: border-box;
}

h1,
h2,
p {
  margin-top: 0;
  margin-bottom: 20px;
}

input {
  border-radius: 2px;
  width: 350px;
  padding: 10px;
  border: 1px solid #0089f1;

  margin-bottom: 20px;
}

.button {
  border-radius: 2px;
  width: 350px;
  padding: 10px;
  background-color: #0089f1;
  border: 1px solid #0089f1;

  text-transform: uppercase;
  color: #fff;
  font-weight: 700;
  box-shadow: 0 3px 8px -4px rgba(0, 0, 0, 0.75);

  margin-bottom: 20px;

  cursor: pointer;
}
.text-button {
  color: #0089f1;
  font-weight: 700;
  background: none;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
}
</style>
