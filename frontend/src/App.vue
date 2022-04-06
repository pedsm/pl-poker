<template>
    <main id="app">
      <header class="banner" v-if="prodUrl">
        You are using the Beta version of planning-poker, <a :href="prodUrl">click here to go to the production version</a>
      </header>
       <router-view></router-view>
    </main>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'App',
    data: () => ({
      showBanner: process.env.VUE_APP_PROD_URL != null,
      prodUrl: process.env.VUE_APP_PROD_URL,
    })
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

.banner {
  background-color: #71c580;
  padding: 1em
}

.banner > a {
  color: #105c7a;
}

#app {
  height:100vh;
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
  background: white;
}
</style>