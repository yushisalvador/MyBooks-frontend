<template>
  <NavMenu />
  <Home />
</template>

<script>
import Home from "../src/views/Home";

export default {
  name: "App",
  components: { Home },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

.btn {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
  margin: 4px;
  border-radius: 8px;
}
</style>
