# vue-todo-list

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```

## About

This application makes API calls to the backend server here: https://github.com/shaunloh89/go-todo-server

It is a single-page application in Vue.js implementing a simple todo list using Vuex as its state management system with Axios for making API calls. Templating is written in Single File Component format.

Data Flow: Vue -> Vuex -> Backend -> Vuex -> Vue

Features include: 
- adding an activity
- updating an activity (toggling between complete / uncomplete)
- deleting an activity
- list all activities when page is first loaded or reloaded
