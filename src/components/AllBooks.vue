<template>
  <div v-if="user">
    <Modal header="Add a book!" />
  </div>
  <table>
    <tr>
      <th>Author</th>
      <th>Title</th>
      <th>Registered By</th>
      <th>Date Finished</th>
      <th v-if="user">Options</th>
    </tr>
    <tr :key="book.id" v v-for="book in allBooks">
      <td>
        {{ book.author }}
      </td>
      <td>
        {{ book.title }}
      </td>
      <td>{{ book.registered_by }}</td>
      <td>
        {{ book.date_finished.toString().slice(0, 10) }}
        <button v-if="book.registered_by === this.user">edit</button>
      </td>
      <td v-if="user">
        <button @click="deleteBook(book.id)">Delete</button>
      </td>
    </tr>
  </table>
</template>

<script>
import axios from "axios";
import Modal from "./Modal.vue";
import { mapGetters } from "vuex";

export default {
  name: "AllBooks",
  props: {
    allBooks: Array,
    header: String,
  },
  data() {
    return {
      id: null,
    };
  },
  methods: {
    async deleteBook(id) {
      try {
        if (confirm("Are you sure?")) {
          await axios.delete(`http://localhost:9000/books?id=${id}`);
          alert("Done!");
        }
      } catch (error) {
        alert("Something went wrong!");
      }
    },
  },
  components: { Modal },
  computed: {
    ...mapGetters(["user"]),
  },
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
  margin-top: 30px;
}
</style>
