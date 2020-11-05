<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand href="#">Anrin</b-navbar-brand>
    </b-navbar>
<!--    <b-button variant="light" @click="getData">GetData</b-button>-->
<!--    <b-button variant="warning" @click="rewriteData">rewriteData</b-button>-->
<!--    <b-button variant="success" @click="putData">putData</b-button>-->
<!--    <test v-bind:msg="dataHome" v-if="dataHome != null"></test>-->
    <authorization></authorization>
  </div>
</template>

<script>
  // import Test from "./components/Test";
  import Authorization from "@/components/Authorization";

export default {
  name: 'App',
  data() {
    return {
      dataHome: undefined
    }
  },
  components: {
    Authorization,
    // Test
  },
  computed: {
    baseUrl() {
      return this.$store.state.baseUrl
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