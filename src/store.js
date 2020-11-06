import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        baseUrl: 'http://127.0.0.1:7000/api',
        token: null,
        fio: null,
        data: undefined
    },
    actions: {
        changeFio({ commit }, fio) {
            commit('changeFio', {
                fio
            });
            console.log
        },
        changeToken({ commit }, token) {
            commit('changeToken', {
                token
            });
            console.log
        },
        changeData({ commit }, lists) {
            commit('changeData', {
                lists
            });
            console.log
        },
    },
    mutations: {
        changeFio(state, { fio }) {
            state.fio = fio;
        },
        changeToken(state, { token }) {
            state.token = token;
        },
        changeData(state, { lists }) {
            state.data = [...lists.data];
        },
    },
    plugins: [

    ]
})