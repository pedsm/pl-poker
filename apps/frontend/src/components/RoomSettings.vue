<template>
    <div>
        <c-icon-button aria-label="Open settings" @click="isOpen = true" icon="chevron-left" />

        <c-drawer :isOpen="isOpen" placement="right" :on-close="close" :initialFocusRef="() => $refs.inputInsideModal">
            <c-drawer-overlay />
            <c-drawer-content>
                <c-drawer-close-button />
                <c-drawer-header>Room settings</c-drawer-header>

                <c-drawer-body>
                    <c-select @change="changeDeck" :spacing="3" :value="selectedDeck.toString()">
                        <option v-for="(item, index) in availableDecks" v-bind:key="index" v-bind:value="index">
                            {{`${item.name} (${item.cards})`}}
                        </option>
                    </c-select>
                </c-drawer-body>

                <c-drawer-footer>
                    <c-button variant-color="blue" mr="3" @click="isOpen = false">Close</c-button>
                </c-drawer-footer>
            </c-drawer-content>
        </c-drawer>
    </div>
</template>

<script lang="ts">
import {
    CDrawer,
    CDrawerBody,
    CDrawerFooter,
    CDrawerHeader,
    CDrawerOverlay,
    CDrawerContent,
    CDrawerCloseButton,
    CButton,
    CIconButton,
    CSelect,
} from '@chakra-ui/vue';
import Vue from 'vue'

export default Vue.extend({
    name: 'roomSettings',
    components: {
        CButton,
        CDrawer,
        CIconButton,
        CDrawerBody,
        CDrawerFooter,
        CDrawerHeader,
        CDrawerOverlay,
        CDrawerContent,
        CSelect,
        CDrawerCloseButton,
    },
    data() {
        return {
            isOpen: false
        }
    },
    methods: {
        close() {
            this.isOpen = false
        },
        changeDeck(newDeckIndex) {
            this.$socket.emit('changeDeck', newDeckIndex)
        }
    },
    computed: {
        availableDecks() {
            return this.$store.getters.availableDecks
        },
        selectedDeck() {
            return this.$store.getters.room?.selectedDeck ?? 0
        }
    },
    // methods: { }
})
</script>