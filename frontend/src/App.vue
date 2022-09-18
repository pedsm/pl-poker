<template>
    <main id="app">
      <c-box padding="1em" bg="yellow.300" class="banner" v-if="showMoveBanner">
       ⚠ <c-link fontWeight="bold" color="blue.600" :href="prodUrl">
        Hey we are moving! Heroku is dropping their free tier, so we are going somewhere else. <br/>
        So we got a proper domain<br/> 
        Click here to go there (and make sure to bookmark it as this URL will be gone soon)
      </c-link>
      <br/>
      <c-link target="_blank" fontWeight="bold" color="blue.600" href="https://ko-fi.com/pedsm">
        And if you're still reading... You can support me here
      </c-link>
      </c-box>
       <router-view></router-view>
       <c-box textAlign="right" backgroundColor="blue.100" padding="0.5em">
        <c-link href="https://ko-fi.com/pedsm/" margin-right="0.5em" is-external>
          <i class="fa fa-glass" aria-hidden="true"></i> 
        </c-link>
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
      showMoveBanner: process.env.VUE_APP_IS_HEROKU == "true"
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