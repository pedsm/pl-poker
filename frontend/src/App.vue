<template>
    <main id="app">
       <router-view></router-view>
    </main>
</template>

<script>
export default {
    name: 'Room'
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
</style>