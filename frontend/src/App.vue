<template>
    <main id="app">
       <router-view></router-view>
    </main>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style>
* {
    font-family: 'Roboto', sans-serif;
}

body {
    margin: 0;
    padding: 0;
}

header {
    align-items: center;
    padding: 0 20px;
}

input[type=text] {
    border: 0;
    border-bottom: 2px black solid;
    padding: 0em;
    height: 3em;
}

.bt {
  color: white;
  background-color: black;
  padding: 10px 20px;
  border: 0;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.b {
  font-weight: 900;
}
</style>