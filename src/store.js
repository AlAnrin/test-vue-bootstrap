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
        async updateFiles({ commit }) {
            commit('updateFiles');
            console.log
        },
        async loadFile({ commit }) {
            commit('loadFile')
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
            const url = `${state.baseUrl}/dirs`
            const response = await fetch(url, {
                headers: {
                    "authorization": state.token
                }
            });

            const data = await response.json();
            state.data = [...data.data];
            console.log
        },
        async updateFiles(state) {
            const dir = state.currentDirectory;
            const url = `${state.baseUrl}/dirs/files?dir_id=${dir.id}`
            const response = await fetch(url, {
                headers: {
                    "authorization": state.token
                }
            });

            const data = await response.json();
            state.currentDirectory.files = [...data.data];
            console.log
        },
        async loadFile(state) {
            const dir = state.currentDirectory;
            const file = state.currentFile;
            const url = `${state.baseUrl}/dirs/files?dir_id=${dir.id}&id=${file.id}`
            const response = await fetch(url, {
                headers: {
                    "authorization": state.token
                }
            });

            const data = await response.json();
            state.currentFile.content = data.content;
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