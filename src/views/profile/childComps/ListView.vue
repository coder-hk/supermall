<template>
    <div id="list">
      <div v-for="(item, index) in listData" :key="index" class="item" @click="jumpToDemo(item.path)">
        <span class="icon">
          <img src="~assets/img/profile/cube.svg" v-if="item.icon.indexOf('#') == -1">
          <svg :fill="item.iconColor" v-else><use :xlink:href="item.icon"></use></svg>

        </span>
        <div class="info" >{{item.info}}</div>
      </div>
    </div>
</template>

<script>
	export default {
		name: "ListView",
    props: {
		  listData: {
		    type: Array,
        default: function () {
          return []
        }
      }
    },
    methods:{
      jumpToDemo(target){
        if ( target )
        this.$router.push(target)
      }
    }
	}
</script>

<style scoped>
  #list {
    background-color: #fff;
    font-size: 15px;
    color: #333;
  }

  #list .item {
    height: 44px;
    line-height: 44px;
    position: relative;
    border-bottom: 1px solid rgba(100, 100, 100, .1);
  }

  .icon svg {
    width: 18px;
    height: 18px;
  }
  .icon img{
    width: 22px;
    height: 50%;
  }
  .item .icon {
    margin-top: 10px;
    position: absolute;
    left: 15px;
    top: -5px;
  }

  .item .info {
    margin-left: 40px;
    padding-left: 5px;
  }

  #list .item:last-child{
    border-bottom: none;
  }

</style>
