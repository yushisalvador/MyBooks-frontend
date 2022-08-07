<template>
  <div class="page-wrapper">
    <div class="container">
      <div class="sub">
        <div class="intro-texts">
          <div class="name-app">LIBRARY</div>
          <div>Join Library and track your books!</div>
          <sub>It takes less than a minute to create an account. </sub>
          <p class="errror">{{ error }}</p>
        </div>

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
  </div>
</template>

<script>
import axios from "axios";

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
      try {
        await axios.post("auth/register", {
          username: this.username,
          pass: this.password,
        });
        alert("succesfully signed up! Redirecting you to our login screen!");
        await this.$router.push("/login");
      } catch (error) {
        const status = error.response.status;
        console.log(error);
        if (status === 409) {
          this.error =
            "A user with this username already exists. Please choose a different username.";
        } else if (status === 401) {
          this.error = "Username and password are required!";
        } else {
          alert("Failed to sign up. This is likely due to a server error.");
        }
      }
    },
  },
};
</script>

<style scoped>
.page-wrapper {
  height: 100vh;
  width: 100vw;
}

.name-app {
  font-size: 50px;
}

.intro-texts {
  text-align: center;
}

.error {
  font-size: 16px;
  text-align: center;
  font-weight: 400;
  width: 50%;
}

.container {
  margin: 0 auto;
  margin-top: 30px;
  height: 70%;
  width: 40%;
  border: 2px solid rgb(214, 197, 215);
  display: flex;
  flex-direction: row;
  justify-content: center;
  background: #fafafa;
  box-shadow: 6px 6px grey;
}

.sub {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
form {
  width: 50%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 10px;
}

input {
  margin: 4px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
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

@media only screen and (max-width: 900px) {
  .container {
    width: 90%;
    height: 80%;
    margin-top: 40px;
  }
}
</style>
