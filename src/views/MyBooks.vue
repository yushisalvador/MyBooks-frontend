<template>
  <NavBar />
  <div class="container">
    <div class="buttonComponent">
      <ButtonComponent text="Add a book" className="btn" />
    </div>
    <div v-if="myBooks.length === 0">
      You dont have any books! Try adding some!
    </div>

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
import NavBar from "@/components/NavBar.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";

export default {
  name: "MyBooks",
  data() {
    return {
      myBooks: [],
    };
  },
  methods: {
    async getMyBooks() {
      const username = sessionStorage.getItem("user");
      const token = sessionStorage.getItem("token");
      let books = await axios.get(
        `http://localhost:9000/books/mybooks?username=${username}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      this.myBooks = books.data;
      console.log(books);
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
  created() {
    this.getMyBooks();
  },
  components: { NavBar, ButtonComponent },
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

.buttonComponent {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
