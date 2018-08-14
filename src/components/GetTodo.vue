<template>
  <div id="get-todo" class="container">
    <h1>TODO LIST</h1>
      <div class="input-group">
        <input
          class="form-control"
          :value="newTodo"
          @change="setNewTodo"
          @keyup.enter="addTodo"
          placeholder="What I need to do..."
        >
        <button class="btn btn-primary input-group-btn" @click="addTodo">Add Todo</button>
      </div>
  </div>
</template>

<script>
  export default {
    methods: {
      setNewTodo(e) {
        this.$store.dispatch('setNewTodo', e.target.value)
      },
      addTodo() {
        this.$store.dispatch('addTodo')
        this.$store.dispatch('clearNewTodo')
      }
    },
    computed: {
      newTodo() {
        return this.$store.getters.newTodo
      }
    },
  }
</script>

<style>
.form-control{
  margin-right: 5px;
}
#get-todo{
  margin-bottom: 40px;
}
</style>