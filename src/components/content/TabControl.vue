<template>
  <div id="tab-control">
    <div
      v-for="(item,index) in titles"
      :key="item"
      class="tab-control-item"
      @click="tabClick(index)"
    >
      <span :class="{'active':index===currentIndex}">{{item}}</span>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0
    };
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    tabClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick',this.currentIndex);
      this.$bus.$emit('tabClick',this.currentIndex);
    }
  },
};
</script>

<style scoped>
#tab-control {
  display: flex;
  font-size: 14px;
  text-align: center;
  height: 40px;
  background-color: white;
}
.tab-control-item {
  flex: 1;
  line-height: 44px;
  position: relative;
}
.tab-control-item span.active {
  color: var(--color-high-text);
  border-bottom: 3px solid var(--color-high-text);
  transition:all 0.2s ease;
  padding: 8px;
}
.tab-control-item span {
}

</style>
