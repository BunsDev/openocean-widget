<template>
  <div>
    <div class="g-clickable button loading" v-if="loading">
      <span>{{ $t("exchange_finding_best_prices") }}</span>
      <div class="loader"></div>
    </div>
    <div
      class="g-clickable button connect"
      v-else-if="!account"
      @click="connect"
    >
      <span>{{ $t("menu_connect_wallet") }}</span>
    </div>
    <div
      class="button disabled"
      v-else-if="+inAmount > +token.balance"
    >
      <span>{{ $t("exchange_insufficient_balance") }}</span>
    </div>
    <div class="approve" v-else-if="checkApprove">
      <div class="button-group">
        <div
          class="g-clickable button unlock"
          :class="{ loading: unlockLimitLoading }"
          v-if="approveType === '' || approveType === '0'"
          @click="approveTo('0')"
        >
          <span
            >{{ $t("exchange_unlock") }} {{ inAmount }} {{ token.symbol }}</span
          >
          <div class="loader" v-if="unlockLimitLoading"></div>
        </div>
        <div
          class="g-clickable button infinite-unlock"
          :class="{ loading: infiniteLimitLoading }"
          v-if="approveType === '' || approveType === '1'"
          @click="approveTo('1')"
        >
          <span>{{ $t("exchange_infinite_unlock") }} </span>
          <div class="loader" v-if="infiniteLimitLoading"></div>
        </div>
      </div>
      <div class="warning">
        <img class="g-dark-only icon" src="@/assets/icon-hint-dark.svg"/>
        <img class="g-light-only icon" src="@/assets/icon-hint-light.svg"/>
        <span>{{ $t("exchange_swap_warning", { symbol: token.symbol }) }}</span>
      </div>
    </div>
    <div
      class="g-clickable button disabled"
      v-else-if="
        !unlockLimitLoading &&
        inAmount > 0 &&
        (outAmount <= 0 || priceImpact <= -50)
      "
    >
      <span>{{ $t("exchange_insufficient_liquidity") }}</span>
    </div>
    <div
      class="g-clickable button swap"
      v-else-if="inAmount > 0 && outAmount > 0 && priceImpact > -50"
      @click="$emit('confirm')"
    >
      <span v-if="type === 'swap'">{{ $t("exchange_swap_now") }}</span>
      <span v-if="type === 'limit'">{{ $t("exchange_limit_order") }}</span>
    </div>
    <div class="g-clickable button" v-else>
      <span>{{ $t("exchange_enter_amount") }}</span>
    </div>
  </div>
</template>

