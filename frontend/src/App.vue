<template>
    <main id="app">
       <router-view></router-view>
    </main>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'App'
})
</script>

<style>
* {
    /* font-family: 'Roboto', sans-serif; */
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;;
}

:root {
  --text: #282828;
  --radius: 8px;
}

body {
    margin: 0;
    padding: 0;
    overflow: hidden;
}

header {
    align-items: center;
    padding: 0 20px;
}

input[type=text] {
  border: 2px var(--text) solid;
  padding: 1em;
  width: 200px;
}

input {
  border-radius: var(--radius);
}

input:focus-visible {
  border: 2px;
}

.bt {
  color: var(--text);
  padding: 10px 25px;
  border: 2px var(--text) solid;
  font-weight: bold;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  border-radius: var(--radius);
  margin: 5px;
  cursor: pointer;
}
</style>