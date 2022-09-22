import axios from "axios";
import { baseURL } from "./config";
import Vue from "vue";
import { isCustomGas } from "@/utils/getChains";

axios.defaults.timeout = 30000;
axios.defaults.baseURL = baseURL + "/v1/";
console.log("baseURL", baseURL);

const EXPIRE_TIME = 60000;
const CancelToken = axios.CancelToken;

axios.interceptors.request.use(
  function (config) {
    changeEthereumUrl(config, "1");
    changeUrl(config, "ropsten", "3");
    changeUrl(config, "optimism", "10");
    changeUrl(config, "boba", "288");
    changeUrl(config, "xdai", "100");
    changeUrl(config, "avax", "43114");
    changeUrl(config, "bsc", "56");
    changeUrl(config, "bsctest", "97");
    changeUrl(config, "fantom", "250");
    changeUrl(config, "polygon", "137");
    changeUrl(config, "moonriver", "1285");
    changeUrl(config, "arbitrum", "42161");
    changeUrl(config, "heco", "128");
    changeUrl(config, "okex", "66");
    changeUrl(config, "aurora", "1313161554");
    changeUrl(config, "cronos", "25");
    changeUrl(config, "harmony", "1666600000");
    if (/terra\/gas-price/gi.test(config.url)) {
      config.baseURL = baseURL + "/v1";
    }
    if (config.cache) {
      const openocean_cache = window.localStorage.getItem("openocean_cache");
      const cache = openocean_cache ? JSON.parse(openocean_cache) : {};
      let source = CancelToken.source();
      config.cancelToken = source.token;
      let data = cache[config.url];
      let now = new Date().getTime();
      const expire_time = config.expire_time || EXPIRE_TIME;
      if (data && now - data.expire < expire_time) {
        source.cancel(data);
      } else {
        delete cache[config.url];
        window.localStorage.setItem("openocean_cache", JSON.stringify(cache));
      }
    }
    if (
      !/api\.binance\.com|apiasia\.tronscan\.io|\.loopring\.io|kline\.openocean\.finance/gi.test(
        config.url
      ) &&
      config.headers &&
      config.headers.common
    ) {
      config.headers.common["token"] = Vue.$cookies.get("ccat") || "";
    }

    if (/\/market/.test(config.url)) {
      config.baseURL = "https://proapi.openocean.finance";
    }
    // \market|
    if (
      /\/exchange\/loopring|\/exchange\/perpetual|\/exchange\/account/gi.test(
        config.url
      )
    ) {
      if (!/markets/gi.test(config.url)) {
        config.baseURL = baseProURL;
      }
    }
    if (/\/api\/v3/gi.test(config.url)) {
      config.baseURL = "";
    }
    if (
      /token$|\/v2\/getApr|\/v2\/chart|\/v1\/cms\/|\/v1\/data\/|\/v1\/ubt\/submit/gi.test(
        config.url
      )
    ) {
      config.baseURL = "https://pre-market-api.openocean.finance";
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    if (response.config.method === "get" && response.config.cache) {
      let data = {
        expire: new Date().getTime(),
        data: response.data,
      };
      const openocean_cache = window.localStorage.getItem("openocean_cache");
      const cache = openocean_cache ? JSON.parse(openocean_cache) : {};
      cache[`${response.config.url}`] = data;
      window.localStorage.setItem("openocean_cache", JSON.stringify(cache));
    }
    return /loopring\.io/gi.test(response.config.baseURL)
      ? response
      : response.data;
  },
  function (error) {
    if (axios.isCancel(error)) return Promise.resolve(error.message.data);
    return Promise.reject(error);
  }
);

function changeUrl(config, name, chainId) {
  if (
    new RegExp(`${name}\/`, "gi").test(config.url) &&
    /\/exchange|\/dex|\/quote|\/swap-quote|\/meta-swap/gi.test(config.url)
  ) {
    config.baseURL = baseURL + "/v2/";
    config.url = config.url
      .replace(`${name}/`, `${chainId}/`)
      .replace("swap-quote", "swap");
  } else if (isCustomGas(name) && /\/gas-price/gi.test(config.url)) {
    config.baseURL = baseURL + "/v2/";
    config.url = config.url.replace(`${name}/`, `${chainId}/`);
  }
}

function changeEthereumUrl(config) {
  if (/^gas-price$|^exchange$|^dex$|^quote|^swap-quote/gi.test(config.url)) {
    config.baseURL = baseURL + "/v2/1/";
    config.url = config.url.replace("swap-quote", "swap");
  }
}

export default axios;
