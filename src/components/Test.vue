<template>
  <div class="hello">

    <b-card title="Card Title" no-body>
      <b-card-header header-tag="nav">
        <b-nav card-header tabs justified >
          <b-nav-item active>Active</b-nav-item>
          <b-nav-item>Link</b-nav-item>
          <b-nav-item>Another Link</b-nav-item>
          <b-nav-item disabled>Disabled</b-nav-item>
        </b-nav>
      </b-card-header>

      <b-card-body class="text-center">
        <b-card-text>
          {{msg}}
        </b-card-text>

        <b-button variant="primary">Go somewhere</b-button>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
