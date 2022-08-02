<template>
  <nav v-if="!user" class="not-logged-in">
    <div class="not-logged-in-nav">
      <div class="login option">
        <router-link to="/login" class="navi"> Login</router-link>
      </div>
      <div class="signup option">
        <router-link to="/register" class="navi"> Signup</router-link>
      </div>
    </div>
  </nav>
  <nav v-if="user" class="logged-in">
    <div class="greeting">Hello, {{ user.username }}!</div>
    <div class="right">
      <div class="greeting">My Books</div>
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
      localStorage.removeItem("token");
      localStorage.removeItem("user");
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
  background: pink;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-bottom: 10px;
  padding-top: 10px;
}

.right {
  display: flex;
  gap: 30px;
}

.out-button:hover {
  color: white;
  cursor: pointer;
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

.option:hover {
  cursor: pointer;
  color: white;
}

.navi {
  text-decoration: none;
  color: black;
}
</style>
