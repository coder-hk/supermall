<template>
  <div ref='wrapper'>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name:'Scroll',
    data(){
      return{
        scroll:{}
      }
    },
    props:{
      probeType:{
        type:Number,
        default:0
      },
      data:{
        type:Array,
        default:()=>{
          return []
        }
      }
    },
    mounted() {
        this.scroll=new BScroll(this.$refs.wrapper,{
          probeType:this.probeType,
          click:true,
          pullUpLoad:true
        })
        if(this.probeType == 2 || this.probeType == 3){
          this.scroll.on('scroll',position=>{
            this.$emit('distanceY',position)
          })
        }

        this.scroll.on('pullingUp',()=>{
          this.$emit('pullingUp')
        })

    },
    methods:{
      backTo(x,y,time=500){
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      refresh(){
        this.scroll && this.scroll.refresh()
      },
      getPositionY(){
        return this.scroll && this.scroll.y
      }
    },
    watch: {
      data(newValue) {
        setTimeout(this.refresh,100)
      }
    },
  }
</script>

<style scoped>
  .content{
    overflow: hidden;
  }
</style>
