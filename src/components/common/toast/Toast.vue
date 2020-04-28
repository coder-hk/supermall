<template>
  <div id="toast" v-if="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name:'Toast',
    data() {
      return {
        message: '',
        isShow:false
      }
    },
    methods:{
      popup(msg="默认信息",duration=2000){
        this.message = msg
        this.isShow = true
        setTimeout(()=>{
          this.message = ''
          this.isShow = false
        },duration)
      }
    }
  }
</script>

<style scoped>
  #toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 10px 15px;
    color: #fff;
    background-color: #000000;
    border-radius: 6px;
    font-weight:bold;
  }
</style>
