<template>
    <div id="room">
        <input @keyup="changeName" type="text" value="Jeff">
        <h1>Room: {{$route.params.room}}</h1>
        <h2>Ppl in the room</h2>
        <div class="hand">
            <div v-for="member in $store.getters.getMembers" :key="member.id">{{member.name}}</div>
        </div>
        <h2>Hand:</h2>
        <div class="hand">
            <div class="card" v-for="card in $store.getters.getDeck" :key="card">{{card}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'room',
    created() {
        const {room} = this.$route.params
        console.log(`Joining room ${room}`)
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

<style scoped>
.hand {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

.card {
    width: 20em;
    padding: 60px 30px;
    margin: 5px;
    border: 1px solid black;
    border-radius: 10px;
}

</style>