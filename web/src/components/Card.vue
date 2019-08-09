<template>
  <div class="card bg-white p-3 mt-3">
    <div class="card-header d-flex ai-center" :class="{'border-bottom': !simple, 'pb-3': !simple}">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <strong class="fs-xl flex-1 px-2">{{title}}</strong>
      <i class="iconfont icon-menu-s" v-if="!simple"></i>
    </div>
    <div class="card-body pt-3">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    simple: {
      type: Boolean
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";

.card {
  border-bottom: 1px solid $border-color;
}
</style>
