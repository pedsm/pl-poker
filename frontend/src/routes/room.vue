<template>
    <div id="room">
        <input @keyup="changeName" type="text" value="Jeff">
        <h1>Room: {{$route.params.room}}</h1>
    </div>
</template>

<script>
export default {
    name: 'room',
    created() {
        const {room} = this.$route.params
        console.log(`Joining room ${room}`)
        // this.$store.commit('socket_join', room)
        this.$socket.emit('join', room)
    },
    methods: {
        changeName(event) {
            const name = event.target.value
            console.log(name)
            this.$socket.emit('changeName', name)
        }
    }
}
</script>