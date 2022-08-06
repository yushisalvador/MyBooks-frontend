<template>
  <Modal header="Add a book!" />
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
      <td>
        <div v-if="book.date_finished">
          {{ book.date_finished.toString().slice(0, 10) }}
        </div>
        <div v-if="!book.date_finished">not specified</div>
      </td>

      <td v-if="user" class="options">
        <div class="edit-container" v-if="this.user === book.registered_by">
          <button class="edit-option" @click="manageForm(book.id)">
            <div v-if="this.editId === book.id">Close</div>
            <div v-if="this.editId !== book.id">Edit</div>
          </button>
          <div class="edit" v-if="this.editId === book.id">
            <EditForm :bookId="book.id" />
          </div>
        </div>
        <button @click="deleteBook(book.id)">Delete</button>
      </td>
    </tr>
  </table>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import Modal from "../components/Modal.vue";
import EditForm from "@/components/EditForm.vue";
const api = process.env.VUE_APP_API_URL;

export default {
  name: "MyBooks",
  data() {
    return {
      myBooks: [],
      editId: null,
      date_finished: null,
    };
  },
  methods: {
    async getMyBooks() {
      const token = sessionStorage.getItem("token");
      let books = await axios.get(
        `${api}/books/mybooks?username=${this.user}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      this.myBooks = books.data;
    },
    manageForm(id) {
      if (id === this.editId) {
        this.editId = null;
      } else {
        this.editId = id;
      }
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
  created() {
    this.getMyBooks();
  },
  components: { Modal, EditForm },
};
</script>

<style scoped>
.edit-container {
  position: relative;
}
.edit {
  background: white;
  border: solid 1px rgb(241, 173, 241);
  position: absolute;
  padding: 15px;
  top: 30px;
  z-index: 98;
  border-radius: 8px;
}

.delete {
  margin-left: 8px;
}
button {
  margin: 8px;
  padding-left: 5px;
  padding-right: 5px;
}
table,
th,
td {
  border: 1px solid;
  padding: 10px;
  width: 70vw;
}

table {
  margin: 0 auto;
  margin-top: 30px;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
