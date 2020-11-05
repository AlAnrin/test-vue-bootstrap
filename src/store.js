import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        baseUrl: 'http://127.0.0.1:7000/api',
        token: null
    },
    actions: {
        changeToken({ commit }, lists) {
            commit('changeToken', {
                lists
            });
            console.log
        },

    },
    mutations: {
        changeToken(state, { lists }) {
            state.token = lists;
        },
    },
    plugins: [

    ]
})