<script>
import BigNumber from "bignumber.js";
import {
  getBalance,
  sendApproveTo,
  tryConnect,
  connect,
  changeAccount,
  getAllowance
} from "@/init";
import { isApp, isMobile } from "@/utils/helpers"
export default {
  props: {
    inAmount: {
      type: [String, Number],
      default: "",
    },
    outAmount: {
      type: [String, Number],
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    priceImpact: {
      type: [String, Number],
      default: 0,
    },
    exchange: {
      type: Object,
      default() {
        return {};
      },
    },
    type: {
      type: String,
      default: "swap"
    },
    token: {
      type: Object,
      default() {
        return {
          approve: 0,
          balance: 0,
          symbol: "",
          priceImpact: 0,
        };
      },
    },
    type: {
      type: String,
      default: "swap"
    },
    skipApprove: {
      type: Boolean,
      default: false
    },
    chain:{
      type:String,
    }
  },
  computed: {
    checkApprove() {
      if(this.skipApprove) return false;
      this.infiniteLimitLoading = false;
      this.unlockLimitLoading = false;
      this.approveType = "";
      console.log('checkApprove', this.token.approve, this.inAmount, new BigNumber(this.token.approve).comparedTo(this.inAmount))
      if (this.walletType === 'solana') {
        return false
      }
      return (
        this.inAmount > 0 &&
        this.outAmount > 0 &&
        this.token.approve >= 0 &&
        new BigNumber(this.token.approve).comparedTo(this.inAmount) < 0
      );
    },
  },
  data() {
    return {
      approveType: "",
      unlockLimitLoading: false,
      infiniteLimitLoading: false,
    };
  },
  methods: {
    async connect() {
      if(isApp()) {
        console.log('isApp:-------', !!isApp())
        showToast('Connect Error, Please Refresh')
      }
      console.log('isMobile:-------', isMobile())
      if(!isApp() && isMobile()){
        const sdk = await tryConnect(this._props.chain, 'WalletConnect');
        console.log(sdk, '+++++++++')
        if (sdk) {
          await connect(sdk);
          await changeAccount(sdk.wallet.address, sdk.chain.key, this, sdk.wallet.name, sdk.chain.chainId);
        } else {
          console.log('connect fail')
        }
      } else {
        window.connectWallet(true);
        // const sdk = await tryConnect(this._props.chain, 'MetaMask');
        // console.log(sdk, '+++++++++')
        // await connect(sdk);
        // await changeAccount(sdk.wallet.address, sdk.chain.key, this, sdk.wallet.name, sdk.chain.chainId);
      }
    },
    getAmount() {
      const { value, decimals, balance, balanceDecimals } = this.token;
      const amountDecimals =
        value === balance
          ? balanceDecimals
          : BN(value).times(BN(10).pow(decimals)).toFixed(0);
      return {
        amount: value,
        amountDecimals,
      };
    },
    async approveTo(type) {
      if (this.infiniteLimitLoading || this.unlockLimitLoading) return;
      const { symbol, address, decimals } = this.token;
      const { approveContract } = this.exchange || {};
      const { amount, amountDecimals } = this.getAmount();
      if (type === "1") {
        this.infiniteLimitLoading = true;
      } else {
        this.unlockLimitLoading = true;
      }
      this.approveType = type;
      if (isMobile()) {
        setTimeout(() => {
          this.infiniteLimitLoading = false;
          this.unlockLimitLoading = false;
          this.approveType = "";
        }, 5000)
      }
      const result = await sendApproveTo(
        this._props.chain,
        address,
        approveContract,
        type,
        amount,
        decimals,
        this.gasPrice,
        amountDecimals
      )
      if (!result.code) {
        console.log('approve result', result)
        result.on('error', (error) => {
          console.log('approve error', error)
          this.approveToEnd();
        })
        .on('success', (success) => {
          console.log('approve success', success)
          this.approveToEnd(true);
        })
      }
      // result.successCallback = async () => {
      //   await this.approveToEnd(true);
      // };
      // result.errorCallback = async () => {
      //   await this.approveToEnd();
      // };
    },
    async approveToEnd(flag) {
      await this.getBalanceOf();
      if (flag && +this.token.approve <= 0) {
        setTimeout(async () => {
          await this.approveToEnd(true);
        }, 2000);
      } else {
        this.infiniteLimitLoading = false;
        this.unlockLimitLoading = false;
        this.approveType = "";
      }
    },
    async getBalanceOf() {
      const { symbol, address, decimals } = this.token;
      const { abi, approveContract } = this.exchange || {};
      if (!address || !approveContract) {
        this.token.balance = "";
        return;
      }

      const { short, long } = await getBalance(
        this.walletType, this.default_account, this.token
      );
      if (this.walletType !== 'solana') {
        const approve = await getAllowance(this.walletType, this.default_account, this.token, approveContract)
        this.token.approve = approve;
      }
      this.token.balance = short ? short + "" : "";
      this.token.balanceDecimals = long;
    },
  },
};
</script>

<style lang="scss" scoped>
.button-group {
  width: 100%;
  display: flex;
  align-items: center;

  .button {
    flex: 1;
    width: auto;

    &:first-child {
      margin-right: 25px;
    }
    
    &:last-child {
      margin-right: 0;
    }
  }
}
.button {
  cursor: pointer;
  height: 54px;
  background-color: var(--classic-button-disabled);
  border-radius: 12px;
  width: 100%;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.connect {
    background-color: var(--background-classic-connect);
    transition: all .3s ease;

    &:hover {
      background-color: var(--background-classic-connect-hover);
      span {
        color: var(--background-classic-connect-text-hover);
      }
    }
    span {
      color: var(--classic-item-hover);
      transition: all .3s ease;
    }
  }

  &.disabled {
    cursor: default;
    background-color: var(--classic-button-disabled);
    span {
      color: var(--classic-button-disabled-color);
    }
  }

  &.unlock {
    background-color: var(--classic-button-unlock);
    transition: all .3s ease;
    span {
      color: var(--classic-button-unlock-color);
      transition: all .3s ease;

      @media (max-width:440px) {
        font-size: 12px;
      }
    }
    &:hover {
      background-color: var(--background-classic-unlock-hover);
      span {
        color: var(--background-classic-unlock-text-hover);
      }
    }
  }

  &.infinite-unlock {
    background-color: var(--classic-button-infinite-unlock);
    transition: all .3s ease;
    span {
      color: var(--classic-button-infinite-unlock-color);
      transition: all .3s ease;
      
      @media (max-width:440px) {
        font-size: 12px;
      }
    }
    &:hover {
      background-color: var(--background-classic-infinite-unlock-hover);
      span {
        color: var(--background-classic-infinite-unlock-text-hover);
      }
    }
  }

  &.swap {
    background-color: var(--background-classic-connect);
    span {
      color: var(--classic-item-hover);
    }
  }

  span {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 21px;
    color: var(--classic-button-disabled-color);
  }
}
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    line-height: 1;
    word-break: keep-all;
    display: block;
  }
  overflow: hidden;

  .loader,
  .loader:after {
    border-radius: 50%;
    width: 18px;
    height: 18px;
  }
  .loader {
    width: 16px;
    height: 16px;
    font-size: 14px;
    position: relative;
    text-indent: -9999px;
    border-top: 3px solid var(--classic-loader-border);
    border-right: 3px solid var(--classic-loader-border);
    border-bottom: 3px solid var(--classic-loader-border);
    border-left: 3px solid var(--classic-loader-border-color);
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load8 1.1s infinite linear;
    animation: load8 1.1s infinite linear;
    margin-left: 10px;
  }
  @keyframes load8 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
.warning {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 8px;
  margin-bottom: 16px;

  i {
    font-size: 16px;
    color: var(--classic-warning);
    margin-right: 4px;
  }

  span {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: var(--classic-warning);
    margin-left: 6px;
  }
}

.icon{
  width: 14px;
}
</style>