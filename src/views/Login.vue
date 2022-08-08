<template>
  <div class="page-container">
    <div class="container">
      <div class="sub-container">
        <img :src="bookSVG" class="shelves" />

        <div class="welcome">Welcome back!</div>
        <p class="login-text">Login to your account.</p>

        <form @submit.prevent="login">
          <label>Username</label>
          <input
            v-model="username"
            type="username"
            placeholder="username"
            required
          />

          <label class="pass">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="password"
            required
          />

          <button type="submit">Login</button>
        </form>

        <div class="bottom-text">
          Don't have an account?
          <span> <router-link to="/register">Sign up now!</router-link></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

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
        const response = await axios.post("auth/login", {
          username: this.username,
          pass: this.password,
        });
        if (response) {
          const userData = await response.data;
          await this.$store.dispatch("SET_USER", userData);
          sessionStorage.setItem("user", JSON.stringify(userData));
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${userData.accessToken}`;
          await this.$router.push("/");
        }
      } catch (error) {
        console.log(error);
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
  height: 70%;
  width: 40%;
  border: 1px solid rgb(214, 197, 215);
  display: flex;
  justify-content: center;
  padding: 10px;
  background: #fafafa;
  box-shadow: 6px 6px grey;
}
.shelves {
  width: 150px;
  height: 140px;
}
.sub-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.welcome {
  font-size: 20px;
  margin-top: 25px;
  font-weight: 600;
}
.login-text {
  font-size: 18px;
}
.bottom-text {
  margin-top: 20px;
}
form {
  display: flex;
  flex-direction: column;
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
  border: 2px solid #c4c1e0;
  background: whitesmoke;
}

button:hover {
  background: #c4c1e0;
  border: 2px solid white;
  cursor: pointer;
  color: white;
  margin-bottom: 4px;
}

input {
  margin-bottom: 10px;
}
</style>
