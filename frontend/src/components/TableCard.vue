<template>
    <div :key="member.id">
        <c-box class="animate__animated animate__flipInX" :class="member.hidden || 'animate__tada'" backgroundColor="white" animationDuration="1s" w="90px" shadow="md" rounded="lg" p="5">
            <c-text paddingY="30px" fontSize="xl" fontWeight="bold" align="center">
                <span style="color:white" v-if="member.hidden">
                    _ 
                </span>
                <span v-else>
                    {{$store.getters.deck[member.card]}}
                </span>
            </c-text>
        </c-box>
        <c-text marginTop="1em">
            <i class="fa fa-user"></i>
            <span :class="member.id !== me.id || 'b'">
                {{member.name}}
            </span>
        </c-text>
    </div>
</template>
<script>
import { CBox, CText } from "@chakra-ui/vue"

export default {
    name: 'TableCard',
    components: {
        CBox,
        CText,
    },
    props: ['member'],
    computed: {
        me() {
            return this.$store.getters.members
                .find(mem => mem.id == this.$socket.id)
        },
    },
}
</script>

<style scoped>
.mini {
    margin: 0px auto;
    font-size: 1em !important;
}
</style>