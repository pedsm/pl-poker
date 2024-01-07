<template>
  <c-box id="app">
    <c-box padding="1em" bg="yellow.300" class="banner" v-if="showMoveBanner">
      ⚠
      <c-link fontWeight="bold" color="blue.600" :href="prodUrl">
        Hey we are moving! Heroku is dropping their free tier, so we are going
        somewhere else. 
        So we got a proper domain
        Click here to go there (and make sure to bookmark it as this URL will be
        gone soon)
      </c-link>
      <br />
      <c-link
        target="_blank"
        fontWeight="bold"
        color="blue.600"
        href="https://ko-fi.com/pedsm"
      >
        And if you're still reading... You can support the new domain here
      </c-link>
    </c-box>
    <router-view></router-view>
    <c-box textAlign="right" :backgroundColor="$mode('blue.100', 'gray.900')" padding="0.5em">
      <c-link href="https://ko-fi.com/pedsm/" margin-right="0.5em" is-external>
        <i class="fa fa-glass" aria-hidden="true"></i>
      </c-link>
      <c-link href="https://github.com/pedsm/planning-poker" is-external>
        <i class="fa fa-github" aria-hidden="true"></i>
      </c-link>
    </c-box>
  </c-box>
</template>

<script lang="ts">
import Vue from "vue";
import { CBox, CLink } from "@chakra-ui/vue";

export default Vue.extend({
  name: "App",
  inject: ["$chakraColorMode", "$toggleColorMode"],
  data: () => ({
    showBanner: process.env.VUE_APP_PROD_URL != null,
    prodUrl: process.env.VUE_APP_PROD_URL,
    showMoveBanner: process.env.VUE_APP_IS_HEROKU == "true",
  }),
  components: {
    CBox,
    CLink,
  },
  methods: {
    // @ts-ignore
    toggleMode: () => this.$toggleColorMode,
  },
  computed: {
    colorMode() {
      // @ts-ignore
      return this.$chakraColorMode();
    },
  },
});
</script>

<style>
* {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  align-items: center;
  padding: 0 20px;
}
</style>
