<template>
  <div id="get-todo" class="container">
    <h1>TODO LIST</h1>
      <div class="input-group">
        <input
          class="form-control"
          :value="newTodo"
          @change="getTodo"
          placeholder="I need to..."
        >
        <button class="btn btn-primary input-group-btn" @click="addTodo">Add Todo</button>
      </div>
  </div>
</template>

<script>
  export default {
    methods: {
      getTodo(e) {
        this.$store.dispatch('getTodo', e.target.value)
      },
      addTodo() {
        this.$store.dispatch('addTodo'),
        this.$store.dispatch('clearTodo')
      }
    },
    computed: {
      newTodo() {
        return this.$store.getters.newTodo
      }
    }
  }
</script>

<style>
.form-control{
  margin-right: 5px;
}
#get-todo{
  margin-bottom: 20px;
}
</style>