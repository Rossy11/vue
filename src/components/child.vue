<template>
  <div>
    <button @click="dataTofather">子组件传值到父组件</button>
    <div>父组件传过来的值：{{fatherData}}</div>
    <slot name="my-header">头部默认值</slot>
    <slot name="my-body">主体默认值</slot>
    <slot name="my-footer">尾部默认值</slot>
  </div>
</template>

<script>
  export default {
    name: 'child',
    props: ['fatherData'],
    data () {
      return {
        message: '啦啦啦啦'
      }
    },
    methods: {
      dataTofather(){
        this.$emit("send", this.message,true)
      }
    }
  }
</script>
