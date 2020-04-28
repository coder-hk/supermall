<template>
  <div id="tabbar" :style='barColor'>
    <slot ></slot>
  </div>
</template>

<script>
  export default {
    name:'TabBar',
    props:{
      defineBarColor:{
        type:String,
        default:"rgb(245,245,245)"
      },
      reg1:{
        type:RegExp,
        default(){
					return /^$/
				}
      }
    },
    computed:{
      barColor(){
        return this.reg1.test(this.defineBarColor)?{background:"rgb(245,245,245)"}:{background:this.defineBarColor};
      }
    }
  }
</script>

<style scoped>
  #tabbar{
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 -2px 0px rgba(200,200,200,.5);
  }

</style>
