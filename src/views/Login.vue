<template>
  <div class="container">
    <div class="sub">
      <div>Welcome to Little World Of Books!!</div>
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
          <span> <router-link to="/register">Sign up!</router-link></span>
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
    };
  },

  methods: {
    async login() {
      console.log(api);
      try {
        const response = await axios.post("http://localhost:9000/auth/login", {
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
.container {
  margin: 0 auto;
  height: 90vh;
  width: 50vw;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.sub {
  position: relative;
  top: 25%;
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
