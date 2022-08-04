<template>
  <NavBar />

  <router-view></router-view>
</template>

<script>
import NavBar from "./components/NavBar.vue";
export default {
  name: "App",
  components: { NavBar },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
