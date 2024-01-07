import Vue from 'vue'
// @ts-ignore
import Chakra, { CThemeProvider, CReset, CColorModeProvider, CBox, mode } from '@chakra-ui/vue'


import App from './App.vue'
import VueRouter from 'vue-router'
import store from './store'


import Index from './routes/index.vue' 
import Room from './routes/room.vue'

// Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Chakra, {
  extendTheme: {
    colors: {
      white: () => ({
        color: mode('white', 'black')
      }),
      black: () => ({
        color: mode('black', 'white')
      })
    },
    baseStyles: {
      CBox: () => ({
        bg: mode('white', 'gray.900')
      }),
      CText: () => ({
        color: mode('gray.900', 'white')
      }),
      CFormLabel: () => ({
        color: mode('gray.900', 'white')
      }),
      CInput: () => ({
        color: mode('gray.900', 'white')
      }),
      CIconButton: () => ({
        color: mode('gray.900', 'white')
      }),
      // CButton: () => ({
      //   color: mode('gray.900', 'white')
      // }),
      CLink: () => ({
        color: mode('gray.900', 'white')
      })
    }
  }
})

const routes = [
  { name: 'index', path: '/', component: Index },
  { name: 'room', path: '/r/:room', component: Room }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  router,
  store,
  render: (h) => h(CThemeProvider, [
    h(CColorModeProvider, [
      h(CBox, [
        h(CReset),
        h(App)
      ])
    ])
  ])
}).$mount('#app')

