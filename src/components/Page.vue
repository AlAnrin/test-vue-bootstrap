<template>
    <div>
        <div class="high-row">
            <b-icon-arrow-left @click="back" v-b-tooltip.hover title="Назад к списку файлов"
                               class="h3 rounded-circle back-icon"></b-icon-arrow-left>
            <b-form-input v-model="currentFile.filename" @keyup="changeFileName"></b-form-input>
            <b-icon-cloud-upload @click="save" v-b-tooltip.hover title="Сохранить файл"
                                 class="h3 rounded-circle back-icon"></b-icon-cloud-upload>
        </div>
        <b-button-toolbar class="toolbar-row">
            <b-button-group class="mr-1">
                <b-button @click="undo" v-b-tooltip.hover title="Отменить"
                          v-bind:disabled="index <= 0">
                    <b-icon icon="arrow90deg-left" aria-hidden="true"></b-icon>
                </b-button>
            </b-button-group>
            <b-button-group>
                <b-button @click="() => changeTextAlign('left')">
                    <b-icon icon="text-left" aria-hidden="true"></b-icon>
                </b-button>
                <b-button @click="() => changeTextAlign('center')">
                    <b-icon icon="text-center" aria-hidden="true"></b-icon>
                </b-button>
                <b-button @click="() => changeTextAlign('right')">
                    <b-icon icon="text-right" aria-hidden="true"></b-icon>
                </b-button>
            </b-button-group>
            <b-button-group>
                <b-button title="Bold" @click="toBold">
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
        <div id="editableDiv" class="editable textarea"
             v-html="currentFile.content"
             @keyup="event => checkEnter(event)"
             contenteditable="true">
        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "Page",
        data() {
            return {
                index: 0,
                story: []
            }
        },
        computed: {
            currentFile() {
                return this.$store.state.currentFile
            }
        },
        methods: {
            ...mapActions([
                'changeCurrentFile',
                'renameFile',
                'updateFile',
            ]),
            back() {
                this.changeCurrentFile({id: -1})
            },
            undo() {
                this.index--;
                this.currentFile.content = this.story[this.index];
                this.story.length = this.index;
            },
            save() {
                const editableDiv = document.getElementById('editableDiv');
                const innerHtml = editableDiv.innerHTML;
                this.updateFile(innerHtml)
            },
            changeFileName(event) {
                if (event.key === 'Enter')
                    this.renameFile(this.currentFile.filename)
            },
            toBold() {
                // const editableDiv = document.getElementById('editableDiv');
                // const innerHtml = editableDiv.innerHTML;
                // const innerText = editableDiv.innerText;
                // const selected = window.getSelection().toString();
            },
            changeTextAlign(type) {
                const editableDiv = document.getElementById('editableDiv');
                editableDiv.style.textAlign = type;
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