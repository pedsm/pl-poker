<template>
    <div class="handContainer">
        <div class="handBts">
            <div class="bt" @click="pickUp">Pick up card</div>
            <div class="bt" @click="flipCard">
                <template v-if="me.hidden == true">
                    Show
                </template>
                <template v-else>
                    Hide
                </template>
                card
            </div>
            <div class="bt" @click="flipAll">Flip all cards</div>
        </div>
        <div class="hand">
            <Card v-for="(card, index) in $store.getters.deck"
                v-bind:key="index"
                v-bind:value="card"
                v-bind:active="index != me.card"
                @click.native="pickCard(index)"
            ></Card>
        </div>
    </div>
</template>
<script lang='ts'>
import Card from './Card.vue';

export default {
    name: 'Hand',
    components: {
        Card,
    },
    computed: {
        me() {
            return this.$store.getters.members
                .find(mem => mem.id == this.$socket.id)
        },
    },
    methods: {
        pickCard(index:number) {
            this.$socket.emit('pickCard', index)
        },
        pickUp() {
            this.$socket.emit('pickCard', null)
        },
        flipCard() {
            this.$socket.emit('flipCard')
        },
        flipAll() {
            this.$socket.emit('flipAll')
        },
    }
}
</script>
<style scoped>
.handContainer {
  display: relative;
}

.handBts {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
}

.hand {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly;
    transition-duration: 1s;
    position: absolute;
    bottom: 10px;
}
.grow:hover {
    transition-duration: 0.1s;
    transform: translate(0,-15px);
}
.active {
    transform: translate(0,-15px);
    text-decoration: underline;
    overflow: hidden;
}
.active::before {
  content: '';
  position: absolute;
  top: 3px;
  right: 3px;
  border-radius: 10px;
  width: 10px;
  height: 10px;
  background-color: steelblue;
}

</style>