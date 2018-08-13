import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import { isEmpty } from 'lodash'
import { API } from './helpers'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
    newTodo: '',
    loading: false,
  },

  mutations: {
    SET_TODOS(state, todos) {
      state.todos = todos
    },
    SET_NEW_TODO(state, todo) {
      state.newTodo = todo
    },
    ADD_TODO(state, todoObject) {
      state.todos.push(todoObject)
    },
    EDIT_TODO(state, todo) {
      var todos = state.todos
      todos.splice(todos.indexOf(todo), 1)
      state.todos = todos
      state.newTodo = todo.body
    },
    REMOVE_TODO(state, todo) {
      var todos = state.todos
      todos.splice(todos.indexOf(todo), 1)
    },
    COMPLETE_TODO(state, todo) {
      todo.completed = !todo.completed
    },
    CLEAR_TODO(state) {
      state.newTodo = ''
    }
  },

  actions: {
    loadTodos({ commit }) {
      Axios
        .get(API)
        .then(response => response.data)
        .then(todos => {
          commit('SET_TODOS', todos.data)
        })
    },
    addTodo({ commit, state }) {
      if (isEmpty(state.newTodo)) {
        return
      }
      const todo = {
        title: state.newTodo,
        completed: 0,
      }
      console.log('todo when addTodo', todo)
      Axios
        .post(API, todo)
        .then(response => console.log('axios response', response))
        .then(() => {commit('ADD_TODO', todo)})
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
      .then(response => console.log(response))
      .then(() => {
        console.log('removed todo', todo.id, 'from the server')
        commit('REMOVE_TODO', todo)
      })
    },
    completeTodo({ commit }, todo) {
      Axios
      .put(`${API}${todo.id}`, {completed: !todo.completed})
      .then(response => {
        console.log(response, todo.id, 'has been updated')
        commit('COMPLETE_TODO', todo)
      })
    },
    // ###############################
    editTodo({ commit }, todo) {
      commit('EDIT_TODO', todo)
    }
  },

  getters: {
    newTodo: state => state.newTodo,
    todos: state => state.todos,
    // todos: state => state.todos.filter((todo) => !todo.completed),
    completedTodos: state => state.todos.filter((todo) => todo.completed)
  }
})