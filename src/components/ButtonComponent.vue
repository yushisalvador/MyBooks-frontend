<template>
  <button class="btn">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "ButtonComponent",
  props: {
    text: String,
    color: String,
  },
  methods: {
    onClick() {},
  },
};
</script>
