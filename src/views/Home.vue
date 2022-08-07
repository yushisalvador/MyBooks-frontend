<template>
  <div>
    <AllBooks :allBooks="allBooks" />
  </div>
</template>

<script>
import AllBooks from "../components/AllBooks.vue";
import axios from "axios";
import { mapGetters } from "vuex";

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
      let books = await axios.get("books");
      this.allBooks = books.data;
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
  created() {
    this.fetchBooks();
    console.log(this.token);
  },
};
</script>
