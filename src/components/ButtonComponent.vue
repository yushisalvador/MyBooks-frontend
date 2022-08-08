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
    onClick() {
      this.$emit("btn-click");
    },
  },
};
</script>

<style scoped>
.btn {
  border: 2px solid white;
  background: #cdbedd;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 15px;
  padding-right: 15px;
  margin: 4px;
  border-radius: 4px;
}

.btn:hover {
  background: #c1a0ef;
  border: 2px solid rgb(234, 198, 222);
  cursor: pointer;
  color: white;
}
</style>
