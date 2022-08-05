<template>
  <div class="container">
    <div class="sub">
      <div>Join Library and track your books!</div>
      <sub>It takes less than a minute to create an account. </sub>
      <form @submit.prevent="register">
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

        <button type="submit">Sign up</button>
      </form>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import axios from "axios";

const api = process.env.VUE_APP_API_URL;

export default {
  name: "RegistrationPage",
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async register() {
      if (this.username.length < 5 || this.password.length < 5) {
        alert("username & password must contain at least 6 characters!");
      }
      const router = useRouter();
      try {
        const req = await axios.post(`${api}/auth/register`, {
          username: this.username,
          pass: this.password,
        });
        if (req.status === 201) {
          alert("succefully signed up! Redirecting you to our login screen!");
          await router.push("/login");
        } else if (req.status === 409) {
          this.error =
            "A user with this username already exists. Please choose a different username.";
        }
      } catch {
        alert("Failed to sign up. This is likely due to a server error.");
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
