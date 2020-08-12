<template>
    <div id="room">
        <input @keyup="changeName" type="text" value="Jeff">
        <h1>Room: {{$route.params.room}}</h1>
        <h2>Ppl in the room</h2>
        <div class="hand">
            <div v-for="member in $store.getters.members" :key="member.id">
                {{member.name}}
                <br>
                <div v-if="member.card" class="card mini">
                    <span v-if="member.hidden">
                        H 
                    </span>
                    <span v-else>
                        {{$store.getters.deck[member.card]}}
                    </span>
                </div>
            </div>
        </div>
        <h2>Hand:</h2>
        <div class="hand">
            <div class="card" v-for="(card, index) in $store.getters.deck" :class="index != me.card || 'active'" :key="card" @click="pickCard(index)">
                {{card}}
            </div>
        </div>
        <div class="hand">
            <div class="bt" @click="pickUp">Pick up card</div>
            <div class="bt" @click="flipCard">Flip card</div>
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
    computed: {
        socket() {
            return this.$socket
        },
        me() {
            return this.$store.getters.members
                .find(mem => mem.id == this.$socket.id)
        }
    },
    methods: {
        changeName(event) {
            const name = event.target.value
            this.$socket.emit('changeName', name)
        },
        pickCard(index) {
            this.$socket.emit('pickCard', index)
        },
        flipCard() {
            this.$socket.emit('flipCard')
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
    width: 2em;
    padding: 2em 1em;
    margin: 5px;
    border: 2px solid black;
    font-size: 2em;
}

.card:hover {
    transition-duration: 0.1s;
    box-shadow: 0px 0px 0px 2px rgba(0,0,0,0.75);
    transform: scale(1.1);

}

.mini {
    font-size: 1em !important;
}

.active {
    background-color: steelblue;
    color:white;
}

</style>