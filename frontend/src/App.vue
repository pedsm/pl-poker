<template>
    <main id="app">
      <c-box padding="1em" bg="green.300" class="banner" v-if="prodUrl">
       🧪 You are using the Beta version of planning-poker, <c-link fontWeight="bold" color="blue.600" :href="prodUrl">click here to go to the production version</c-link>
      </c-box>
       <router-view></router-view>
       <c-box textAlign="right" backgroundColor="blue.100" padding="0.5em">
        <c-link href="https://github.com/pedsm/planning-poker" is-external>
          <i class="fa fa-github" aria-hidden="true"></i> 
        </c-link>
       </c-box>
    </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { CBox, CLink } from '@chakra-ui/vue'

export default Vue.extend({
    name: 'App',
    data: () => ({
      showBanner: process.env.VUE_APP_PROD_URL != null,
      prodUrl: process.env.VUE_APP_PROD_URL,
    }),
    components: {
      CBox,
      CLink,
    }
})
</script>

<style>
* {
    /* font-family: 'Roboto', sans-serif; */
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;;
}

:root {
  --text: #282828;
  --radius: 8px;
}

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

body {
}

header {
    align-items: center;
    padding: 0 20px;
}

</style>