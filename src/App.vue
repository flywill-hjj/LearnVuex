<template>
  <div>
    <my-addition></my-addition>
    <p>-------------------------------</p>
    <my-subraction></my-subraction>
  </div>
</template>
<script>
import Addition from "./components/Addition.vue";
import Subtraction from "./components/Subtraction.vue";

export default {
  data() {
    return {};
  },
  components: {
    "my-addition": Addition,
    "my-subraction": Subtraction,
  },
};
</script>
