<template>
  <div id="apps">
    <div class="top">Rossy1</div>
    <div class="leftNav">
      <router-link to="/HelloWorld">链接一</router-link>
      <router-link to="/second">链接二</router-link>
    </div>
    <div class="rightCon">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld'
  import second from './components/second'
  import detail from './components/detail'

  export default {
    name: 'Apps',
    components: {
      HelloWorld,
      second,
      detail
    },
    data () {
      return {

      }
    }
  }
</script>

<style>
  html, body {
    width: 100%;
    height: 100%;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  a{
    display: block;
    text-decoration: none;
    text-align: center;
    border-bottom: 1px #ddd solid;
  }

  #apps {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
  }

  .top {
    height: 50px;
    background: #cc0000;
    color: #fff;
    line-height: 50px;
    padding-left: 20px;
    font-size: 18px;
    position: fixed;
    width: 100%;
    z-index: 100;
  }

  .leftNav {
    position: fixed;
    width: 150px;
    height: 100%;
    padding-top: 50px;
    border-right: 1px #ccc solid;
    z-index: 10;
  }

  .leftNav a {
    line-height: 50px;
    color: #000;
    display: block;
  }

  .rightCon {
    padding:50px 30px 0 180px;
    margin:0 auto;
  }
  .list-active{
    background: #ddd;
  }
</style>
