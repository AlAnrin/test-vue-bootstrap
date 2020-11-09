<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand href="#">Anrin</b-navbar-brand>
      <b-nav-text variant="primary" right>
        {{fio}}
      </b-nav-text>
    </b-navbar>
    <authorization v-if="token == null"></authorization>
    <directories v-if="token != null && currentFile.id === -1"></directories>
    <page v-if="currentFile.id !== -1"></page>
  </div>
</template>

<script>
  import Authorization from "./components/Authorization";
  import Directories from "./components/Directories";
  import Page from './components/Page';

  export default {
    name: 'App',
    data() {
      return {
        dataHome: undefined
      }
    },
    components: {
      Authorization,
      Directories,
      Page
    },
    computed: {
      fio() {
        return this.$store.state.fio
      },
      baseUrl() {
        return this.$store.state.baseUrl
      },
      token() {
        return this.$store.state.token;
      },
      currentFile() {
        return this.$store.state.currentFile
      }
    }
  }
</script>

<style lang="scss">
  @import "ex.variables";
  @import "styles.module";
  @import '~bootstrap/scss/bootstrap.scss';
  @import '~bootstrap-vue/src/index.scss';
</style>