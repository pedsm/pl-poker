<template>
    <div :key="member.id" class="animate__animated animate__flipInX">
        <div class="card mini animate__animated" :class="member.hidden || 'animate__tada'">
            <span style="color:white" v-if="member.hidden">
                _ 
            </span>
            <span v-else>
                {{$store.getters.deck[member.card]}}
            </span>
        </div>
        <p>
            <i class="fa fa-user"></i>
            <span :class="member.id !== me.id || 'b'">
                {{member.name}}
            </span>
        </p>
    </div>
</template>
<script>
export default {
    name: 'TableCard',
    props: ['member'],
    computed: {
        me() {
            return this.$store.getters.members
                .find(mem => mem.id == this.$socket.id)
        },
    },
}
</script>

<style scoped>
.mini {
    font-size: 1em !important;
}
</style>