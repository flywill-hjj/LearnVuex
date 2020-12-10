<template>
  <div>
    <!-- 在template区域中this是可以省略的 -->
    <!-- <h3>当前最新的count值为:{{ $store.state.count }}</h3> -->
    <h3>{{ $store.getters.showNum }}</h3>
    <button @click="btnHandler1">+1</button>
    <button @click="btnHandler2">+N</button>
    <button @click="btnHandler3">+1 Async</button>
    <button @click="btnHandler4">+N Async</button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    btnHandler1() {
     this.$store.commit('add')
    },
    btnHandler2() {
      //commit 的作用就是调用某个mutations函数
     this.$store.commit('addN',3)
    },
    //异步地让count自增 +1
    btnHandler3(){
      //这里的dispatch函数，专门用来触发action
      this.$store.dispatch('addAsync')
    },
    btnHandler4(){
      this.$store.dispatch('addNAsync',5)
    }
  },
};
</script>
