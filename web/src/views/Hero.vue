<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-black pt-3 pb-2 px-3 d-flex ai-center">
      <img src="../assets/logo.png" height="30" />
      <div class="px-2 flex-1 text-white">
        <strong>王者荣耀</strong>
        <strong class="ml-4 fs-lg">攻略站</strong>
      </div>
      <router-link tag="div" to="/" class="text-white">更多英雄 &gt;</router-link>
    </div>
    <div class="top" :style="{'background-image': `url(${model.banner})`}">
      <div class="info text-white p-3 d-flex flex-column h-100 jc-end">
        <div class="fs-sm">{{model.title}}</div>
        <h2>{{model.name}}</h2>
        <div class="fs-sm">{{model.categories.map(v => v.name).join('/')}}</div>
        <div class="d-flex jc-between pt-2">
          <div class="scores d-flex ai-center" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-primary">{{model.scores.difficult}}</span>
            <span>技能</span>
            <span class="badge bg-blue">{{model.scores.skills}}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{model.scores.attack}}</span>
            <span>生存</span>
            <span class="badge bg-dark">{{model.scores.survive}}</span>
          </div>
          <router-link to="/" tag="span" class="text-skin fs-sm">皮肤：7 &gt;</router-link>
        </div>
      </div>
    </div>

    <div>
      <div class="px-3 bg-white">
        <div class="nav d-flex jc-around pt-3 pb-2 border-bottom">
          <div class="nav-item active">
            <div class="nav-link">英雄初识</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">进阶攻略</div>
          </div>
        </div>
      </div>
      <swiper>
        <swiper-slide>
          <div>
            <div class="p-3 bg-white border-bottom">
              <div class="d-flex">
                <router-link tag="button" to="/" class="flex-1 btn btn-lg">
                  <i class="iconfont icon-play text-primary"></i>
                  英雄介绍视频
                </router-link>
                <router-link tag="button" to="/" class="flex-1 btn btn-lg ml-2">
                  <i class="iconfont icon-photo text-primary"></i>
                  一图识英雄
                </router-link>
              </div>

              <div class="skills bg-white mt-4">
                <div class="d-flex jc-around">
                  <img
                    class="icon"
                    :src="item.icon"
                    :class="{active: currentSkillIndex === i}"
                    v-for="(item, i) in model.skills"
                    :key="item.name"
                    width="60"
                    height="60"
                    @click="currentSkillIndex = i"
                  />
                </div>

                <div v-if="currentSkill">
                  <div class="d-flex pt-4 pb-3">
                    <h3 class="m-0">{{currentSkill.name}}</h3>
                    <span
                      class="text-skin ml-4"
                    >(冷却值：{{currentSkill.delay}} 消耗：{{currentSkill.cost}})</span>
                  </div>
                  <p>{{currentSkill.description}}</p>
                  <div class="border-bottom"></div>
                  <p class="text-grey-date">小提示：{{currentSkill.tips}}</p>
                </div>
              </div>
            </div>

            <m-card simple icon="tuwen" title="出装推荐" class="hero-items mb-4">
              <div class="fs-xl">顺风出装</div>
              <div class="d-flex jc-around text-center mt-3">
                <div v-for="item in model.items1" :key="item.name">
                  <img :src="item.icon" alt class="icon" />
                  <div class="fs-xs">{{item.name}}</div>
                </div>
              </div>
              <div class="border-bottom mt-3"></div>
              <div class="fs-xl mt-3">逆风出装</div>
              <div class="d-flex jc-around text-center mt-3">
                <div v-for="item in model.items2" :key="item.name">
                  <img :src="item.icon" alt class="icon" />
                  <div class="fs-xs">{{item.name}}</div>
                </div>
              </div>
            </m-card>
            <m-card simple icon="tuwen" title="使用技巧">{{model.usageTips}}</m-card>
            <m-card simple icon="tuwen" title="对抗技巧">{{model.battleTips}}</m-card>
            <m-card simple icon="tuwen" title="团战思路">{{model.teamTips}}</m-card>
            <m-card simple icon="card-hero" title="英雄关系">
              <div class="fs-xl">最佳拍档</div>
              <div v-for="item in model.partners" :key="item._id" class="d-flex pt-3">
                <img :src="item.hero.avatar" height="50" />
                <p class="flex-1 m-0 ml-3">{{item.description}}</p>
              </div>
              <div class="border-bottom mt-3"></div>
            </m-card>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import MCard from "../components/Card";
export default {
  props: {
    id: { required: true }
  },
  components: { MCard },
  data() {
    return {
      model: null,
      currentSkillIndex: 0
    };
  },
  computed: {
    currentSkill() {
      return this.model.skills[this.currentSkillIndex];
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`heroes/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.page-hero {
  .top {
    height: 46vw;
    background: #fff no-repeat top center;
    background-size: auto 100%;
  }
  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    .scores {
      .badge {
        margin: 0 0.25rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        line-height: 0.9rem;
        text-align: center;
        border-radius: 50%;
        font-size: 0.6rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
  }
  .skills {
    img.icon {
      width: 5.3846rem;
      height: 5.3846rem;
      border: 3px solid map-get($map: $colors, $key: "white");

      &.active {
        border-color: map-get($map: $colors, $key: "primary");
        border-radius: 50%;
      }
    }
  }
  .hero-items {
    img.icon {
      width: 3.9231rem;
      height: 3.9231rem;
      border-radius: 50%;
    }
  }
}
</style>
