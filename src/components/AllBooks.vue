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
      </td>
      <td v-if="user" class="options">
        <div class="edit-container">
          <button
            v-if="book.registered_by === this.user"
            @click="manageForm(book.id)"
          >
            {{ text }}
          </button>
          <div class="edit" v-if="showEditForm === true && index === book.id">
            <EditForm :bookId="book.id" />
          </div>
          <button @click="deleteBook(book.id)">Delete</button>
        </div>
      </td>
    </tr>
  </table>
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
      id: null,
      showEditForm: false,
      index: null,
      text: "Edit",
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
      this.showEditForm = !this.showEditForm;
      this.index = id;
      if (this.showEditForm === true) {
        this.text = "Close";
      } else {
        this.text = "Edit";
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
