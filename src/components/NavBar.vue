<template>
  <nav class="navbar">
    <!-- Always shown -->
    <router-link to="/" class="menu option">All books</router-link>
    <!-- Shown if logged out -->
    <router-link v-if="!user" to="/login" class="menu option">
      Login
    </router-link>
    <router-link v-if="!user" to="/register" class="menu option">
      Register
    </router-link>
    <!-- Shown if logged in -->
    <router-link v-if="user" to="/mybooks" class="menu option">
      My books
    </router-link>
    <div v-if="user" class="out-button menu" @click="logout">Logout</div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "NavBar",
  methods: {
    logout() {
      this.$store.dispatch("SET_USER", null);
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      this.$router.push("/login");
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>

<style scoped>
nav {
  margin-bottom: 20px;
}

.navbar {
  margin-top: 10px;
  padding-top: 10px;
  display: flex;
  gap: 20px;
  justify-content: end;
}

.menu {
  text-decoration: none;
  color: black;
  padding: 10px 20px;
  background: #c4c1e0;
  border: 1px solid #885df1;
  border-radius: 25px;
  padding-bottom: 5px;
  font-size: 20px;
}
.menu:hover {
  cursor: pointer;
  color: white;
}

.active {
  background: rgb(225, 225, 234);
  color: rgb(112, 3, 112);
  border: 2px solid rgb(112, 3, 112);
}

.out-button {
  margin-right: 30px;
}
.out-button:hover {
  color: white;
  cursor: pointer;
}
</style>
