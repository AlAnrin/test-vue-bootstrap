<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand href="#">Anrin</b-navbar-brand>
    </b-navbar>
    <authorization v-if="token == null"></authorization>
  </div>
</template>

<script>
  import Authorization from "./components/Authorization";

  export default {
    name: 'App',
    data() {
      return {
        dataHome: undefined
      }
    },
    components: {
      Authorization
    },
    computed: {
      baseUrl() {
        return this.$store.state.baseUrl
      },
      token() {
        return this.$store.state.token;
      }
    },
    methods: {
      async getData() {
        const url = `${this.baseUrl}/home`
        const api_call = await fetch(url);

        this.dataHome = await api_call.json();
      },
      async rewriteData() {
        let response = await fetch(`${this.baseUrl}/rewrite`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({newData: "dataaaaaaa"})
        });
        let result = await response.json();
        this.dataHome = result.message;
      },
      async putData() {
        let response = await fetch(`${this.baseUrl}/write`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({newAddingData: "NEWWWWWWWWWWWWWWWWWWWWWWWW"})
        });
        let result = await response.json();
        this.dataHome = result.message;
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