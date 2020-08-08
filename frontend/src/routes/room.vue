<template>
    <h1>Room: {{$route.params.room}}</h1>
</template>

<script>
export default {
    name: 'room',
    created() {
        const {room} = this.$route.params
        console.log(`Joining room ${room}`)
        this.$socket.emit('join', room)
    }
}
</script>