<template>
  <div id="current-todos" class="container">
    <h3 v-if="todos.length > 0">
      Outstanding Tasks: {{todos.length}}
    </h3>
    <h3 v-else>No items</h3>
    <span v-if="loading" class="fa fa-spinner fa-spin loader"></span>
    <ul class="list-group">
      <li class="list-group-item" v-for="(todo, index) in todos" :key="`item=${index}`">
        {{todo.title}}
        <div class="btn-group">
          <button type="button" @click="complete(todo)" class="btn btn-default btn-sm">
            <span class="fa fa-check-circle"></span>
            Complete
          </button>
          <button type="button" @click="remove(todo)" class="btn btn-default btn-sm">
            <span class="fa fa-times-circle"></span>
            Remove
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default{
    methods: {
      complete(todo) {
        this.$store.dispatch('completeTodo', todo)
      },
      remove(todo) {
        this.$store.dispatch('removeTodo', todo)
      }
    },
    computed: {
      todos() {
        return this.$store.getters.todos
      },
      loading() {
        return this.$store.getters.isLoading
      }
    },
    created() {
      this.$store.dispatch('loadTodos')
    }
  }
</script>

<style>
  .btn-group{
    float: right;
  }
  #current-todos{
    margin-bottom: 40px;
  }
  .loader{
    font-size: 50px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
