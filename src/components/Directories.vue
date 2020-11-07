<template>
    <div class="wrapper">
        <b-list-group class="transition-width-list-left">
            <b-list-group-item v-for="fol in data"
                               v-bind:key="fol.id"
                               :active="currentDirectory.id === fol.id"
                               @click="() => selectDirectory(fol)"
                               class="item-list"
                               button>
                <b>{{fol.name_part}}</b>
            </b-list-group-item>
        </b-list-group>
        <pages class="content"></pages>
    </div>
</template>

<script>
    import {mapActions} from "vuex";
    import Pages from "./Pages";

    export default {
        name: "Directories",
        components: {
          Pages
        },
        computed: {
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
                'updateFiles'
            ]),
            selectDirectory(fol) {
                if (this.currentDirectory.id === fol.id)
                    this.changeCurrentDirectory({id: -1})
                else this.changeCurrentDirectory(fol).then(() => this.updateFiles())
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../ex.variables";
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
            height: calc(100vh - 60px);
            background: white;
            border: 1px solid $indigo-light;
        }
        .transition-width-list-left:hover {
            width: inherit;
        }
        .content {
            position: relative;
            width: 100%;
            margin: 0;
        }
    }
</style>