<template>
  <nav v-if="!user" class="not-logged-in">
    <div class="not-logged-in-nav">
      <div class="login option">
        <router-link to="/" class="menu all">All Books</router-link>
        <router-link to="/login" class="menu"> Login</router-link>
      </div>
      <div class="signup option">
        <router-link to="/register" class="menu"> Signup</router-link>
      </div>
    </div>
  </nav>
  <nav v-if="user" class="logged-in">
    <div class="navi">
      <router-link to="/mybooks" class="menu">My Books</router-link>
      <router-link to="/" class="menu">All Books</router-link>

      <div class="out-button" @click="logout">Logout</div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "NavBar",
  methods: {
    logout() {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      this.$store.dispatch("user", null);
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

.logged-in {
  background: #d7acd4;
  display: flex;
  flex-direction: row;
  justify-content: end;
  padding-bottom: 10px;
  padding-top: 15px;
}

.out-button {
  margin-right: 30px;
}
.out-button:hover {
  color: white;
  cursor: pointer;
}
.all {
  margin-right: 10px;
}

.not-logged-in {
  background: pink;
  padding-top: 10px;
  display: flex;
  justify-content: end;
}

.not-logged-in-nav {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.signup {
  margin-right: 10px;
}

.option {
  padding-bottom: 5px;
  font-size: 20px;
}

.menu:hover {
  cursor: pointer;
  color: white;
}

.menu {
  text-decoration: none;
  color: black;
}

.navi {
  display: flex;
  gap: 30px;
}
</style>
