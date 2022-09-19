<template>
  <c-box id="form" :bg="$mode('white.500', 'gray.900')" :color="$mode('gray.900', 'white.500')" animationDuration="1s" shadow="md" rounded="lg" p="5">
    <c-text :color="$mode('white.500','gray.100')" fontSize="3xl" fontWeight="bold">Planning Poker</c-text>
    <form @submit="joinRoom">
      <c-form-control is-required marginY="1em">
        <c-form-label for="roomName">Room name</c-form-label>
        <c-input
          id="roomName"
          v-model="roomNumber"
          placeholder="Just make one up"
          type="text"
        />
      </c-form-control>
      <c-button
        :isDisabled="roomNumber == ''"
        width="100%"
        variant-color="blue"
        v-on:click="joinRoom"
        >Enter room</c-button
      >
    </form>
  </c-box>
</template>

<script>
import Vue from "vue";
import { CText, CInput, CBox, CButton, CFormControl, CFormLabel } from "@chakra-ui/vue";

export default Vue.extend({
  name: "Index",
  components: {
    CText,
    CInput,
    CBox,
    CButton,
    CFormControl,
    CFormLabel
  },
  data: () => ({
    roomNumber: "",
  }),
  methods: {
    joinRoom: function () {
      const { roomNumber } = this;
      if (roomNumber) {
        console.log("Joining room", this.roomNumber);
        return this.$router.push({
          name: "room",
          params: { room: roomNumber },
        });
      }
      console.log("Room was not provided");
    },
  },
});
</script>

<style scoped>
#form {
  width: 400px;
  margin: auto;
}
</style>
