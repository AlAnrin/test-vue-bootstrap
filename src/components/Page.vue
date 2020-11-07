<template>
    <div>
        <b-icon-arrow-left @click="back"
                class="back-icon"></b-icon-arrow-left>
        <b-form-textarea
                class="textarea"
                v-model="currentFile.content"
        ></b-form-textarea>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "Page",
        computed: {
            currentFile() {
                return this.$store.state.currentFile
            }
        },
        methods: {
            ...mapActions([
                'changeCurrentFile'
            ]),
            back() {
                this.changeCurrentFile({id: -1})
            }
        }
    }
</script>

<style scoped>
    .back-icon {
        position: absolute;
        top: 65px;
        left: 15px;
    }
    .textarea {
        resize: none;
        margin-left: 45px;
        width: calc(100vw - 45px);
        height: calc(100vh - 65px);
    }
</style>