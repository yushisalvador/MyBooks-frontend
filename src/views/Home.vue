<template>
  <div>
    <AllBooks :allBooks="allBooks" />
  </div>
</template>

<script>
import AllBooks from "../components/AllBooks.vue";
import axios from "axios";
import { mapGetters } from "vuex";
const api = "https://little-world-of-books.herokuapp.com";
export default {
  name: "HomePage",
  components: { AllBooks },

  data() {
    return {
      allBooks: [],
    };
  },

  methods: {
    async fetchBooks() {
      let books = await axios.get(`${api}/books`);
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
