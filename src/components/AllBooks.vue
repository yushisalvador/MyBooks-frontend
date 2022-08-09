<template>
  <div v-if="user">
    <Modal header="Add a book!" />
  </div>

  <h2 class="error" v-if="error">{{ error }}</h2>

  <div class="table-container">
    <table>
      <tr>
        <th>Author</th>
        <th>Title</th>
        <th>Registered By</th>
        <th>Date Finished</th>
        <th v-if="user">Options</th>
      </tr>
      <tr :key="book.id" v v-for="book in books.data">
        <td>
          {{ book.author }}
        </td>
        <td>
          {{ book.title }}
        </td>
        <td>{{ book.registered_by }}</td>
        <td>
          <div v-if="book.date_finished">
            {{ book.date_finished.toString().slice(0, 10) }}
          </div>
          <div v-if="!book.date_finished">not specified</div>
        </td>
        <td v-if="user" class="options">
          <div
            class="edit-container"
            v-if="this.user.username === book.registered_by"
          >
            <button class="edit-option" @click="manageForm(book.id)">
              <div v-if="this.editId === book.id">Close</div>
              <div v-if="this.editId !== book.id">Edit</div>
            </button>
            <div class="edit" v-if="this.editId === book.id">
              <EditForm :bookId="book.id" />
            </div>
            <button @click="deleteBook(book.id)">Delete</button>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Modal from "./Modal.vue";
import EditForm from "./EditForm.vue";

export default {
  name: "AllBooks",
  props: {
    header: String,
  },
  components: { Modal, EditForm },
  data() {
    return {
      editId: null,
    };
  },
  methods: {
    fetchBooks() {
      return this.$store.dispatch("GET_ALL_BOOKS");
    },
    deleteBook(id) {
      if (confirm("Are you sure?")) {
        return this.$store.dispatch("DELETE_BOOK", id);
      }
      return;
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
    user() {
      return this.$store.getters.user;
    },
    books() {
      return this.$store.getters.books;
    },
    error() {
      return this.$store.getters.errorMessage;
    },
  },
  created() {
    this.fetchBooks();
  },
};
</script>

<style scoped>
td {
  border: 2px solid #b29ae3;
  padding: 10px;
}

table {
  margin: 0 auto;
  margin-top: 30px;
  width: 60%;
  border: 2px solid #b29ae3;
  padding: 10px;
}

th {
  border: 2px solid #b29ae3;
  padding: 10px;
  background-color: whitesmoke;
}

th:hover {
  color: #b29ae3;
}

button {
  margin: 2px;
  padding: 4px;
  background-color: #cdbeea;
  border-radius: 4px;
  border: 2px solid white;
}

button:hover {
  background-color: #c1a0ef;
  cursor: pointer;
  border: 2px solid rgb(234, 198, 222);
  color: white;
}
.container {
  height: 100vh;
}
.table-container {
  margin: 20px auto;
}

.edit-container {
  position: relative;
}

.edit {
  background-color: white;
  border: solid 1px rgb(241, 173, 241);
  position: absolute;
  padding: 15px;
  top: 30px;
  z-index: 98;
  border-radius: 8px;
}

.edit-option {
  margin-right: 5px;
  width: 70px;
}

.error {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: 600;
}
</style>
