<template>
    <div class="wrapper">
        <b-list-group class="transition-width-list-left">
            <b-button-toolbar class="toolbar-row">
                <b-button-group class="mr-1">
                    <b-button title="Add" @click="addPart">
                        <b-icon icon="folder-plus" aria-hidden="true"></b-icon>
                    </b-button>
                    <b-button title="Refresh" @click="refreshParts">
                        <b-icon icon="arrow-clockwise" aria-hidden="true"></b-icon>
                    </b-button>
                </b-button-group>
            </b-button-toolbar>
            <b-list-group-item v-for="fol in data"
                               v-bind:key="fol.id"
                               :active="currentDirectory.id === fol.id"
                               @click="() => selectDirectory(fol)"
                               class="item-list"
                               button>
                <b>{{fol.name_part}}</b>
            </b-list-group-item>
        </b-list-group>

        <b-card v-if="currentDirectory.id !== -1"
                class="content">
            <b-card-header>
                <div class="row-list">
                    <h3 v-if="!isRedactPart" >{{currentDirectory.name_part}}</h3>
                    <b-form-input v-else
                                  tabindex="0"
                                  #redactPart
                                  @keyup="event => updatePart(event)"
                                  v-model="currentDirectory.name_part"/>
                    <b-icon @click="removePart"
                            class="h3 rounded-circle delete-page-item"
                            icon="folder-minus" aria-hidden="true"></b-icon>
                </div>
            </b-card-header>
            <b-card-text>
                <b-button-toolbar class="toolbar-row">
                    <b-button-group class="mr-1">
                        <b-button title="Add" @click="addFile">
                            <b-icon icon="journal-plus" aria-hidden="true"></b-icon>
                        </b-button>
                        <b-button title="Refresh" @click="updateFilesToDir">
                            <b-icon icon="arrow-clockwise" aria-hidden="true"></b-icon>
                        </b-button>
                    </b-button-group>
                </b-button-toolbar>
                <b-list-group>
                    <b-list-group-item v-for="file in currentDirectory.files"
                                       v-bind:key="file.id"
                                       :active="currentFile.id === file.id">
                        <div class="row-list">
                            <b-button class="pages-list-item"
                                      @click="() => selectFile(file)">{{file.filename}}</b-button>
                            <b-icon @click="() => removeFile(file)"
                                    class="h3 rounded-circle delete-page-item"
                                    icon="journal-minus" aria-hidden="true"></b-icon>
                        </div>
                    </b-list-group-item>
                </b-list-group>
            </b-card-text>
        </b-card>
    </div>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "Directories",
        data() {
            return {
                isRedactPart: true
            }
        },
        computed: {
            currentFile() {
                return this.$store.state.currentFile
            },
            currentDirectory() {
                return this.$store.state.currentDirectory
            },
            data() {
                console.log(this.$store.state.data)
                return this.$store.state.data
            }
        },
        methods: {
            ...mapActions([
                'changeCurrentDirectory',
                'changeCurrentFile',
                'updateData',
                'updateFiles',
                'loadFile',
                'createDir',
                'createFile',
                'updateDir',
                'deleteFile',
                'deleteDir'
            ]),
            changeRedact() {
                this.isRedactPart = !this.isRedactPart;
            },
            addPart() {
                this.createDir().then(() => this.updateData())
            },
            removePart() {
                this.deleteDir()
                    .then(() => this.updateData())
                    .then(() => this.changeCurrentDirectory({id: -1}));
            },
            updatePart(event) {
                if (event.key === 'Enter') {
                    this.updateDir(this.currentDirectory.name_part)
                }
            },
            refreshParts() {
                this.updateData()
            },
            updateFilesToDir() {
                this.updateFiles()
            },
            selectDirectory(fol) {
                if (this.currentDirectory.id === fol.id)
                    this.changeCurrentDirectory({id: -1})
                else this.changeCurrentDirectory(fol).then(() => this.updateFiles())
            },
            selectFile(file) {
                if (this.currentFile.id === file.id)
                    this.changeCurrentFile({id: -1})
                else this.changeCurrentFile(file).then(() => this.loadFile())
            },
            addFile() {
                this.createFile().then(() => this.updateFiles())
            },
            removeFile(file) {
                this.deleteFile(file).then(() => this.updateFiles())
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../ex.variables";
    .row-list {
        display: flex;
        flex-direction: row;
    }
    .wrapper {
        display: flex;
        flex-direction: row;
    }
    .item-list {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .list-group-item.active {
        background: $secondary !important;
        border: 1px solid $secondary !important;
    }
    .list-group-item:hover {
        color: $dark-color;
        background: $secondary-light !important;
        border: 1px solid $secondary-light !important;
    }
    .pages-list-item {
        color: $dark-color !important;
        background: inherit !important;
        border: none !important;
        width: -webkit-fill-available;
        text-align: left;
    }
    .delete-page-item {
        cursor: pointer;
        color: $dark-color !important;
        background: $light;
        margin: 6px;
        padding: 4px;
    }
    .delete-page-item:hover {
        color: $light-color !important;
        background: $dark;
    }
    @media screen and (min-width: 1000px) {
        .transition-width-list-left {
            width: calc(100vw/6);
            position: absolute;
            border: 1px solid $indigo-light;
        }
        .content {
            width: calc(5 * 100vw/6);
            margin-left: calc(100vw/6);
            position: absolute;
            height: calc(100vh - 60px);
            border: 1px solid $indigo-light;
        }
    }
    @media screen and (max-width: 1000px) {
        .transition-width-list-left {
            width: 100px;
            position: absolute;
            height: calc(100vh - 60px);
            background: white;
            border: 1px solid $indigo-light;
        }
        .transition-width-list-left:hover {
            width: 250px;
            z-index: 999;
        }
        .content {
            width: calc(100vw - 100px);
            margin-left: 100px;
            position: absolute;
            height: calc(100vh - 60px);
            border: 1px solid $indigo-light;
        }
    }
    @media screen and (max-width: 800px) {
        .transition-width-list-left {
            width: 80px;
            position: absolute;
            height: calc(100vh - 60px);
            background: white;
            border: 1px solid $indigo-light;
        }
        .transition-width-list-left:hover {
            width: 250px;
            z-index: 999;
        }
        .content {
            width: calc(100vw - 80px);
            margin-left: 80px;
            position: absolute;
            height: calc(100vh - 60px);
            border: 1px solid $indigo-light;
        }
    }
    @media screen and (max-width: 600px) {
        .transition-width-list-left {
            width: 70px;
            position: absolute;
            height: calc(100vh - 60px);
            background: white;
            border: 1px solid $indigo-light;
        }
        .transition-width-list-left:hover {
            width: 200px;
            z-index: 999;
        }
        .content {
            width: calc(100vw - 70px);
            margin-left: 70px;
            position: absolute;
            height: calc(100vh - 60px);
            border: 1px solid $indigo-light;
        }
    }
    @media screen and (max-width: 400px) {
        .wrapper {
            flex-direction: column !important;
            flex-wrap: nowrap;
            margin: 5px;
        }
        .transition-width-list-left {
            position: relative;
            width: 100%;
            background: white;
            height: calc(100vh - 60px);
            border: 1px solid $indigo-light;
        }
        .transition-width-list-left:hover {
            width: inherit;
        }
        .content {
            position: relative;
            width: 100%;
            margin: 0;
            height: calc(100vh - 60px);
            border: 1px solid $indigo-light;
        }
    }
</style>