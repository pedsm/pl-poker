<template>
  <div id="form">
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
  name: 'Index',
  data: () => ({
      roomNumber: '',
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
* {
  font-weight: 800;
}


#form {
  width: 400px;
  text-align: center;
  margin: 20vh auto;
}
</style>