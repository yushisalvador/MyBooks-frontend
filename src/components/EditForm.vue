<template>
  <form>
    <label>Date Finished</label>
    <input type="date" v-model="date_finished" />
    <button @click.prevent="editDate(bookId)">Submit</button>
  </form>
</template>

<script>
import axios from "axios";
const api = process.env.VUE_APP_API_URL;

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
    async editDate(id) {
      const res = await axios.put(`${api}/books?id=${id}`, {
        date_finished: this.date_finished,
      });
      if (res.status === 200) {
        alert("successfully edited!");
      }
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

button {
  margin-top: 10px;
  padding-left: 8px;
  padding-right: 8px;
  background: rgb(244, 206, 244);
  border: 1px white solid;
}
</style>
