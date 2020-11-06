<template>
    <b-card v-if="currentDirectory.id !== -1"
            :title="currentDirectory.name_part"
            class="content">
        <b-card-text>
            <b-list-group>
                <b-list-group-item v-for="file in currentDirectory.files"
                                   v-bind:key="file.id"
                                   :active="currentFile.id === file.id"
                                   @click="() => selectFile(file)"
                                   button>
                    {{file.filename}}
                </b-list-group-item>
            </b-list-group>
        </b-card-text>
    </b-card>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "Pages",
        computed: {
            currentFile() {
                return this.$store.state.currentFile
            },
            currentDirectory() {
                return this.$store.state.currentDirectory
            },
        },
        methods: {
            ...mapActions([
                'changeCurrentFile'
            ]),
            selectFile(file) {
                if (this.currentFile.id === file.id)
                    this.changeCurrentFile({id: -1})
                else this.changeCurrentFile(file)
            }
        }
    }
</script>

<style scoped>

</style>