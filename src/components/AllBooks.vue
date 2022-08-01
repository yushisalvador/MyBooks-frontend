<template>
  <table>
    <tr>
      <th>Author</th>
      <th>Title</th>
      <th>Registered By</th>
      <th>Date Finished</th>
      <th>Options</th>
    </tr>
    <tr :key="book.id" v v-for="book in allBooks">
      <td>
        {{ book.author }}
      </td>
      <td>
        {{ book.title }}
      </td>
      <td>{{ book.registered_by }}</td>
      <td>{{ book.date_finished.toString().slice(0, 10) }}</td>
      <td>
        <button>Edit</button>
        <button @click="deleteEvent(book.id)">Delete</button>
      </td>
    </tr>
  </table>
</template>

<script>
import axios from "axios";
export default {
  name: "AllBooks",
  props: {
    allBooks: Array,
  },
  data() {
    return {
      id: null,
    };
  },
  methods: {
    async deleteEvent(id) {
      if (confirm("Are you sure?")) {
        await axios.delete(`http://localhost:9000/books?id=${id}`);
        alert("Done!");
      }
    },
  },
};
</script>

<style>
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
</style>
