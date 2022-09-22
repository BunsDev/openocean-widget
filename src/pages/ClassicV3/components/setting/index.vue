<template>
  <div class="advance_settings">
    <h2 class="g-dialog-title">
      <div class="g-clickable g-back-button" @click="back">
        <i class="iconfont icondrop_down"></i>
      </div>
      <span>{{ $t("exchange_advanced_settings") }}</span>
      <div class="g-clickable g-reset-button" @click="reset">
        <span>Reset</span>
      </div>
    </h2>
    <div class="advance_settings__content">
      <FoldLabel
        label="Light Mode"
        inline
        no
      >
        <CommonSwitch min :value="lightMode" @input="changeLightMode" />
      </FoldLabel>
      <FoldLabel
        v-if="walletType === 'eth'"
        :label="$t('exchange_gas_price')"
        :content="formatGasPrice"
      >
        <SlippageSelect
          v-model="gasPriceV3"
          :gas="true"
          :options="gasPriceOptionList"
        />
      </FoldLabel>
      <FoldLabel
        :label="$t('exchange_slippage_tolerance')"
        :content="`${toleranceV3}%`"
        no
      >
        <SlippageSelect
          v-model="toleranceV3"
          :options="toleranceOptions"
          inline
        />
      </FoldLabel>
      <!-- <FoldLabel
        :label="$t('exchange_liquidity_sources')"
        :content="`${dexesLength} ${$t('selected')}`"
      >
        <div class="advance-settings__dex">
          <div v-for="(item, i) in dexesList" :key="i">
            <CommonSwitch min :value="item.checked" @input="switchDex(item)" />
            <span class="advance-settings__dex__label">{{ item.name }}</span>
          </div>
        </div>
      </FoldLabel> -->
      <!-- <CustomToken
        v-if="isCustomToken"
        :list="tokenList"
        @addtoken="addtoken"
        @removetoken="removetoken"
      /> -->
    </div>
  </div>
</template>

<script>
import { isCustomToken } from "@/utils/getChains";
import * as BN from "bignumber.js";
import FoldLabel from "@/pages/ClassicV3/components/setting/FoldLabel";
import CustomToken from "@/pages/ClassicV3/components/setting/CustomToken";
import SlippageSelect from "@/pages/ClassicV3/components/setting/SlippageSelect";
import CommonSwitch from "@/pages/ClassicV3/components/setting/CommonSwitch";
import {
  contract as state,
  loadDefaultToken,
  loadLimitDefaultToken,
} from "@/contract";
import { changeTheme, getTheme, THEMES } from "@/utils/theme";

