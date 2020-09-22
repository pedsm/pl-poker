<template>
    <div class="card grow" :class="active || 'active'">
        {{value}}
    </div>
</template>
<script>
export default {
    name: 'Card',
    props: ['value', 'active']
}
</script>

<style>
.card {
    width: 2em;
    padding: 2em 1em;
    margin: 5px;
    border: 2px solid black;
    background-color: white;
    font-size: 1.5em;
    text-align: center;
}

.grow {
    cursor: pointer;
}
</style>