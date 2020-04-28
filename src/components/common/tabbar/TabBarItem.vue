<template>
  <div class="tabbar-item" @click="itemClick" >
    <div v-if="!isActive">
      <slot name='item-svg'></slot>
    </div>
    <div v-else>
      <slot name='item-svg-active'></slot>
    </div>
    <div :style="ActiveCss">
      <slot name
      ='item-text'></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name:'tabbarItem',
    data(){
      return{
      }
    },
    props:{
      path:String,
      activeColor:{
        type:String,
        default:"#ff0000"
      },
      reg2:{
        type:RegExp,
        default(){
          return /^$/
        }
      }
    },
    methods:{
      itemClick(){
        try{
        this.$router.replace(this.path);
        }catch(e){
        }
        //console.log(`这是${this.path}页面`);
      }
    },
    computed:{
      isActive(){
        return this.$route.path.indexOf(this.path) !== -1
      },
      ActiveCss(){
        return this.isActive? this.reg2.test(this.activeColor)?{color:"#ff0000"}:{color:this.activeColor}:{};

      }
    }
  }
</script>

<style scoped>
.tabbar-item{
  flex: 1;
  text-align: center;
  font-size: 14px;
  height: 45px;
}
.tabbar-item img{
  width: 24px;
  height: 24px;
  margin-top:3px;
  vertical-align: middle;
}

</style>
