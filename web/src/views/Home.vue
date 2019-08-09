<template>
  <div class="home">
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/index1.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/index2.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/index3.jpeg" alt />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
    </swiper>

    <div class="nav-icons bg-white mt-3 pt-3 text-center">
      <div class="d-flex flex-wrap fs-sm">
        <div class="nav-item mb-3">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-story"></i>
          <div class="py-2">故事站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-mall"></i>
          <div class="py-2">周边商城</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-experience"></i>
          <div class="py-2">体验服</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-new-comer"></i>
          <div class="py-2">新人专区</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-glory"></i>
          <div class="py-2">荣耀·传承</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-same"></i>
          <div class="py-2">同人社区</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-camp"></i>
          <div class="py-2">王者营地</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-public"></i>
          <div class="py-2">公众号</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of icons -->
    <list-card title="新闻资讯" icon="Menu" :categories="newsCats">
      <template #items="{category}">
        <router-link
          tag="div"
          :to="`/articles/${item._id}`"
          class="py-2 d-flex jc-center py-2 fs-lg mx-1"
          v-for="(item, i) in category.newsList"
          :key="i"
        >
          <span class="text-title">[{{item.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-flow pr-2">{{item.title}}</span>
          <span class="text-grey-date fs-sm">{{item.createdAt | date}}</span>
        </router-link>
      </template>
    </list-card>
    <list-card title="英雄列表" icon="card-hero" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
          <router-link
            tag="div"
            :to="`/heroes/${item._id}`"
            class="p-2"
            style="width: 20%;"
            v-for="(item, i) in category.heroList"
            :key="i"
          >
            <img :src="item.avatar" class="w-100" />
            <span>{{item.name}}</span>
          </router-link>
        </div>
      </template>
    </list-card>

    <m-card title="精彩视频" icon="video"></m-card>
    <m-card title="图文攻略" icon="tuwen"></m-card>
  </div>
</template>

<script>
import MCard from "../components/Card";
import ListCard from "../components/ListCard";
import dayjs from "dayjs";

export default {
  components: {
    MCard,
    ListCard
  },
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home"
        },
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        loop: true
      },
      newsCats: [],
      heroCats: []
    };
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
    },
    async fetchHeroCats() {
      const res = await this.$http.get("heroes/list");
      this.heroCats = res.data;
    }
  },
  created() {
    this.fetchNewsCats();
    this.fetchHeroCats();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";

.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($map: $colors, $key: "white");
    &.swiper-pagination-bullet-active {
      background: map-get($map: $colors, $key: "info");
    }
  }
}

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>

