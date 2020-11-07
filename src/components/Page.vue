<template>
    <div>
        <div class="high-row">
            <b-icon-arrow-left @click="back"
                               class="h3 rounded-circle back-icon"></b-icon-arrow-left>
            <b-form-input v-model="currentFile.filename"></b-form-input>
        </div>
        <b-button-toolbar class="toolbar-row">
            <b-button-group class="mr-1">
                <b-button title="Align left">
                    <b-icon icon="text-left" aria-hidden="true"></b-icon>
                </b-button>
                <b-button title="Align center">
                    <b-icon icon="text-center" aria-hidden="true"></b-icon>
                </b-button>
                <b-button title="Align right">
                    <b-icon icon="text-right" aria-hidden="true"></b-icon>
                </b-button>
            </b-button-group>
            <b-button-group>
                <b-button title="Bold">
                    <b-icon icon="type-bold" aria-hidden="true"></b-icon>
                </b-button>
                <b-button title="Italic">
                    <b-icon icon="type-italic" aria-hidden="true"></b-icon>
                </b-button>
                <b-button title="Underline">
                    <b-icon icon="type-underline" aria-hidden="true"></b-icon>
                </b-button>
                <b-button title="Strikethrough">
                    <b-icon icon="type-strikethrough" aria-hidden="true"></b-icon>
                </b-button>
            </b-button-group>
        </b-button-toolbar>
        <div class="editable textarea"
             v-html="currentFile.content"
             contenteditable="true">
<!--            {{currentFile.content}}-->
        </div>
<!--        <b-form-textarea-->
<!--                class="textarea"-->
<!--                v-model="currentFile.content"-->
<!--        ></b-form-textarea>-->
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

<style lang="scss" scoped>
    @import "../ex.variables";
    .high-row {
        display: flex;
        flex-direction: row;
        margin: 10px;
        width: calc(100vw - 25px);
    }
    .toolbar-row {
        margin: 10px;
        width: calc(100vw - 25px);
    }
    .back-icon {
        color: $dark-color !important;
        background: $light;
        margin: 5px;
        padding: 3px;
    }
    .back-icon:hover {
        color: $light-color !important;
        background: $dark;
    }
    .textarea {
        resize: none;
        width: calc(100vw - 25px);
        height: calc(100vh - 175px) !important;
        margin: 10px
    }
</style>