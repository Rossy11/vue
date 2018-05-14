<template>
  <div>
    <img :src="msg" alt="">
  </div>
</template>

<script>
  import bus from '../router/eventBus';

  export default {
    name: 'detail',
    data () {
      return {
        msg: ''
      }
    },
    created(){
      //bus.$on('userDefinedEvent',this.setMsg);
      //this.msg = this.$route.query.userInfo; //接受传过来的值
      this.msg=this.imgSrc;
    },
    methods: {
      setMsg(message){
        console.log(message)
        this.msg = message;
      }
    },
    computed: {
      imgSrc () {
        return this.$store.state.headImg; //vuex接受值
      }
    },
    beforeDestroy () {
      //bus.$off('userDefinedEvent',this.setMsg)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  button {
    background: red;
  }
</style>
