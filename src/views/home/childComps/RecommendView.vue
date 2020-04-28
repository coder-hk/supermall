<template>
  <div id="recommend-view">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt />
      </a>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
#recommend-view {
  display: flex;
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 15px 0 15px;
  border-bottom: 10px solid #eee;
}
.recommend-item {
  flex: 1;
}
#recommend-view img {
  width: 60px;
  height: 60px;
  margin-bottom: 8px;
}
</style>