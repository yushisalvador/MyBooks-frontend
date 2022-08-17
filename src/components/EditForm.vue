<template>
  <p v-if="error" class="error">{{ error }}</p>
  <form>
    <label>Date Finished</label>
    <input type="date" v-model="date_finished" />
    <ButtonComponent @btn-click="editDate(bookId)" text="Submit" />
  </form>
</template>

<script>
import ButtonComponent from "./ButtonComponent.vue";

export default {
  name: "EditForm",
  data() {
    return {
      date_finished: null,
    };
  },
  props: {
    bookId: Number,
  },
  methods: {
    editDate(id) {
      return this.$store.dispatch("UPDATE_BOOK", {
        id: id,
        payload: {
          date_finished: this.date_finished,
        },
      });
    },
  },
  components: { ButtonComponent },
  computed: {
    error() {
      return this.$store.getters.errorMessage;
    },
  },
};
</script>

<style scoped>
input {
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 8px;
  padding-right: 8px;
}

.error {
  text-align: center;
  background: rgb(231, 174, 174);
  padding: 5px;
  border-radius: 8px;
}
</style>
