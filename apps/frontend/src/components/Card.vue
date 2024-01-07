<template>
  <c-box
    :backgroundColor="active ? 'white' : 'blue.100'"
    animationDuration="1s"
    :class="active ? 'card' : 'card active'"
    w="90px"
    shadow="md"
    rounded="lg"
    p="5"
  >
    <c-light-mode>
      <c-text
        color
        paddingY="30px"
        fontSize="xl"
        fontWeight="bold"
        align="center"
      >
        {{ value }}
      </c-text>
    </c-light-mode>
  </c-box>
</template>
<script lang="ts">
import Vue from "vue";
import { CBox, CText, CLightMode } from "@chakra-ui/vue";
export default Vue.extend({
  name: "Card",
  components: {
    CBox,
    CText,
    CLightMode,
  },
  props: ["value", "active"],
});
</script>

<style>
.grow {
  cursor: pointer;
}
</style>
