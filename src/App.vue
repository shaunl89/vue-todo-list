<template>
  <div id="app">
    <router-link to="/hello">Hello</router-link>
    <router-link to="/about">About</router-link>

    <GetTodo></GetTodo>
    <CurrentTodos></CurrentTodos>
    <CompletedTodos></CompletedTodos>
  </div>
</template>

<script>
import GetTodo from './components/GetTodo.vue'
import CurrentTodos from './components/CurrentTodos.vue'
import CompletedTodos from './components/CompletedTodos.vue'

export default {
  name: 'app',
  components: {
    GetTodo,
    CurrentTodos,
    CompletedTodos,
  },
  created() {
    this.$store.dispatch('loadTodos')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
