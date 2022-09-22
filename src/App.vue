<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import {getters} from './contract'
import init from './init'

export default {
  metaInfo() {
    return {
      title: "OpenOcean｜Decentralized Full Aggregation Protocol｜All For Your Trading",
      meta: []
    }
  },
  computed: {
    ...getters,
  },
  data() {
    return {
      isRouterAlive: true,
    }
  },
  mounted() {
    document.body.classList.add('lang-' + this.$i18n.locale.toLowerCase());
    window.reloadPage = (flag)=>{
      if(flag) {
        window.location.reload();
      } else {
        this.isRouterAlive = false;
        this.$nextTick(() => {
          this.isRouterAlive = true;
          // init({fullPath: window.location.pathname});
          // alert('app init')
          init();
        })
      }
    }
  }
}
</script>

<style>
body {
  font-size: 10pt;
  background: var(--background-root);
  color: var(--color);
  font-family: Roboto;
  font-weight: 400;
}

@media (min-width: 750px) {
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  ::-webkit-scrollbar-track-piece {
    background-color: transparent;
    -webkit-border-radius: 0;
  }

  ::-webkit-scrollbar-thumb:vertical {
    height: 4px;
    background-color: var(--background-scroll);
    -webkit-border-radius: 0;
  }

  ::-webkit-scrollbar-thumb:horizontal {
    width: 4px;
    background-color: var(--background-scroll);
    -webkit-border-radius: 0;
  }
}
</style>
