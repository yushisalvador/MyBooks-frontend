<template>
  <Modal />
  <div class="container">
    <table v-if="myBooks.length > 0">
      <tr>
        <th>Author</th>
        <th>Title</th>
        <th>Registered By</th>
        <th>Date Finished</th>
        <th>Options</th>
      </tr>

      <tr :key="book.id" v-for="book in myBooks">
        <td>
          {{ book.author }}
        </td>
        <td>{{ book.title }}</td>
        <td>{{ book.registered_by }}</td>
        <td>{{ book.date_finished.toString().slice(0, 10) }}</td>
        <td>
          <button>Edit</button>
          <button>Delete</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
// import NavBar from "@/components/NavBar.vue";
import Modal from "../components/Modal.vue";
export default {
  name: "MyBooks",
  data() {
    return {
      myBooks: [],
    };
  },
  methods: {
    async getMyBooks() {
      const token = sessionStorage.getItem("token");
      let books = await axios.get(
        `http://localhost:9000/books/mybooks?username=${this.user}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      this.myBooks = books.data;
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
  created() {
    this.getMyBooks();
  },
  components: { Modal },
};
</script>

<style scoped>
table,
th,
td {
  border: 1px solid;
  padding: 10px;
  width: 60vw;
}

table {
  margin: 0 auto;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
