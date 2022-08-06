<template>
  <div class="page-container">
    <div class="container">
      <div class="sub-container">
        <img :src="bookSVG" class="shelves" />

        <div>Welcome back!</div>
        <p>Login to your Little World Of Books account.</p>
        <form @submit.prevent="login">
          <label>Username</label>
          <input
            v-model="username"
            type="username"
            placeholder="username"
            required
          />

          <label>Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="password"
            required
          />

          <button type="submit">Login</button>
        </form>

        <div>
          <div>
            Don't have an account?
            <span> <router-link to="/register">Sign up now!</router-link></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const api = process.env.VUE_APP_API_URL;

export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
      error: "",
      bookSVG: require(".././assets/shelves.svg"),
    };
  },

  methods: {
    async login() {
      try {
        const response = await axios.post(`${api}/auth/login`, {
          username: this.username,
          pass: this.password,
        });
        sessionStorage.setItem("user", response.data.username);
        sessionStorage.setItem("token", response.data.accessToken);
        this.$store.dispatch("user", response.data);

        if (response.status === 200) {
          await this.$router.push("/");
        } else if (response.status === 401) {
          this.error =
            "Could not verify user! Please make sure the password and username are correct.";
        }
      } catch {
        alert(
          "A server error has occured. The devs are looking into it right now!"
        );
      }
    },
  },
};
</script>

<style scoped>
.page-container {
  height: 100vh;
}
.container {
  margin: 0 auto;
  margin-top: 30px;
  height: 60vh;
  width: 20vw;
  border: 1px solid rgb(214, 197, 215);
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px;
  background: rgb(227, 212, 232);
}
.shelves {
  width: 150px;
  height: 140px;
}
.sub-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
form {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

input {
  margin: 4px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 10px;
}

button {
  margin: 4px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 18px;
}
</style>
