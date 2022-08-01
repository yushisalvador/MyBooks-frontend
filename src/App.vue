<template>
  <h1>Hello world!!</h1>
  <AllBooks :allBooks="allBooks" />
</template>

<script>
import AllBooks from "./components/AllBooks.vue";
import axios from "axios";

export default {
  name: "App",
  components: { AllBooks },

  data() {
    return {
      allBooks: [],
    };
  },
  methods: {
    async fetchBooks() {
      let books = await axios.get("http://localhost:9000/books");
      this.allBooks = books.data;
    },
  },
  created() {
    this.fetchBooks();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
