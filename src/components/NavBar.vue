<template>
  <nav class="not-logged-in">
    <div class="not-logged-in-nav" v-for="option in navLinks" :key="option.id">
      <router-link :to="`${option.link}`" class="menu all">{{
        option.name
      }}</router-link>
    </div>
    <div v-if="user" class="out-button menu" @click="logout">Logout</div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "NavBar",

  data() {
    return {
      notAuthenticatedNav: [
        {
          id: 1,
          name: "All Books",
          link: "/",
        },
        {
          id: 2,
          name: "Login",
          link: "/login",
        },
        { id: 3, name: "Register", link: "/register" },
      ],
      authenticatedNav: [
        {
          id: 1,
          name: "All Books",
          link: "/",
        },
        {
          id: 2,
          name: "My books",
          link: "/mybooks",
        },
      ],
      navLinks: null,
    };
  },
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
  created() {
    if (!this.user) {
      this.navLinks = this.notAuthenticatedNav;
    } else {
      this.navLinks = this.authenticatedNav;
    }
  },
};
</script>

<style scoped>
nav {
  margin-bottom: 20px;
}

.logged-in {
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
  margin-top: 10px;
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
  padding: 10px 20px;
  background: #c4c1e0;
  border: 1px solid #885df1;
  border-radius: 25px;
}

.navi {
  display: flex;
  gap: 30px;
}
</style>
