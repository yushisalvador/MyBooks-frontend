<template>
  <button @click="onClick" class="btn">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "ButtonComponent",
  props: {
    text: String,
    className: String,
  },
  methods: {
    onClick(e) {
      e.preventDefault();
      this.$emit("btn-click");
    },
  },
};
</script>

<style scoped>
.btn {
  border: 2px solid white;
  background-color: #cdbedd;
  padding: 8px 15px;
  margin: 4px;
  border-radius: 4px;
}

.btn:hover {
  background-color: #c1a0ef;
  border: 2px solid rgb(234, 198, 222);
  cursor: pointer;
  color: white;
}
</style>
