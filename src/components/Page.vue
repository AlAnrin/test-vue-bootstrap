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
            getCaretCharacterOffsetWithin(element) {
                var start = 0;
                var end = 0;
                var doc = element.ownerDocument || element.document;
                var win = doc.defaultView || doc.parentWindow;
                var sel;
                if (typeof win.getSelection != "undefined") {
                    sel = win.getSelection();
                    if (sel.rangeCount > 0) {
                        var range = win.getSelection().getRangeAt(0);
                        var preCaretRange = range.cloneRange();
                        preCaretRange.selectNodeContents(element);
                        preCaretRange.setEnd(range.startContainer, range.startOffset);
                        start = preCaretRange.toString().length;
                        preCaretRange.setEnd(range.endContainer, range.endOffset);
                        end = preCaretRange.toString().length;
                    }
                } else if ( (sel = doc.selection) && sel.type != "Control") {
                    var textRange = sel.createRange();
                    var preCaretTextRange = doc.body.createTextRange();
                    preCaretTextRange.moveToElementText(element);
                    preCaretTextRange.setEndPoint("EndToStart", textRange);
                    start = preCaretTextRange.text.length;
                    preCaretTextRange.setEndPoint("EndToEnd", textRange);
                    end = preCaretTextRange.text.length;
                }
                return { start: start, end: end };
            },
            getPositionInHTMLByTextCurr(html, text, start) {
                let j = 0;
                for (let i = 0; i < text.length; i++) {
                    if (i < start) {
                        const t = text[i];
                        const h = html[j];
                        if (t !== h) {
                            start++;
                            i--;
                        }
                        j++;
                    }
                }
                return start;
            },
            toBold() {
                const editableDiv = document.getElementById('editableDiv');
                const innerHtml = editableDiv.innerHTML;
                console.log(innerHtml)
                const innerText = editableDiv.innerText;
                console.log(innerText)
                const curr = this.getCaretCharacterOffsetWithin(editableDiv);
                console.log(curr.start);
                console.log(curr.end);
                const sel = window.getSelection().toString();
                const trueStart = this.getPositionInHTMLByTextCurr(innerHtml, innerText, curr.start);
                const start = innerHtml.substring(0, trueStart);
                console.log(start);
                const end = innerHtml.substring(trueStart + sel.length);
                console.log(end);
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