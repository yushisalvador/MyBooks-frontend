<template>
  <div class="nav">
    <ButtonComponent text="My Books" />
    <ButtonComponent text="All Books" />
  </div>
</template>

<script>
import ButtonComponent from "./ButtonComponent";
export default {
  name: "NavMenu",
  components: { ButtonComponent },
};
</script>

<style scoped>
.nav {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 20px;
  width: 100vw;
}
</style>
