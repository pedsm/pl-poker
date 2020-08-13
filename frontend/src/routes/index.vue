<template>
  <div>
    <h1>Planning-poker</h1>
    <div>
      <p>
        <input v-model="roomNumber" placeholder="Room name" type="text"/>
        <button v-on:click="joinRoom" class="bt">Enter room</button>
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
      roomNumber: ''
  }),
  methods: {
      joinRoom: function() {
          const {roomNumber} = this;
          if(roomNumber) {
              console.log('Joining room', this.roomNumber)
              return this.$router.push({ name:'room', params: { room: roomNumber } })
          }
          console.log('Room was not provided')
      }
  },
  components: {}
}
</script>

<style scoped>
input {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid black;
}
</style>