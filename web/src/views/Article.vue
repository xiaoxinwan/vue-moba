<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <i class="iconfont icon-back text-title-1" @click="handleBack()"></i>
      <strong class="flex-1 text-flow pl-2 text-title-1">{{model.title}}</strong>
      <div class="text-grey fs-xs mr-2">2019-08-07</div>
    </div>
    <div v-html="model.body" class="px-3 article-body fs-lg"></div>
    <div class="px-3 border-top py-3">
      <div class="d-flex ai-center">
        <i class="iconfont icon-xiangguan"></i>
        <strong class="text-title-1 fs-xl ml-2">相关资讯</strong>
      </div>
      <div class='p-3'>
        <router-link
          tag="div"
          :to="`/articles/${item._id}`"
          v-for="item in model.related"
          :key="item._id"
          class="mt-2 text-flow"
        >
          {{item.title}}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true }
  },
  data() {
    return {
      model: null
    };
  },
  watch: {
    id() {
      this.fetch()
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
    },
    handleBack() {
      this.$router.go(-1)
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss">
.page-article {
  .icon-xiangguan {
    font-size: 2rem;
  }
  .article-body {
    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: auto;
    }
  }
}
</style>
