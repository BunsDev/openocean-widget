import Vue from "vue";
import BigNumber from "bignumber.js";
import { formatAccount, toFixed } from "@/utils/format";
import { baseURL } from "@/utils/config";
import { getDefaultToken, getDefaultLimitToken } from "@/utils/getChains";

function loadToken(key, defaultToken) {
  const walletType = localStorage.getItem("walletType") || "bsc"
  const token = window.localStorage.getItem(`${walletType}_${key}`);
  if (!defaultToken) {
    const tokenList = getDefaultToken(walletType);
    defaultToken = tokenList[key === "tokenSwapPrev" ? 0 : 1];
  }
  return Object.assign(
    {
      price: 0,
      usd: 0,
      balance: 0,
      approve: 0,
      usdtValue: 0,
      value: 1,
      balanceDecimals: 0,
    },
    token ? JSON.parse(token) : defaultToken
  );
}

 function loadLimitToken(key) {
  const walletType = localStorage.getItem("walletType") || "bsc"
  const tokenList = getDefaultLimitToken(walletType);
  const defaultToken = tokenList[key === "tokenLimitPrev" ? 0 : 1];
  return loadToken(key, defaultToken);
}

const formatToken = (token) => {
  return Object.assign(
    {
      price: 0,
      usd: 0,
      balance: 0,
      approve: 0,
      usdtValue: 0,
      value: 1,
      balanceDecimals: 0,
    },
    token
  );
}

export function loadDefaultToken(walletType) {
  const tokenList = getDefaultToken(walletType);
  state.tokenSwapList = [formatToken(tokenList[0]), formatToken(tokenList[1])]
}

export function loadLimitDefaultToken(walletType) {
  const tokenList = getDefaultLimitToken(walletType);
  state.tokenLimitList = [formatToken(tokenList[0]), formatToken(tokenList[1])]
}


export const state = Vue.observable({
  default_account: "",
  walletName: "",
  walletType: localStorage.getItem("walletType") || "bsc",
  walletPath: "",
  walletLogo: () =>
    baseURL +
    "/logos/" +
    (state.walletType === "eth" ? "" : state.walletType + "/"),
  layer2Account: null,
  layer2Info: null,
  layer2Markets: null,
  layer2Tokens: null,
  layer2AccountId: 0,
  strategyId: "",
  priceScale: "",
  volumeScale: "",
  stage: 0,
  reloadReward: false,
  tolerance: "1",
  gasPrice: "5000000000",
  partialFill: false,
  tokenList: [],
  tokenSwap: 0,
  tokenSwapList: [loadToken("tokenSwapPrev"), loadToken("tokenSwapNext")],
  tokenLimit: 0,
  tokenLimitList: [
    loadLimitToken("tokenLimitPrev"),
    loadLimitToken("tokenLimitNext"),
  ],
  tokenMap: {},
  routePath: {
    from: "",
    to: "",
    parts: 0,
    routes: [],
  },
  unexchangeList: {},
  exchangeList: [],
  favoriteList: [],
  gasPriceOptions:[],
  walletRsaPath: "",
  isShowSelectToken: false,
  isShowDisclaimer: false,
  investor: ""
});

export const getters = {
  default_account: () =>
    state.default_account || "0x0000000000000000000000000000000000000000",
  account: () => formatAccount(state.default_account || ""),
  walletType: () => state.walletType,
  walletPath: () => state.walletType === "eth" ? "" : state.walletType + "/",
  walletLogo: () =>
    baseURL +
    "/logos/" +
    (state.walletType === "eth" ? "" : state.walletType + "/"),
  walletName: () => state.walletName,
  layer2AccountId: () =>
    (state.layer2Account && state.layer2Account.accountId) || 0,
  layer2Markets: () => state.layer2Markets || [],
  strategyId: () => state.strategyId,
  priceScale: () => state.priceScale,
  volumeScale: () => state.volumeScale,
  stage: () => state.stage || 0,
  reloadReward: () => state.reloadReward || false,
  tokenList: () => state.tokenList || [],
  tokenSwap: () => state.tokenSwap || 0,
  tokenSwapList: () => state.tokenSwapList || [],
  tokenSwapPrev: () => state.tokenSwapList[state.tokenSwap] || { symbol: "" },
  tokenSwapNext: () => state.tokenSwapList[1 - state.tokenSwap] || { symbol: "" },
  tokenSwapPrevUsdValue() {
    const token = state.tokenSwapList[state.tokenSwap];
    const value =
      token && token.value && token.usd ? token.value * token.usd : 0;
    return toFixed(value, 6, 6);
  },
  tokenSwapNextUsdValue() {
    const token = state.tokenSwapList[1 - state.tokenSwap];
    const value =
      token && token.value && token.usd ? token.value * token.usd : 0;
    return toFixed(value, 6, 6);
  },
  tokenSwapPair: () => {
    const tokenPrev = state.tokenSwapList[state.tokenSwap];
    const tokenNext = state.tokenSwapList[1 - state.tokenSwap];
    return `${tokenPrev.symbol}/${tokenNext.symbol}`;
  },
  tokenLimit: () => state.tokenLimit || 0,
  tokenLimitList: () => state.tokenLimitList || [],
  tokenLimitPrev: () => state.tokenLimitList[state.tokenLimit] || { symbol: "" },
  tokenLimitNext: () => state.tokenLimitList[1 - state.tokenLimit] || { symbol: "" },
  tokenLimitPrevUsdValue() {
    const token = state.tokenLimitList[state.tokenLimit];
    const value =
      token && token.value && token.usd ? token.value * token.usd : 0;
    return toFixed(value, 6, 6);
  },
  tokenLimitNextUsdValue() {
    const token = state.tokenLimitList[1 - state.tokenLimit];
    const value =
      token && token.value && token.usd ? token.value * token.usd : 0;
    return toFixed(value, 6, 6);
  },
  tokenLimitPair: () => {
    const tokenPrev = state.tokenLimitList[state.tokenLimit];
    const tokenNext = state.tokenLimitList[1 - state.tokenLimit];
    return `${tokenPrev.symbol}/${tokenNext.symbol}`;
  },
  tokenMap: () => state.tokenMap || {},
  routePath: () => state.routePath || {},
  exchangeList: () => state.exchangeList || [],
  gasPrice: () => state.gasPrice || "",
  gasPriceFormat() {
    let gasPrice = "--";
    switch (state.walletType) {
      case "eth":
        const gasLabel = state.$t(
          "gas_" +
            (window.localStorage.getItem("gasoption") || "").toLowerCase()
        );
        gasPrice =
          gasLabel +
          "(" +
          ((state.gasPrice &&
            BigNumber(state.gasPrice).div(BigNumber(10).pow(9)).toFixed(2)) ||
            "-") +
          " GWEI)";
        break;
      case "ont":
        gasPrice = "0.15 ONG";
        break;
      default:
        gasPrice =
          ((state.gasPrice &&
            BigNumber(state.gasPrice).div(BigNumber(10).pow(9)).toFixed(2)) ||
            "-") + " GWEI";
        break;
    }
    return gasPrice;
  },
  tolerance: () => state.tolerance || "",
  toleranceOptions: () => [
    {
      label: "0.5%",
      value: "0.5",
    },
    {
      label: "1%",
      value: "1",
    },
    {
      label: "3%",
      value: "3",
    },
  ],
  favoriteList: () => state.favoriteList || [],
  walletRsaPath: () => state.walletRsaPath || "",
  investor:() => state.investor,
};

export const contract = state;
