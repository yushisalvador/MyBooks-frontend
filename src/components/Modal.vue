<template>
  <div class="wrapper">
    <div class="buttonComponent">
      <ButtonComponent
        text="Add a book"
        className="btn"
        @btn-click="showModal = true"
      />
    </div>
    <transition name="fade" appear>
      <div
        class="modal-overlay"
        v-if="showModal"
        @click="showModal = false"
      ></div>
    </transition>
    <transition name="slide" appear>
      <div class="modal" v-if="showModal">
        <h3>{{ header }}</h3>
        <p v-if="error" class="error">{{ error }}</p>
        <form>
          <label>Title</label>
          <div>
            <input type="text" class="text" v-model="title" required />
          </div>

          <label>Author</label>
          <div>
            <input type="text" class="text" v-model="author" required />
          </div>
          <label>Date finished</label>
          <div>
            <input type="date" class="date" v-model="date_finished" />
          </div>
        </form>
        <div class="button-container">
          <ButtonComponent @btn-click="addNewBook" text="Add" />
          <ButtonComponent @btn-click="showModal = false" text="Cancel" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ButtonComponent from "./ButtonComponent.vue";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "ModalComponent",
  data() {
    return {
      showModal: false,
      author: null,
      title: null,
      date_finished: null,
      registered_by: null,
      error: null,
    };
  },
  props: {
    header: String,
  },
  components: { ButtonComponent },
  methods: {
    async addNewBook() {
      try {
        if (!this.author || !this.title) {
          this.error = "Author and Title are required!";
        } else {
          const postObj = {
            author: this.author,
            title: this.title,
            date_finished: this.date_finished,
            registered_by: this.user.username,
          };
          await axios.post("books", postObj);

          this.showModal = false;
        }
      } catch (error) {
        if (error.response.status === 403) {
          this.error = "You are not authorized. Please log in again";
        }
        alert(
          "Uh-oh! Something went wrong. Our devs are looking into it right now!"
        );
      }
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h3 {
  text-align: center;
}

label {
  margin-bottom: 2px;
  margin-top: 2px;
}

input.text {
  padding-top: 5px;
  padding-bottom: 5px;
  border: black solid 0.8px;
  border-radius: 10px;
}

input.date {
  padding-top: 5px;
  padding-bottom: 5px;
  border: black solid 0.8px;
  border-radius: 10px;
}
.buttonComponent {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.3);
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  border-radius: 16px;
  padding: 25px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.8s;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(-50%) translateX(100vw);
}

.button-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.error {
  text-align: center;
  background: rgb(231, 174, 174);
  padding: 5px;
  border-radius: 8px;
}
</style>
