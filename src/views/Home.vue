<template>
  <NavMenu />
  <AllBooks :allBooks="allBooks" />
</template>

<script>
import AllBooks from "../components/AllBooks.vue";
import NavMenu from "../components/NavMenu";
import axios from "axios";

export default {
  name: "HomePage",
  components: { AllBooks, NavMenu },

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
