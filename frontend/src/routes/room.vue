<template>
    <div id="room">
        <header class="row spread">
            <h1>Room: {{$route.params.room}}</h1>
            <input @change="changeName" type="text" value="Jeff">
        </header>
        <div class="table">
            <div>
                <ul class="rightFloat">
                    <li v-for="member in $store.getters.members" :key="member.id">
                        <span :class="member.id !== me.id || 'b'">
                            <i class="fa fa-user"></i> {{member.name}}
                        </span>
                    </li>
                </ul>
            </div>
            <div class="row">
                <div v-for="member in membersOnTable" :key="member.id">
                    <div class="card mini">
                        <span style="color:white" v-if="member.hidden">
                            H 
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
            </div>
        </div>
        <div>
            <div class="hand">
                <div class="bt" @click="pickUp">Pick up card</div>
                <div class="bt" @click="flipCard">
                    <template v-if="true || me.hidden">
                        Show
                    </template>
                    <template v-else>
                        Hide
                    </template>
                    Card
                </div>
            </div>
            <div class="hand">
                <div class="card grow" v-for="(card, index) in $store.getters.deck" :class="index != me.card || 'active'" :key="card" @click="pickCard(index)">
                    {{card}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import config from '../config'

export default {
    name: 'room',
    created() {
        console.log(config.API_URL)
        const {room} = this.$route.params
        this.$socket.emit('join', room)
    },
    computed: {
        socket() {
            return this.$socket
        },
        me() {
            return this.$store.getters.members
                .find(mem => mem.id == this.$socket.id)
        },
        membersOnTable() {
            return this.$store.getters.members
                .filter(mem => mem.card != null)
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
li {
    list-style-type: none;
    padding-bottom: 2px;
}
.rightFloat {
    position: absolute;
    right: 0px;
    top: 2em;
    padding: 20px;
    text-align:left;
    width: 130px;
}

#room {
    height:100vh;
    width: 100vw;
    padding: 0;
    display: grid;
    grid-template-rows: 64px auto 250px;
}

.table {
    text-align: center;
    margin:auto;
    height: auto;
    width: 100%;
}

.row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.spread {
    justify-content: space-between !important;
}

.hand {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}
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

.grow:hover {
    transition-duration: 0.1s;
    box-shadow: 0px 0px 0px 2px rgba(0,0,0,0.75);
    transform: scale(1.1) translate(0,-10px);
}

.mini {
    font-size: 1em !important;
}

.active {
    background-color: steelblue;
    color:white;
}
</style>