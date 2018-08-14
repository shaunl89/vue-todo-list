import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import { isEmpty } from 'lodash'
import qs from 'qs'
import { API } from './helpers'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
    newTodo: '',
    loading: false,
  },
  mutations: {
    SET_LOADING(state, status) {
      state.loading = status
    },
    SET_TODOS(state, todos) {
      state.todos = todos
    },
    SET_NEW_TODO(state, todo) {
      state.newTodo = todo
    },
    ADD_TODO(state, todoObject) {
      state.todos.push(todoObject)
    },
    REMOVE_TODO(state, todo) {
      var todos = state.todos
      todos.splice(todos.indexOf(todo), 1)
    },
    COMPLETE_TODO(state, todo) {
      var todos = state.todos
      todos[todos.indexOf(todo)].completed = !todos[todos.indexOf(todo)].completed
    },
    CLEAR_TODO(state) {
      state.newTodo = ''
    }
  },
  actions: {
    loadTodos({ commit }) {
      commit('SET_LOADING', true)
      Axios
        .get(API)
        .then(response => response.data)
        .then(todos => {
          commit('SET_TODOS', todos.data)
          commit('SET_LOADING', false)
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.warn(err)
          Vue.notify({
            group: 'main',
            type: 'error',
            title: 'Error',
            text: 'Failed to load todos',
          })
        })
    },
    addTodo({ commit, state }) {
      if (isEmpty(state.newTodo)) {
        Vue.notify({
          group: 'main',
          type: 'error',
          title: 'Error',
          text: 'Todo is empty',
        })
        return
      }
      const todo = {
        title: state.newTodo,
        completed: 0,
      }
      Axios
        .post(API, qs.stringify(todo))
        .then(response => {
          // eslint-disable-next-line no-console
          console.log('axios response', response)
        })
        .then(() => {
          commit('ADD_TODO', todo)
        })
        .then(
          Vue.notify({
            group: 'main',
            type: 'success',
            title: 'Success',
            text: 'Todo added successfully',
          })
        )
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.warn(err)
          Vue.notify({
            group: 'main',
            type: 'error',
            title: 'Error',
            text: 'Failed to add todo',
          })
        })
    },
    clearNewTodo({ commit }) {
      commit('CLEAR_TODO')
    },
    setNewTodo({ commit }, todo) {
      commit('SET_NEW_TODO', todo)
    },
    removeTodo({ commit }, todo) {
      Axios
      .delete(`${API}${todo.id}`)
      .then(response => {
        // eslint-disable-next-line no-console
        console.log(response)
      })
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('removed todo', todo.id, 'from the server')
        commit('REMOVE_TODO', todo)
      })
      .then(
        Vue.notify({
          group: 'main',
          type: 'success',
          title: 'Success',
          text: 'Todo deleted successfully',
        })
      )
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.warn(err)
        Vue.notify({
          group: 'main',
          type: 'error',
          title: 'Error',
          text: 'Failed to delete todo',
        })
      })
    },
    completeTodo({ commit }, todo) {
      const newStatus = !todo.completed ? 1 : 0
      Axios
      .put(
        `${API}${todo.id}`,
        qs.stringify({
          title: todo.title,
          completed: newStatus,
        })
      )
      .then(response => {
        // eslint-disable-next-line no-console
        console.log(response, todo.id, 'has been completed: ', todo.completed)
        commit('COMPLETE_TODO', todo)
      })
      .then(
        Vue.notify({
          group: 'main',
          type: 'success',
          title: 'Success',
          text: 'Todo updated successfully',
        })
      )
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.warn(err)
        Vue.notify({
          group: 'main',
          type: 'error',
          title: 'Error',
          text: 'Failed to update todo',
        })
      })
    },
  },
  getters: {
    newTodo: state => state.newTodo,
    todos: state => state.todos.filter((todo) => !todo.completed),
    completedTodos: state => state.todos.filter((todo) => todo.completed),
    isLoading: state => state.loading
  }
})