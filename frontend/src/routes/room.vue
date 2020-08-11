<template>
    <div id="room">
        <input @keyup="changeName" type="text" value="Jeff">
        <h1>Room: {{$route.params.room}}</h1>
        <h2>Ppl in the room</h2>
        <div class="hand">
            <div v-for="member in $store.getters.getMembers" :key="member.id">
                {{member.name}}
                <br>
                {{$store.getters.getDeck[member.card]}}
            </div>
        </div>
        <h2>Hand:</h2>
        <div class="hand">
            <div class="card" v-for="(card, index) in $store.getters.getDeck" :key="card" @click="pickCard(index)">
                {{card}}
            </div>
        </div>
        <div class="hand">
            <div class="bt" @click="pickUp">Pick up card</div>
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
        },
        pickCard(index) {
            this.$socket.emit('pickCard', index)
        },
        pickUp() {
            this.$socket.emit('pickCard', null)
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
    cursor: pointer;
    width: 4rem;
    padding: 3rem 1rem;
    margin: 5px;
    border: 2px solid black;
    font-size: 2rem;
}

.card:hover {
    transition-duration: 0.1s;
    box-shadow: 0px 0px 0px 2px rgba(0,0,0,0.75);
    transform: scale(1.1);

}

</style>