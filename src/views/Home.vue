<template>
  <NavBar />

  <AllBooks :allBooks="allBooks" />
</template>

<script>
import AllBooks from "../components/AllBooks.vue";
import axios from "axios";
import NavBar from "../components/NavBar.vue";
import { mapGetters } from "vuex";
export default {
  name: "HomePage",
  components: { AllBooks, NavBar },

  data() {
    return {
      allBooks: [],
      userBooks: [],
    };
  },

  methods: {
    async fetchBooks() {
      let books = await axios.get("http://localhost:9000/books");
      this.allBooks = books.data;
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
  created() {
    this.fetchBooks();
  },
};
</script>
