<template>
    <div class="customization" :style="{'height': tellApp()? '100vh': '85vh'}">
      <h2 class="g-dialog-title">
        <!-- <div class="g-back-button">
          <svg viewBox="0 0 24 24">
            <path
              d="M15.41 16.59L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.59Z"
              fill="var(--classic-back)"
            />
          </svg>
        </div> -->
        <span>{{ $t("dialog_connect_chain") }}</span>
        <div class="g-circle-button" @click="close">
          <i class="iconfont iconClose icon_close"></i>
        </div>
      </h2>
      <div class="customization-content" id="dialog-scroll-dom">
        <div
          class="row"
          v-for="i in chains.map((_, i) => i).filter((i) => i % 2 === 0)"
          :key="i"
        >
          <div
            :class="walletType===chains[i].value? 'odd active':  'odd'"
            @click="selectChain(chains[i])"
          >
            <img class="item__icon" :src="chains[i].icon" alt="" />
            <div class="item__label">{{ chains[i].label }}</div>
          </div>
          <div
            v-if="i + 1 < chains.length"
             :class="walletType===chains[i+1].value? 'even active':  'even'"
            @click="selectChain(chains[i+1])"
          >
            <img class="item__icon" :src="chains[i + 1].icon" alt="" />
            <div class="item__label">{{ chains[i + 1].label }}</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { tryConnect, changeAccount,changeChain } from "../../../../init";
import getChains from "@/utils/getChains";
import { getChainId, addEthereumChainParams } from "@/utils/getChains";
import showToast from "@/components/toast";
import { InfuraId } from "@/utils/config";
import { OpenoceanSdk } from "@openocean.finance/openocean-sdk";
import { isApp, isMobile, isSupportSolana } from '@/utils/helpers';
import { contract as state } from "@/contract";

const ooSdk = new OpenoceanSdk();
const { config } = ooSdk;

export default {
  name: "ChainView",
  data() {
    let list = JSON.parse(window.localStorage.getItem("chains")) || getChains()
    if(isApp() && !isSupportSolana()) {
      list = list.filter(item => item.value !== 'solana')
    }
    return {
      selectedChain: "eth",
      chains: list.filter(item => item.disabled !== true),
      walletList: config.wallets.walletList,
      visible: true,
      selectedWallet: "",
      isCustomization: false,
      pending: false,
    };
  },
  mounted() {
    const walletType = window.localStorage.getItem("walletType") || "";
    this.selectedChain =
      !walletType || walletType === "undefined" ? "eth" : walletType;
  },
  methods: {
    tellApp(){
      return isApp()
    },
    selectChain(target) {
      if (!isApp() && isMobile()) {
        const cacheWalletName = localStorage.getItem("WALLETCONNECT_DEEPLINK_CHOICE") || '{}'
        const { name } = JSON.parse(cacheWalletName);
        if (name && name !== "MetaMask" && this.walletName) {
          state.isShowDisclaimer = true
          this.$emit('close')
          return
        }
        
      }
      changeChain(target.walletValue, 'WalletConnect', target.chainId || '', 1 )
      this.$emit('close')
    },
    async selectWallet(target) {
      this.selectedWallet = target.name;
      if (!target.supportChains.includes(this.selectedChain)) {
        return;
      }
      try {
        this.pending = true;
        const chainId = getChainId(this.selectedChain);
        const sdk = await tryConnect(this.selectedChain, target.key)
        if (sdk) {
          this.connect(sdk);
        }
      } catch (e) {
        const { message } = e;
        const { currentProvider } = target.sdk || {};
        let currentChainId = 0;
        if (
          message === "40006" &&
          currentProvider &&
          window.ethereum.isMetaMask &&
          !window.ethereum.isMathWallet
        ) {
          const params = addEthereumChainParams[this.selectedChain];
          if (params) {
            try {
              await currentProvider.request({
                method: "wallet_addEthereumChain",
                params,
              });
            } catch {
              this.pending = false;
            }
            this.selectWallet(target);
          } else if (this.selectedChain === "eth") {
            try {
              await currentProvider.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: "0x1" }],
              });
            } catch {
              this.pending = false;
            }
            this.selectWallet(target);
          } else {
            showToast(
              /^\d+$/.test(message)
                ? this.$t("wallet_message_" + message)
                : message
            );
          }
        } else {
          showToast(
            /^\d+$/.test(message)
              ? this.$t("wallet_message_" + message)
              : message
          );
        }
      }
      this.pending = false;
    },
    connect(target) {
      const { name, chainId, address } = target.wallet;
      // this.$store.commit('CONNECT', {
      //   walletType: this.selectedChain,
      //   walletName: name,
      //   walletPath: this.selectedChain === 'eth' ? '' : this.selectedChain + '/',
      //   walletChainId: chainId,
      //   walletSDK: sdk,
      //   accountAddress: address
      // })
      changeAccount(address, this.selectedChain, this, name, chainId);
      this.pending = false;
      this.$emit("close");
    },
    confirm() {
      window.localStorage.setItem("chains", JSON.stringify(this.chains));
      this.$emit("close");
    },
    closeHandler() {
      this.$emit("close");
    },
    closeModal() {
      this.$emit("close");
    },
    getTargetWallet(chain) {
      return this.walletList.filter((item) =>
        item.supportChains.includes(chain)
      );
    },
    close() {
      this.$emit("close");
    },
    back() {
      (this.chains =
        JSON.parse(window.localStorage.getItem("chains")) || getChains()),
        (this.isCustomization = !this.isCustomization);
    },
  },
  // beforeDestroy() {
  //   this.$el.parentNode.removeChild(this.$el);
  // },
};
</script>

