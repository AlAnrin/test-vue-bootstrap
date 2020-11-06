<template>
    <b-list-group>
        <b-list-group-item v-for="fol in data"
                           v-bind:key="fol.id">
            {{fol.name_part}}
        </b-list-group-item>
    </b-list-group>
</template>

<script>
    export default {
        name: "Directories",
        computed: {
            data() {
                console.log(this.$store.state.data)
                return this.$store.state.data
            }
        },
    }
</script>

<style scoped>

</style>