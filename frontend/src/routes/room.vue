<template>
    <div id="room">
        <header class="row spread">
            <c-text fontSize="3xl" fontWeight="bold">
                {{$route.params.room}}
            </c-text>
            <c-box w="300px" d="flex" justify-content="right">
                <c-input 
                    @change="changeName" 
                    @blur="changeName"
                    type="text" 
                    placeholder="Enter your name..." 
                    class="animate__animated animate__heartBeat animate__repeat-2"
                    width="200px"
                    mr="1em"
                />
                <room-settings></room-settings>
            </c-box>
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
                    <li v-if="watchers.length > 0">
                      <c-text>
                        <i class="fa fa-eye"></i>{{' '}}{{watchers.length}} 
                        Watching
                    </c-text>
                    </li>
                    <li v-for="member in $store.getters.members.filter(mem => mem.name != '')" :key="member.id">
                        <c-text :class="member.id !== me.id || 'b'">
                            <i class="fa fa-user"></i> 
                            <template v-if="member.name">{{' '}}{{member.name}}</template>
                            <template v-else> No name</template>
                        </c-text>
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
import RoomSettings from '@/components/RoomSettings.vue'
import TableCard from '../components/TableCard.vue'
import { TargetEvent } from '../types'
import { CText, CInput, CBox } from "@chakra-ui/vue"
import Vue from 'vue'

export default Vue.extend({
    name: 'room',
    components: {
        Hand,
        TableCard,
        CInput,
        CText,
        RoomSettings,
        CBox,
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
    padding-left: 0;
    text-align:left;
    width: 130px;
}

.spread {
    justify-content: space-between !important;
}

#room {
    height:100%;
    width: 100vw;
    padding: 0;
    display: grid;
    grid-template-rows: 64px auto 240px;
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
}

</style>