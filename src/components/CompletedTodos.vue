<template>
  <div id="completed-todos" class="container">
    <h3 v-if="completed.length > 0">Completed: {{completed.length}}</h3>
    <ul class="list-group">
      <li class="list-group-item" v-for="(todo, index) in completed" :key="`item=${index}`">
        {{todo.title}}
        <div class="btn-group">
          <button type="button" @click="complete(todo)" class="btn btn-default btn-sm">
            <span class="fa fa-minus-circle"></span>
            Unfinish
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
export default {
  methods: {
    remove(todo) {
      this.$store.dispatch('removeTodo', todo)
    },
    complete(todo) {
      this.$store.dispatch('completeTodo', todo)
    }
  },
  computed: {
    completed() {
      return this.$store.getters.completedTodos
    }
  }
}
</script>
