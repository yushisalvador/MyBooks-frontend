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
  border: 1px black solid;
  background: linear-gradient(32.95deg, #786e86 8.75%, #dba6e5 86.64%);
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 15px;
  padding-right: 15px;
  margin: 4px;
  border-radius: 4px;
}

.btn:hover {
  background: linear-gradient(32.95deg, #e0dde5 8.75%, #a56cb0 86.64%);
  border: 1px solid purple;
  cursor: pointer;
  color: white;
}
</style>