<style lang="scss" scoped>
.connect-view__content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 456px;
  background: var(--dialog-content);
  border-radius: 10px;
  color: var(--color);
  height: 630px;
  .g-dialog-title {
    margin-bottom: 0;
  }
}

.title {
  margin: 0;
  padding: 22px 23px 21px 23px;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  font-weight: 600;
  border-radius: 10px 10px 0 0;
  background: var(--dialog-title);
}

.split {
  display: flex;
}

.split__chains {
  padding: 0 0 20px 0;
  list-style: none;
  border-right: 1px solid var(--background-classic-border);
  max-height: 548px;
  box-sizing: border-box;
  overflow: auto;
  text-align: center;

  svg {
    margin-bottom: 12px;
    width: 40px;
    height: 40px;
    margin-top: 20px;
    cursor: pointer;

    rect {
      width: 40px;
      height: 40px;
      fill: var(--classic-chain-add-bg);
    }
  }

  &::-webkit-scrollbar-thumb:vertical {
    background-color: transparent;
  }
}

.split__wallets {
  flex: 1;
}

.sub-title {
  margin: 0;
  padding: 0;
  color: var(--classic-text-title);
  font-size: 16px;
  line-height: 19px;
  margin-bottom: 24px;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 20px;
}

.sub-content {
  padding-left: 20px;
  padding-right: 20px;
  max-height: 460px;
  overflow: auto;
}

.item {
  cursor: pointer;
  display: flex;
  align-items: center;
  -webkit-box-align: center;
  align-items: center;
  border-radius: 8px;
  font-size: 16px;
  height: 48px;
  padding: 0px 24px;
  background-color: var(--background-classic-token);
  margin-bottom: 16px;
  border: 1px solid transparent;
  &:hover {
    background-color: var(--background-classic-token-hover);
    border-color: var(--classic-item-hover);
  }
}

.item__icon {
  height: 32px;
  // background-color: #000000;
  border-radius: 16px;
}

.item__label {
  flex: 1;
  font-size: 16px;
  line-height: 19px;
  color: var(--classic-text-title);
  margin-left: 16px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
}

.pending {
  background-color: var(--background-classic-token-hover);
  border-color: var(--classic-item-hover);
  span {
    color: var(--classic-text-common);
    font-family: "Roboto";
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
  }
}

.customization {
  color: var(--color);

  .customization-content {
    height: 450px;
    overflow: auto;

    .row {
      display: grid;
      grid-gap: 12px;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      height: 48px;
      padding: 8px 24px;

      @media (max-width: 440px) {
        grid-gap: 12px;
        padding: 6px 12px;
      }

      .odd,
      .even {
        cursor: pointer;
        height: 100%;
        display: flex;
        background-color: var(--background-classic-token);
        border-radius: 8px;
        align-items: center;
        box-sizing: border-box;
        .item__icon {
          margin-left: 16px;
        }
      }

      .active {
        border: 1px solid var(--classic-item-list-active);
        background-color: var(--classic-token-item-active);
      }
    }
  }
}
</style>