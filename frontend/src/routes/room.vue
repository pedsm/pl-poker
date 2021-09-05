<template>
    <div id="room">
        <header class="row spread">
            <h1>{{$route.params.room}}</h1>
            <input 
                @change="changeName" 
                type="text" 
                placeholder="Enter your name..." 
                class="animate__animated animate__heartBeat animate__repeat-2"
            />
        </header>
        <div class="table">
            <div class="row">
                <TableCard v-for="member in membersOnTable"
                    v-bind:key="member.id"
                    v-bind:member="member">
                </TableCard>
            </div>
            <div>
                <ul class="rightFloat">
                    <li v-if="watchers.length > 0"><i class="fa fa-eye"></i>{{' '}}{{watchers.length}} 
                      Watching
                    </li>
                    <li v-for="member in $store.getters.members.filter(mem => mem.name != '')" :key="member.id">
                        <span :class="member.id !== me.id || 'b'">
                            <i class="fa fa-user"></i> 
                            <template v-if="member.name">{{' '}}{{member.name}}</template>
                            <template v-else> No name</template>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        <Hand v-if="onTable"/>
    </div>
</template>

<script lang='ts'>
import config from '../config'
import Hand from '../components/Hand.vue'
import TableCard from '../components/TableCard.vue'
import { TargetEvent } from '../types'
import Vue from 'vue'

export default Vue.extend({
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
        watchers() {
          return this.$store.getters.members 
            .filter(mem => mem.name == '')

        },
        membersOnTable() {
            return this.$store.getters.members
                .filter(mem => mem.card != null)
        },
        onTable() {
            if(this.me == null) {
                return false
            }
            return this.me.name != ''
        }
    },
    methods: {
        changeName(event:TargetEvent) {
            const name = event.target.value
            this.$socket.emit('changeName', name)
        },
    }
})
</script>

<style scoped>
li {
    list-style-type: none;
    padding-bottom: 2px;
}
.rightFloat {
    /* position: absolute; */
    /* right: 0px; */
    /* top: 2em; */
    /* padding: 20px; */
    padding-left: 0;
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
    grid-template-rows: 64px auto 220px;
}

.table {
    display: grid;
    grid-template-columns: auto 150px;
    text-align: center;
    height: auto;
    width: 100%;
}

.table > .row {
  margin: auto;
  width: 100%;
}

.row {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-around;
    /* justify-content; */
}

.row > div {
  width: 150px;
}

</style>