"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(require("vue"));
var App_vue_1 = __importDefault(require("./App.vue"));
var vue_router_1 = __importDefault(require("vue-router"));
var store_1 = __importDefault(require("./store"));
var index_vue_1 = __importDefault(require("./routes/index.vue"));
var room_vue_1 = __importDefault(require("./routes/room.vue"));
// Vue.config.productionTip = false
vue_1.default.use(vue_router_1.default);
var routes = [
    { name: 'index', path: '/', component: index_vue_1.default },
    { name: 'room', path: '/r/:room', component: room_vue_1.default }
];
var router = new vue_router_1.default({
    mode: 'history',
    routes: routes
});
new vue_1.default({
    router: router,
    store: store_1.default,
    render: function (h) { return h(App_vue_1.default); }
}).$mount('#app');
