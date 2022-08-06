<template>
  <div v-if="user">
    <Modal header="Add a book!" />
  </div>
  <div class="table-container">
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
  </div>
</template>

<script>
import axios from "axios";
import Modal from "./Modal.vue";
import { mapGetters } from "vuex";
import EditForm from "./EditForm.vue";
const api = process.env.VUE_APP_API_URL;

export default {
  name: "AllBooks",
  props: {
    allBooks: Array,
    header: String,
  },
  data() {
    return {
      editId: null,
    };
  },
  methods: {
    async deleteBook(id) {
      try {
        if (confirm("Are you sure?")) {
          await axios.delete(`${api}/books?id=${id}`);
          alert("Done!");
        }
      } catch (error) {
        alert("Something went wrong!");
      }
    },
    manageForm(id) {
      if (id === this.editId) {
        this.editId = null;
      } else {
        this.editId = id;
      }
    },
  },
  components: { Modal, EditForm },
  computed: {
    ...mapGetters(["user"]),
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
  background: whitesmoke;
}

th:hover {
  color: #b29ae3;
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
  background: white;
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
</style>
