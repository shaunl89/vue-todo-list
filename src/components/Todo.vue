<template>
  <div>
    <h1>
      {{ greet }}
    </h1>
    <ul>
      <li
        v-for="(item, index) in items"
        v-bind:key="`item-${index}`"
      >{{ item }}</li>
      <textarea v-model="message">
      </textarea>
    </ul>
    <button @click="increment">{{ counter }}</button>
    <h1>{{ todos[0].title }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Todo',
  props: {
    greet: String,
    todos: Array,
  },
  data() {
    return {
      items: [
        'thing',
        'thingie',
        'lots of things',
        'yayayayay',
      ],
      message: "this is a good place to type stuff",
      counter: 0,
    }
  },
  methods: {
    increment() {
      this.counter++;
    }
  },
  updated() {
    console.log(this.counter)
  }
}
</script>