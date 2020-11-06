import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        baseUrl: 'http://127.0.0.1:7000/api',
        token: null,
        fio: null,
        data: undefined,
        currentDirectory: { id: -1 },
        currentFile: { id: -1 }
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
        async updateData({ commit }) {
            commit('updateData');
            console.log
        },
        changeData({ commit }, lists) {
            commit('changeData', {
                lists
            });
            console.log
        },
        changeCurrentDirectory({ commit }, currDir) {
            commit('changeCurrentDirectory', {
                currDir
            });
            console.log
        },
        changeCurrentFile({ commit }, currFile) {
            commit('changeCurrentFile', {
                currFile
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
        changeCurrentDirectory(state, {currDir}) {
            state.currentDirectory = currDir
        },
        changeCurrentFile(state, {currFile}) {
            state.currentFile = currFile
        },
        async updateData(state) {
            const url = `${state.baseUrl}/files`
            const response = await fetch(url, {
                headers: {
                    "authorization": state.token
                }
            });

            const data = await response.json();
            state.data = [...data.data];
            console.log
        },
    },
    plugins: [
        // store => {
        //     store.subscribe(async (mutation, {token}) => {
        //         if (mutation.type === 'changeToken') {
        //             await this.actions.updateData()
        //         }
        //     })
        // }
    ]
})