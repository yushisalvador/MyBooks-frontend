<template>
  <Modal header="Add a book!" />
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
        <td class="options">
          <div class="edit-container">
            <button @click="manageForm(book.id)">{{ text }}</button>
            <div class="edit" v-if="showEditForm === true && index === book.id">
              <EditForm :bookId="book.id" />
            </div>
            <button class="delete">Delete</button>
          </div>
        </td>
      </tr>
    </table>
  </div>
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
      showEditForm: false,
      index: null,
      text: "Edit",
      date_finished: null,
    };
  },
  methods: {
    async getMyBooks() {
      const token = sessionStorage.getItem("token");
      let books = await axios.get(`${api}books/mybooks?username=${this.user}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      this.myBooks = books.data;
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
  margin-left: 10px;
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
  width: 60vw;
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
