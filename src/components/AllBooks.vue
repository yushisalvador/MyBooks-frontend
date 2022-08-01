<template>
  <div :key="book.id" v-for="book in allBooks">
    <h1>Author: {{ book.author }}</h1>
    <h4>Title: {{ book.title }}</h4>
  </div>
</template>

<script>
export default {
  name: "AllBooks",
  props: {
    allBooks: Array,
  },
};
</script>
