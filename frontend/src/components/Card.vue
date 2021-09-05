<template>
    <div class="card grow" :class="active || 'active'">
        {{value}}
    </div>
</template>
<script lang='ts'>
import Vue from 'vue'
export default Vue.extend({
    name: 'Card',
    props: ['value', 'active']
})
</script>

<style>
.card {
    width: 2em;
    padding: 2em 1em;
    margin: 5px;
    border: 2px solid var(--text);
    border-radius: var(--radius);
    background-color: white;
    font-weight: bold;
    font-size: 1.5em;
    text-align: center;
    filter: drop-shadow(rgba(0, 0, 0, 0.067) 0px 1px 6px);
}

.grow {
    cursor: pointer;
}
</style>