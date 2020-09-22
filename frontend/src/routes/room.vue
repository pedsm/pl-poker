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
                <TableCard v-for="member in membersOnTable"
                    v-bind:key="member.id"
                    v-bind:member="member">
                </TableCard>
            </div>
        </div>
        <Hand/>
    </div>
</template>

<script>
import config from '../config'
import Hand from '../components/Hand'
import TableCard from '../components/TableCard'

export default {
    name: 'room',
    components: {
        Hand,
        TableCard,
    },
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

.spread {
    justify-content: space-between !important;
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
</style>