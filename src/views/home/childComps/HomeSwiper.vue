<template>
  <swiper ref="swiper" v-if="banners.length">
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" @load='swiperImgLoad'/>
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";
export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  data(){
    return{
        isOneLoad:false
    }
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    stopTimer() {
      this.$refs.swiper.stopTimer();
    },
    startTimer() {
      if (this.$refs.swiper) {
        this.$refs.swiper.startTimer();
      }
    },
    swiperImgLoad(){
      if(!this.isOneLoad){
        this.$emit('swiperImgLoad')
        this.isOneLoad = true
      }
    }
  }
};
</script>

<style scoped>
</style>
