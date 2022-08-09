<template>
  <div class="page-container">
    <div class="container">
      <div class="sub-container">
        <img :src="bookSVG" class="shelves" />

        <div class="welcome">Welcome back!</div>
        <p class="login-text">Login to your account.</p>
        <p v-if="error" class="error">{{ error }}</p>

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
export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
      bookSVG: require(".././assets/shelves.svg"),
    };
  },
  methods: {
    login() {
      this.$store.dispatch("LOGIN_USER", {
        username: this.username,
        pass: this.password,
      });
    },
  },
  computed: {
    error() {
      return this.$store.getters.errorMessage;
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
  height: 90%;
  width: 40%;
  border: 1px solid rgb(214, 197, 215);
  display: flex;
  justify-content: center;
  padding: 10px;
  background-color: #fafafa;
  box-shadow: 6px 6px grey;
}

.error {
  font-size: 16px;
  text-align: center;
  font-weight: 400;
  width: 90%;
  background-color: rgb(231, 174, 174);
  padding: 5px;
  border-radius: 8px;
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
  background-color: whitesmoke;
}

button:hover {
  background-color: #c4c1e0;
  border: 2px solid white;
  cursor: pointer;
  color: white;
  margin-bottom: 4px;
}

input {
  margin-bottom: 10px;
}

@media only screen and (max-width: 900px) {
  .container {
    width: 85%;
    height: 86%;
    margin-top: 40px;
  }
}
</style>
