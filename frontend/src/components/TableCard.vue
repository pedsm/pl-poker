<template>
  <c-light-mode>
    <div :key="member.id">
      <c-box
        class="animate__animated animate__flipInX"
        :class="member.hidden || 'animate__tada'"
        backgroundColor="white"
        animationDuration="1s"
        w="90px"
        shadow="md"
        rounded="lg"
        p="5"
      >
        <c-text paddingY="30px" fontSize="xl" fontWeight="bold" align="center">
          <c-text style="color: white" v-if="member.hidden"> _ </c-text>
          <c-text style="color: black" v-else>
            {{ $store.getters.deck[member.card] }}
          </c-text>
        </c-text>
      </c-box>
      <c-text marginTop="1em">
        <i class="fa fa-user"></i>
        <span :class="member.id !== me.id || 'b'">
          {{ member.name }}
        </span>
      </c-text>
    </div>
  </c-light-mode>
</template>
<script>
import { CBox, CText, CLightMode } from "@chakra-ui/vue";

export default {
  name: "TableCard",
  components: {
    CBox,
    CText,
    CLightMode,
  },
  props: ["member"],
  computed: {
    me() {
      return this.$store.getters.members.find(
        (mem) => mem.id == this.$socket.id
      );
    },
  },
};
</script>

<style scoped>
.mini {
  margin: 0px auto;
  font-size: 1em !important;
}
</style>
