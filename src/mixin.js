import { getters, contract as state } from "./contract";
import { isSideChain, getNativeToken } from "./utils/getChains";
import { getHashParams } from "@/utils/helpers";
import { changeChain } from '@/init'
export default {
  computed: {
    ...getters,
  },
  data () {
    return {
      gasPriceOptions: [],
      nativeTokenUsd: "",
    };
  },
  watch: {
    gasPrice (val) {
      if (this.walletType === "eth") {
        window.localStorage.setItem("gasprice", val);
        window.localStorage.setItem("gasoption", "Fast");
        this.gasPriceOptions.forEach((item) => {
          const { code, value } = item;
          if (+value === +val) {
            window.localStorage.setItem("gasoption", code);
          }
        });
      }
      this.quote && this.quote();
    },
  },
  mounted () {
    // this.tolerance = window.localStorage.getItem("tolerance") || "1";
  },
  methods: {
    saveToken (key, token) {
      const { id, name, symbol, icon, address, decimals } = token;
      window.localStorage.setItem(
        `${this.walletType}_${key}`,
        JSON.stringify({
          id,
          name,
          symbol,
          icon,
          address,
          decimals,
        })
      );
    },
    async getTokenPrice (tokenPrev, tokenNext) {
      try {
        const res = await this.$axios.get(
          "https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=" +
          tokenPrev.id +
          "," +
          tokenNext.id,
          { cache: true }
        );
        tokenPrev.usd = res[tokenPrev.id] ? res[tokenPrev.id].usd : 0;
        tokenNext.usd = res[tokenNext.id] ? res[tokenNext.id].usd : 0;
      } catch (e) {
        console.log("getTokenPrice", e);
      }
    },
    async getNativeTokenPrice () {
      const token = getNativeToken(this.walletType);
      const id = token && token.id;
      if (!id) return;
      const res = await this.$axios.get(
        "https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=" +
        id,
        { cache: true }
      );
      this.nativeTokenUsd = res[id] ? res[id].usd : 0;
    },
    toLowerCase (val, flag) {
      if (flag) {
        return val && val.toLowerCase();
      }
      return isSideChain(this.walletType) ? val && val.toLowerCase() : val;
    },
    getToken (customWalletPath) {
      const walletPath = customWalletPath || this.walletPath;
      const chain =
        (walletPath && walletPath.toLowerCase().replace("/", "")) || "eth";
      this.$axios
        .get(`v2/${chain}/token`, { cache: true, expire: 300000 })
        .then((res) => {
          const { data } = res || {};
          const tokenMap = {};
          state.tokenList = data.map((item) => {
            item.id = item.code || "";
            item.icon = item.icon;
            tokenMap[item.address.toLowerCase()] = item;
            return item;
          });
          state.tokenMap = tokenMap;
          const temp = window.localStorage.getItem(chain + "_customtoken");
          if (temp) {
            state.tokenList = JSON.parse(temp).concat(state.tokenList);
            // JSON.parse(temp).forEach(t => {
            //   state.tokenMap[t.address.toLowerCase()] = t;
            // })
          }
          this.getTokenEnd && this.getTokenEnd();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    loadPairList (flag, chainCode) {
      this.$axios
        .get(`/v1/data/getPairPrice?chainCode=${chainCode}`, {
          cache: true,
          expire: 300000,
        })
        .then(async (res) => {
          const { data } = res;
          const temp = [];
          if (this.walletType === "eth") {
            try {
              const { map } = await this.getTicker();
              let i = 1;
              (data || []).map((item) => {
                if (map[item.pairCode]) {
                  map[item.pairCode].sort = i++;
                  item.sort = i++;
                  temp.push(map[item.pairCode]);
                } else {
                  item.sort = 0;
                }
              });
            } catch (e) {
              console.log(e);
            }
          }
          this.pairList = (data || []).concat(temp || []).sort((a, b) => {
            return a.sort > b.sort ? -1 : 1;
          });
          this.getToken();
          this.afterLoadPairList(flag, chainCode);
        });
    },
    afterLoadPairList (flag, chainCode) {
      if (!flag || !this.pairList.length) return;
      let pairCode = window.localStorage.getItem(this.chainCode + "_pairCode");
      const params = getHashParams(this.$route.hash);
      if (params.length > 2) {
        const chainCode = params[0].toLowerCase();
        if (chainCode != this.chainCode.toLowerCase()) {
          const chain = chains.filter((item) => {
            return item.walletValue.toLowerCase() === chainCode;
          });
          if (chain && chain.length) {
            changeChain(
              chain[0].walletValue,
              this.walletType,
              chain[0].chainId
            );
            return;
          }
        }
        const _pairCode = (params[1] + "/" + params[2]).toUpperCase();
        const exist = this.pairList.some(function (item) {
          return item.pairCode === _pairCode;
        });
        if (exist) {
          pairCode = _pairCode;
        }
      }
      if (!pairCode) {
        switch (this.chainCode) {
          case "eth":
            pairCode = "ETH/USDT";
            break;
          case "bsc":
            pairCode = "FXS/USDT";
            break;
          case "tron":
            pairCode = "TRX/USDT";
            break;
          case "onto":
            pairCode = "WING/ONTd";
            break;
          case "solana":
            pairCode = "SOL/USDT";
            break;
          default:
            pairCode = this.pairList[0].pairCode;
            break;
        }
      }
      const proPairCode = pairCode || localStorage.getItem("proPairCode");
      this.pairSelect(proPairCode);
    },
    formatGas (base, gas) {
      if (!base) return gas;
      const { maxFeePerGas } = gas;
      return +maxFeePerGas;
    },
    formatGasLabel (base, gas) {
      const _gas = (gas && BN(gas).div(BN(10).pow(9)).toFixed(2)) || "-";
      if (!base) return _gas;
      const _base = (base && BN(base).div(BN(10).pow(9)).toFixed(2)) || "-";
      return _base + "~" + _gas;
    },
    getGasPrice () {
      this.$axios
        .get(this.walletPath + "gas-price", { cache: true })
        .then((res) => {
          const { base, fast, instant, standard } = res;
          const _fast = this.formatGas(base, fast);
          const _instant = this.formatGas(base, instant);
          const _standard = this.formatGas(base, standard);
          state.gasPriceOptions = this.gasPriceOptions = [
            {
              label:
                this.formatGasLabel(base, _fast) + " " + this.$t("gas_fast"),
              code: "Fast",
              value: _fast,
              ethgas: base ? { base, ...fast } : "",
            },
            {
              label:
                this.formatGasLabel(base, _instant) +
                " " +
                this.$t("gas_instant"),
              code: "Instant",
              value: _instant,
              ethgas: base ? { base, ...instant } : "",
            },
          ];
          
          if (this.walletType === "eth") {
            const option = window.localStorage.getItem("gasoption");
            switch (option) {
              case "Standard":
              case "Fast":
                state.gasPrice = _fast;
                break;
              case "Instant":
                state.gasPrice = _instant;
                break;
              default:
                state.gasPrice =
                  window.localStorage.getItem("gasprice") || _standard;
                break;
            }
          } else {
            state.gasPrice = _standard;
          }
          this.quote && this.quote();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getExchange () {
      if (this.walletType === "onto" || this.walletType === "solana") {
        this.getBalanceOf();
        return;
      }
      this.$axios
        .get(this.walletPath + "exchange", { cache: true })
        .then((res) => {
          this.exchange = res;
          this.getBalanceOf();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
