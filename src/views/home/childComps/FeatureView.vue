<template>
  <div id="feature">
    <a href="http://act.mogujie.com/zzlx67">
      <img src="~assets/img/home/recommend_bg.jpg" @load="finishPopLoad"/>
    </a>
  </div>
</template>

<script>
export default {
  name: "FeatureView",
  methods:{
    finishPopLoad(){
      this.$emit("finishPopLoad")
    }
  }
};
</script>

<style scoped>
#feature img {
  width: 100%;
}
</style>
