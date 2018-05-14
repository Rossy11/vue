<template>
  <div>
    <button @click="clickBtns">点击跳转</button>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        msg: ''
      }
    },
    methods: {
      clickBtns(val){
        this.$router.push({name: 'HelloWorld'})
      }
    }
  }
</script>


<style>
  button{
    margin-left: 100px;
    margin-top: 100px;
  }
</style>
