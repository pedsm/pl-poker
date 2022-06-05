<template>
    <div>
        <c-icon-button aria-label="Open settings" @click="isOpen = true" icon="chevron-left" />

        <c-drawer :isOpen="isOpen" placement="right" :on-close="close" :initialFocusRef="() => $refs.inputInsideModal">
            <c-drawer-overlay />
            <c-drawer-content>
                <c-drawer-close-button />
                <c-drawer-header>Room settings</c-drawer-header>

                <c-drawer-body>
                    <c-input ref="inputInsideModal" placeholder="Type here..." />
                    <h1>Something?</h1>
                </c-drawer-body>

                <c-drawer-footer>
                    <c-button variant="outline" mr="3" @click="isOpen = false">Cancel</c-button>
                    <c-button variant-color="blue">Save</c-button>
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
    CInput,
    CIconButton,
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
        CInput,
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
        }
    },
    computed: {
    },
    // methods: { }
})
</script>