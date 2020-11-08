<template>
    <div>
        <div class="high-row">
            <b-icon-arrow-left @click="back"
                               class="h3 rounded-circle back-icon"></b-icon-arrow-left>
            <b-form-input v-model="currentFile.filename"></b-form-input>
        </div>
        <b-button-toolbar class="toolbar-row">
            <b-button-group class="mr-1">
                <b-button title="Undo" @click="undo" v-bind:disabled="index <= 0">
                    <b-icon icon="arrow90deg-left" aria-hidden="true"></b-icon>
                </b-button>
            </b-button-group>
            <b-button-group>
                <b-button title="Align left" @click="() => changeTextAlign('left')">
                    <b-icon icon="text-left" aria-hidden="true"></b-icon>
                </b-button>
                <b-button title="Align center" @click="() => changeTextAlign('center')">
                    <b-icon icon="text-center" aria-hidden="true"></b-icon>
                </b-button>
                <b-button title="Align right" @click="() => changeTextAlign('right')">
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
                'changeCurrentFile'
            ]),
            back() {
                this.changeCurrentFile({id: -1})
            },
            undo() {
                this.index--;
                this.currentFile.content = this.story[this.index];
                this.story.length = this.index;
            },
            getCaretCharacterOffsetWithin(element) {
                let start = 0;
                let end = 0;
                const doc = element.ownerDocument || element.document;
                const win = doc.defaultView || doc.parentWindow;
                let sel;
                if (typeof win.getSelection != "undefined") {
                    sel = win.getSelection();
                    if (sel.rangeCount > 0) {
                        const range = win.getSelection().getRangeAt(0);
                        const preCaretRange = range.cloneRange();
                        preCaretRange.selectNodeContents(element);
                        preCaretRange.setEnd(range.startContainer, range.startOffset);
                        start = preCaretRange.toString().length;
                        preCaretRange.setEnd(range.endContainer, range.endOffset);
                        end = preCaretRange.toString().length;
                    }
                } else if ( (sel = doc.selection) && sel.type != "Control") {
                    const textRange = sel.createRange();
                    const preCaretTextRange = doc.body.createTextRange();
                    preCaretTextRange.moveToElementText(element);
                    preCaretTextRange.setEndPoint("EndToStart", textRange);
                    start = preCaretTextRange.text.length;
                    preCaretTextRange.setEndPoint("EndToEnd", textRange);
                    end = preCaretTextRange.text.length;
                }
                return { start: start, end: end };
            },
            checkEnter(event) {
                if (event.key === 'Enter') {
                    this.story.push(this.currentFile.content);
                    this.index++;
                    const elem = event.currentTarget.innerHTML;
                    this.currentFile.content = elem;
                }
            },
            getPositionInHTMLByTextCurr(html, text, start) {
                let j = 0;
                for (let i = 0; i < text.length; i++) {
                    if (i < start) {
                        const t = text[i];
                        const h = html[j];
                        if (t !== h) {
                            start++;
                            j++;
                            i--;
                        }
                    }
                    j++;
                }
                return start;
            },
            toBold() {
                const editableDiv = document.getElementById('editableDiv');
                const innerHtml = editableDiv.innerHTML;
                const innerText = editableDiv.innerText;
                let { start, end } = this.getCaretCharacterOffsetWithin(editableDiv)
                const selected = window.getSelection().toString();
                if(selected) {
                    start = this.getPositionInHTMLByTextCurr(innerHtml, innerText, start);

                    const startStr = this.currentFile.content.substring(0, start);
                    const endStr = this.currentFile.content.substring(end,
                        this.currentFile.content.length);
                    this.story.push(this.currentFile.content);
                    this.index++;
                    this.currentFile.content = startStr + '<b>' + selected + '</b>' + endStr;
                }
            },
            changeTextAlign(type) {

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