export default {
  name: "Setting",
  components: {
    FoldLabel,
    SlippageSelect,
    CommonSwitch,
    CustomToken,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const chainCode = localStorage.getItem("walletType") || "eth";
    return {
      inputHandler: null,
      customSlippage: null,
      liquiditySources: null,
      partialFillV3: null,
      toleranceV3: null,
      reward: 0,
      timer: null,
      qrshow: false,
      showComparedTo: false,
      chainCode,
      qrdata: {
        id: "",
        url: "",
      },
      gasPriceV3: null,
      dexesList: [],
      // internalVisible: false,
      liquiditySources: null,
      oldObj: null,
      defaultObj: {
        gasPriceV3: state.gasPriceOptions[0]?.ethgas.base,
        toleranceV3: "1",
        partialFillV3: false,
      },
      lightMode: getTheme() === THEMES.light
    };
  },
  watch: {
    gasPriceOptionList(e) {
      if (e.length && this.gasPriceV3) {
        this.gasPriceV3 = e[0].value + "";
      }
    },
    gasPriceV3(e) {
      if (this.walletType === "eth") {
        state.gasPrice = e;
        window.localStorage.setItem(`${this.walletType}_setting_gasPrice`, e);
      }
    },
    toleranceV3(e) {
      state.tolerance = e;
      window.localStorage.setItem(`${this.walletType}_setting_tolerance`, e);
    },
    partialFillV3(e) {
      state.partialFill = e;
      window.localStorage.setItem("setting_partialFill", e);
    }
  },
  computed: {
    isCustomToken() {
      const result = isCustomToken(this.walletType);
      return result;
    },
    gasPriceOptionList() {
      // console.log('gas:', state.gasPriceOptions);
      return state.gasPriceOptions;
    },
    formatGasPrice() {
      let gasPrice = "--";
      switch (this.walletType) {
        case "ont":
          gasPrice = "0.15 ONG";
          break;
        case "eth":
          const gasLabel = this.$t(
            "gas_" +
              (window.localStorage.getItem("gasoption") || "").toLowerCase()
          );
          gasPrice =
            gasLabel +
            "(" +
            ((this.gasPriceV3 &&
              BN(this.gasPriceV3).div(BN(10).pow(9)).toFixed(2)) ||
              "-") +
            " GWEI)";
          break;
        case "bsc":
        case "polygon":
        case "xdai":
        case "heco":
        case "avax":
        case "okex":
        case "fantom":
          gasPrice =
            ((this.gasPriceV3 &&
              BN(this.gasPriceV3).div(BN(10).pow(9)).toFixed(2)) ||
              "-") + " GWEI";
          break;
      }
      return gasPrice;
    },
    dexesLength() {
      return this.dexesList.filter((a) => {
        return +a.checked === 1;
      }).length;
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    changeLightMode() {
      this.lightMode = !this.lightMode;
      changeTheme();
    },
    getSetting() {
      return new Promise((r, j) => {
        if (!this.liquiditySources) {
          setTimeout(async () => {
            r(await this.getSetting());
          }, 200);
        } else {
          r({
            gasPrice: this.gasPriceV3,
            tolerance: this.toleranceV3,
            partialFill: this.partialFillV3,
            liquiditySources: this.liquiditySources,
          });
        }
      });
    },
    reset() {
      this.getData();
      if (this.walletType === "eth") {
        this.gasPriceV3 = this.defaultObj.gasPriceV3;
      }
      this.toleranceV3 = this.defaultObj.toleranceV3;
      this.partialFillV3 = this.defaultObj.partialFillV3;
      window.localStorage.removeItem(this.walletType + "_dexes");
      this.dexesChange(this.dexesList, 1);
    },
    back() {
      this.$emit("back");
    },
    switchDex(item) {
      item.checked = !!!item.checked;
      this.liquiditySources[item.code] = item.checked ? 1 : 0;
      window.localStorage.setItem(
        this.walletType + "_dexes",
        JSON.stringify(this.liquiditySources)
      );
    },
    switchPartialFill(e) {
      this.partialFillV3 = e;
    },
    async getData() {
      if (!this.dexesList.length) {
        this.getDexesList();
      }
      this.gasPriceV3 =
        window.localStorage.getItem(`${this.walletType}_setting_gasPrice`) ||
        this.defaultObj.gasPriceV3;
      this.toleranceV3 =
        window.localStorage.getItem(`${this.walletType}_setting_tolerance`) ||
        this.defaultObj.toleranceV3;
      this.partialFillV3 = window.localStorage.getItem("setting_partialFill")
        ? window.localStorage.getItem("setting_partialFill") == "true"
          ? true
          : false
        : this.defaultObj.partialFillV3;
      this.oldObj = JSON.parse(JSON.stringify(await this.getSetting()));
    },
    dexesChange(list, flag) {
      const map = {};
      const temp = window.localStorage.getItem(this.walletType + "_dexes");
      const dexes = (temp && JSON.parse(temp)) || {};
      // let unexchangeList = {}
      list.forEach((item) => {
        item.checked = !(dexes[item.code] == 0);
        map[item.code] = dexes[item.code] == 0 ? +dexes[item.code] : 1;
        // if(!item.checked)unexchangeList[item.code]
      });
      state.unexchangeList = this.liquiditySources = map;

      if (!flag) {
        this.changeToken();
      }
    },
    getDexesList() {
      if (this.walletType === "ont") {
        this.dexesList = [
          {
            code: "innoswap",
            index: 2,
            checked: true,
            name: "InnoSwap",
          },
        ];
        this.dexesChange(this.dexesList, 1);
        return;
      }
      this.$axios
        .get(this.walletPath + "dex", { cache: true })
        .then((res) => {
          this.dexesList = res.map((item) => {
            return Object.assign(item, {
              checked: true,
            });
          });
          this.dexesChange(this.dexesList, 1);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addtoken(item) {
      this.tokenList.unshift(item);
      // this.tokenMap[item.address.toLowerCase()] = item
    },
    removetoken(item) {
      const { address } = item;
      // this.tokenList = this.tokenList.filter((item) => {
      //   return item.address !== address;
      // });
      let index = this.tokenList.findIndex((t) => t.address === address);
      if (index >= 0) {
        this.tokenList.splice(index, 1);
      }
      if (
        state.tokenSwapList[0].address === address ||
        state.tokenSwapList[1].address === address
      ) {
        // Object.assign(state.tokenSwapList[0], token_default);
        loadDefaultToken(this.walletType);
        loadLimitDefaultToken(this.walletType);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.setting_back {
  box-sizing: border-box;
  position: absolute;
  left: 25px;
  top: 30px;
  width: 30px;
  height: 30px;
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 100px;
  background: var(--background-mask);

  img {
    display: block;
    width: 16px;
    height: 16px;
    transform: rotate(90deg);
  }
  &:hover {
    background: var(--background-classic);
  }
}
.setting_reset {
  position: absolute;
  right: 30px;
  font-weight: bold;
  top: 33px;
  color: var(--color-content);
  font-size: 16px;
  cursor: pointer;
  &:hover {
    color: var(--color);
  }
}
.custom-tokens_box {
  padding-top: 20px;
  .custom-tokens_warning {
    color: var(--red);
  }
}
.advance-settings__dex__label {
  margin-left: 10px;
}

.advance-settings__dex {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr;
  padding: 20px 0 0 0;
}

.slippage-selectv3__custom {
  box-sizing: border-box;
  width: 100%;
  height: 36px;
  line-height: 36px;
  padding: 0 10px;
  background: var(--background-input);
  border-radius: 6px;
  outline: none;
  color: inherit;
  // text-align: right;
  font-size: inherit;
  font-family: inherit;
  -webkit-appearance: none;
  border: 2px solid transparent;
  transition: border-color 0.3s;

  &::placeholder {
    color: var(--color-des);
  }

  &:hover,
  &:focus {
    border-color: var(--background-classic-input-hover);
  }
}
.g-back-button {
  &:hover {
    i {
      color: var(--color);
    }
  }
  i {
    transform: scale(0.45) rotate(90deg);
    color: var(--classic-back);
  }
}
.advance_settings {
  &__content {
    height: 515px;
    padding: 0 20px;
    overflow: auto;
  }
}
</style>
