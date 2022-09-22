import Web3 from "web3";
import axios from "axios";
import {
  contract as state,
  loadDefaultToken,
  loadLimitDefaultToken,
} from "./contract";
import {
  ERC20_abi
} from "@/utils/config";
import Muliticall from "ethers-multicall";
import BigNumber from "bignumber.js";
window.BN = BigNumber;
import showToast from "@/components/toast";
import showNotification from "@/components/notification";
import { decimals2Amount } from "@/utils/number";
import { debounce, confirmLater } from "./utils/helpers";

import { PublicKey } from "@solana/web3.js";
import { ethers } from "ethers";
import { getHashParams } from "@/utils/helpers";
import {
  addEthereumChainParams,
  isNativeToken,
  isSideChain,
  getChainId,
} from "@/utils/getChains";
import getChains from "@/utils/getChains";

import {
  LimitOrderBuilder,
  Web3ProviderConnector,
  LimitOrderProtocolFacade,
  LimitOrderPredicateBuilder,
} from "@1inch/limit-order-protocol";

import { formatDate, toFixed } from "@/utils/format";

import { getBlackList } from "@/api/blacklist";
import { isApp, isMobile } from "./utils/helpers";
import { CACHE_KEY, getCache, setCache } from "./utils/cache";
import { OpenoceanSdk } from "@openocean.finance/openocean-sdk";
import { amount2Decimals } from "./utils/number";

import chainLinkAbi from "./utils/chainLinkAbi.json";
import chainLinkAddress from "./utils/chainLinkAddress.json";

export let blackList = [];
export let myWallet = null;

const maxAmount =
  "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF";

const ooSdk = new OpenoceanSdk();
const { swapSdk, api, web3, config } = ooSdk;
export const walletList = config.wallets.walletList;

function getLimitContractAddress() {
  return {
    eth: "0xcC8d695603ce0b43D352891892FcC716c6a7C9f4",
    bsc: "0xA8A0213bb2ce671E457Ec14D08EB9d40E6DA8e2d",
    avax: "0x99b3488Ee3432bB60256140b4BD2488E3b6A705f",
    fantom: "0x44A632dC8ee03ad2cF5d530280a044DaED3E1ec0",
    polygon: "0xFA9B584Bc9543B66BeFdc41fb1DA8636edD7a697",
  }[state.walletType];
}

function sleep(interval) {
  return new Promise((resolve) => {
    setTimeout(resolve, interval);
  });
}

function reload(flag) {
  window.reloadPage(flag);
}

export function isWalletConnect(walletName) {
  return ["WalletConnect", "Trust Wallet"].indexOf(walletName) >= 0;
}

async function loadBlackList() {
  blackList = await getBlackList();
}

export const init = async () => {
  let chain = getCache(CACHE_KEY.Chain, "bsc");

  const walletName = getCache(CACHE_KEY.Wallet);

  console.log("isApp: ", isApp());
  console.log(Web3.givenProvider);
  console.log(window.ethereum);
  console.log("isMobile: ", isMobile());
  if (isApp()) {
    let appChain = "bsc";
    let walletName = "MetaMask";
    if (
      window.coin98 &&
      window.coin98.sol &&
      window.coin98.sol.chainId === "undefined"
    ) {
      console.log("window.coin98");
      appChain = "solana";
      walletName = "Coin98Wallet";
    } else if (
      window.coin98 &&
      window.coin98.sol &&
      window.coin98.sol.chainId !== "undefined"
    ) {
      const chains = getChains();
      let chainId = await new Web3(Web3.givenProvider).eth.getChainId();
      appChain = chains.find((c) => c.chainId === chainId).walletValue;
      localStorage.setItem("walletChainId", chainId);
      walletName = "Coin98Wallet";
    } else if (window.solana && window.solana.isSafePalWallet) {
      appChain = "solana";
      walletName = "SlopeWallet";
      console.log(" safepal solana");
      showToast(
        "Sorry we currently haven't enable solane swap on safepal wallet."
      );
      return;
    } else {
      const chains = getChains();
      let chainId = await new Web3(
        Web3.givenProvider || window.safepal_wallet_app
      ).eth.getChainId();
      appChain = chains.find((c) => c.chainId === chainId).walletValue;
      localStorage.setItem("walletChainId", chainId);
    }

    if (appChain !== chain) {
      setCache(CACHE_KEY.Chain, appChain);
      loadDefaultToken(appChain);
      loadLimitDefaultToken(appChain);
    }
    state.walletType = appChain;
    const sdk = await tryConnect(appChain, walletName);
    console.log(sdk);
    await connect(sdk);
  } else if (isMobile() && walletName) {
    console.log("h5 init");
    const sdk = await tryConnect(chain, "WalletConnect");
    console.log("h5 sdk:", sdk);
    await connect(sdk);
  } else if (walletName) {
    const wallet = getCache(CACHE_KEY.Wallet, "MetaMask");
    console.log("tryConnect", chain);
    const sdk = await tryConnect(chain, wallet);
    await connect(sdk);
  }
};

export async function changeWallets(network) {
  state.default_account = "";
  await onboard.walletReset();
  localStorage.removeItem("selectedWallet");
  localStorage.removeItem("walletconnect");
  state.totalShare = 0;
  let userSelectedWallet = await onboard.walletSelect();
  await onboard.walletCheck();
  if (userSelectedWallet) {
    if (network === "bsc") {
      localStorage.setItem("walletType", "bsc");
    } else {
      localStorage.setItem("walletType", "eth");
    }
  }
  reload(false);
}

export async function changeAccount(account, type, $this, wallet, chainId) {
  localStorage.setItem("selectedWallet", account);
  localStorage.setItem("walletType", type || "");
  localStorage.setItem("walletName", wallet);
  localStorage.setItem("walletChainId", chainId || "");
  const params = getHashParams(window.location.hash);
  if (params && params.length > 0) {
    let pairCode = "";
    if (params.length > 2) {
      pairCode = "/" + params[1] + "/" + params[2];
    }
    if (/pro|classic/gi.test(window.location.pathname)) {
      history.replaceState(
        {},
        "",
        (/classic/gi.test(window.location.pathname) ? "/classic" : "/pro") +
          "#/" +
          (type + pairCode).toUpperCase()
      );
    }
  }
  if (type === "bsc") {
    localStorage.setItem(
      "connectorId",
      {
        MetaMask: "injected",
        WalletConnect: "walletconnect",
        "BSC Wallet": "bsc",
      }[wallet]
    );
  }
  if (!isWalletConnect(wallet)) {
    if (isWalletConnect(state.walletName)) {
      const { currentProvider } = myWallet;
      await currentProvider.disconnect();
      await sleep(1000);
    }
    localStorage.removeItem("walletconnect");
  }
  reload(true);
}

export async function changeChain(type, wallet, chainId, flag_init = 0) {
  const oldSelectedWallet = localStorage.getItem("selectedWallet") || "";
  const oldWalletType = localStorage.getItem("walletType");
  const oldWalletName = localStorage.getItem("walletName");
  const oldWalletChainId = localStorage.getItem("walletChainId");
  localStorage.setItem("selectedWallet", "");
  localStorage.setItem("walletType", type || "");
  if (!(isSideChain(state.walletType) && isSideChain(type))) {
    localStorage.setItem("walletName", "");
  }
  localStorage.setItem("walletChainId", chainId || "");
  const params = getHashParams(window.location.hash);
  if (params && params.length > 0) {
    let pairCode = "";
    if (params.length > 2) {
      pairCode = "/" + params[1] + "/" + params[2];
    }
    if (/pro|classic/gi.test(window.location.pathname)) {
      history.replaceState(
        {},
        "",
        (/classic/gi.test(window.location.pathname) ? "/classic" : "/pro") +
          "#/" +
          (type + pairCode).toUpperCase()
      );
    }
  }
  if (/pro|classic/gi.test(window.location.pathname)) {
    history.replaceState(
      {},
      "",
      (/classic/gi.test(window.location.pathname) ? "/classic" : "/pro") +
        "#/" +
        type.toUpperCase()
    );
  }
  if (!isWalletConnect(wallet)) {
    if (isWalletConnect(state.walletName)) {
      const { currentProvider } = myWallet;
      await currentProvider.disconnect();
      await sleep(1000);
      await localStorage.removeItem("walletconnect");
    }
  }
  await changeChainTo(
    type,
    oldWalletType,
    oldWalletChainId,
    oldSelectedWallet,
    oldWalletName
  );
  reload(true);
}

const recoverChain = async (type, chainId, selectedWallet, walletName) => {
  localStorage.setItem("selectedWallet", selectedWallet);
  localStorage.setItem("walletType", type || "");

  if (!(isSideChain(state.walletType) && isSideChain(type))) {
    localStorage.setItem("walletName", walletName);
  }
  localStorage.setItem("walletChainId", chainId || "");
  const params = getHashParams(window.location.hash);
  console.log(localStorage.getItem("walletType"), "wwwwwwwwwwwww");
  if (params && params.length > 0) {
    let pairCode = "";
    if (params.length > 2) {
      pairCode = "/" + params[1] + "/" + params[2];
    }
    if (/pro|classic/gi.test(window.location.pathname)) {
      history.replaceState(
        {},
        "",
        (/classic/gi.test(window.location.pathname) ? "/classic" : "/pro") +
          "#/" +
          (type + pairCode).toUpperCase()
      );
    }
  }
  if (/pro|classic/gi.test(window.location.pathname)) {
    history.replaceState(
      {},
      "",
      (/classic/gi.test(window.location.pathname) ? "/classic" : "/pro") +
        "#/" +
        type.toUpperCase()
    );
  }
  if (isWalletConnect(state.walletName)) {
    const { currentProvider } = myWallet;
    await currentProvider.disconnect();
    await sleep(1000);
    await localStorage.removeItem("walletconnect");
  }
};

const changeChainTo = async (
  chain,
  oldType,
  oldChainId,
  oldSelect,
  oldWalletName
) => {
  const walletName = getCache(CACHE_KEY.Wallet);
  if (isApp()) {
    const sdk = await tryConnect(
      chain,
      "MetaMask",
      oldType,
      oldChainId,
      oldSelect,
      oldWalletName
    );
    await connect(sdk);
  } else if (isMobile() && walletName) {
    // isH5
    const sdk = await tryConnect(
      chain,
      "WalletConnect",
      oldType,
      oldChainId,
      oldSelect,
      oldWalletName
    );
    await connect(sdk);
  }
};

export const getBalances = async (tokenList, abi) => {
  let params = addEthereumChainParams[state.walletType];
  if (state.walletType === "eth") {
    params = [
      {
        chainId: `0x1`, // 1
        chainName: "Ethereum Mainnet",
        nativeCurrency: {
          name: "Ether",
          symbol: "eth",
          decimals: 18,
        },
        rpcUrls: ["https://rpc.ankr.com/eth"],
        blockExplorerUrls: ["https://etherscan.io"],
      },
    ];
  }
  if (!params) return;

  const { rpcUrls, chainId } = params[0];
  const provider = new ethers.providers.JsonRpcProvider(rpcUrls[0]);
  // if (chainId === "0x505") {
  //   Muliticall.setMulticallAddress(1285, "0xf61bc90581c7da1cb1e510b29ec4f96cf5b699f8")
  // }
  if (chainId === "0x120") {
    Muliticall.setMulticallAddress(
      288,
      "0xed8F54daA8Da64Ce82F23263B208417cB2729433"
    );
  }
  // optimism
  if (chainId === "0xa") {
    Muliticall.setMulticallAddress(
      10,
      "0xcA11bde05977b3631167028862bE2a173976CA11"
    );
  }
  // aurora
  if (chainId === "0x4e454152") {
    Muliticall.setMulticallAddress(
      1313161554,
      "0xBF69a56D35B8d6f5A8e0e96B245a72F735751e54"
    );
  }
  const ethcallProvider = new Muliticall.Provider(provider, chainId);
  await ethcallProvider.init();
  const multicall = [];
  const account = state.default_account;
  for (let i = 0; i < tokenList.length; i++) {
    const token = tokenList[i];
    if (isNativeToken(state.walletType, token.address)) {
      multicall.push(ethcallProvider.getEthBalance(account));
    } else {
      const contract = new Muliticall.Contract(token.address, ERC20_abi);
      multicall.push(contract.balanceOf(account));
    }
  }
  const result = await ethcallProvider.all(multicall);
  result.map((item, i) => {
    const { decimals } = tokenList[i];
    const amount = web3.utils.hexToNumberString(item);
    const balance = +amount === 0 ? 0 : decimals2Amount(amount, decimals);
    tokenList[i].balance = +toFixed(balance, 4, 4);
  });
};

export function getSolanaTokenBalance(balance) {
  let sum = 0;
  const { value = [] } = balance || {};
  value.forEach((item) => {
    const { account } = item || {};
    const { data } = account || {};
    const { parsed } = data || {};
    const { info } = parsed || {};
    const { tokenAmount } = info || {};
    const { amount = 0 } = tokenAmount || {};
    sum += +amount;
  });
  return sum;
}

export const tryConnect = async (
  chain,
  walletName,
  type = "",
  chainId,
  selected,
  name
) => {
  try {
    const params = {
      chain,
      walletName: walletName.replace(/\s+/gi, ""),
    };
    console.log("tryConnect params", params);
    const result = await swapSdk.connectWallet(params);
    console.log("tryConnect result", result);
    return result;
  } catch (e) {
    if (e.code === -32602) {
      showToast(`Please add ${chain} to your wallet!`);
    }
    if (e.code === 4001) {
      showToast("User rejected the request");
    }
    if (type) {
      recoverChain(type, chainId, selected, name);
    }
    console.log("tryConnect error", e);
    return null;
  }
};

export const connect = async (data) => {
  if (!data || !data.wallet) {
    return;
  }
  const { address, name: walletName } = data.wallet;
  const walletType = getCache(CACHE_KEY.Chain, "bsc");
  try {
    if (address) {
      state.default_account = address;
      const { sdk } = data.wallet;
      window.localStorage.setItem("selectedWallet", address);
      myWallet = sdk || {};
      const { currentProvider } = sdk || {};
      if (currentProvider && currentProvider.on) {
        currentProvider.on(
          "disconnect",
          debounce((args, payload) => {
            if (isWalletConnect(walletName)) {
              showToast(
                window.$t("wallet_message_50001", { wallet: walletName })
              );
              disConnect(walletType);
            }
          }, 2000)
        );

        currentProvider.on(
          "accountsChanged",
          debounce(async (args, payload) => {
            showToast(
              window.$t("wallet_message_50002", { wallet: walletName })
            );
            reload(true);
          }, 2000)
        );
        currentProvider.on(
          "chainChanged",
          debounce(async (args, payload) => {
            const currentChainId = await sdk.eth.getChainId();
            const _currrentChainId = getChainId(state.walletType);
            if (currentChainId === _currrentChainId) return;
            showToast(
              window.$t("wallet_message_50003", { wallet: walletName })
            );
            const chainList = getChains();
            const chain = chainList.filter((item) => {
              return item.chainId === currentChainId && item.disabled !== true;
            });
            console.log("currentChainId", currentChainId, chain);
            if (chain && chain[0]) {
              changeChain(
                chain[0].walletValue,
                state.walletType,
                chain[0].chainId
              );
            } else {
              disConnect(state.walletType);
            }
          }, 2000)
        );
      }
      state.walletName = walletName;
      loadBlackList();
    } else {
      localStorage.removeItem("walletType");
      localStorage.removeItem("walletName");
      localStorage.removeItem("walletChainId");
    }
  } catch (e) {
    console.log("connect catch", e);
    alert("connect catch");
    const { message } = e;
    const target = data.wallet;
    if (!target || !target.sdk || !target.sdk.currentProvider) {
      return;
    }
    const { currentProvider } = target.sdk;
    let websiteChainId, currentChainId;
    if (message === "40006" && currentProvider) {
      const params = addEthereumChainParams[walletType];
      if (params) {
        await currentProvider.request({
          method: "wallet_addEthereumChain",
          params,
        });
        currentChainId = await target.sdk.eth.getChainId();
        websiteChainId = getChainId(state.walletType);
        console.log(
          "wallet_switchEthereumChain",
          currentChainId,
          websiteChainId
        );
        if (websiteChainId === currentChainId) {
          await init();
        }
      } else if (walletType === "eth") {
        await currentProvider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x1" }],
        });
        currentChainId = await target.sdk.eth.getChainId();
        websiteChainId = getChainId(state.walletType);
        console.log(
          "wallet_switchEthereumChain",
          currentChainId,
          websiteChainId
        );
        if (websiteChainId === currentChainId) {
          await init();
        }
      } else {
        showToast(
          /^\d+$/.test(message) ? this.$t("wallet_message_" + message) : message
        );
        localStorage.removeItem("walletType");
        localStorage.removeItem("walletName");
        localStorage.removeItem("walletChainId");
        reload(true);
      }
    } else if (
      message === "Cannot read properties of undefined (reading 'fullPath')"
    ) {
      console.log(message);
    } else if (code === -32002) {
      showToast(window.$t("wallet_matemask_lock"));
    } else {
      showToast(
        /^\d+$/.test(message) ? window.$t("wallet_message_" + message) : message
      );
      localStorage.removeItem("walletType");
      localStorage.removeItem("walletName");
      localStorage.removeItem("walletChainId");
      reload(true);
    }
  }
};

export async function getBalance(chain, account, token) {
  try {
    const { address, decimals } = token;
    const params = {
      account,
      chain,
      tokenAddressOrSymbol: address,
      decimals,
    };
    const result = await swapSdk.getBalance(params);
    return result;
  } catch (e) {
    console.log("getBalance error", e);
    return null;
  }
}

export const getAllowance = async (chain, account, token, approveContract) => {
  try {
    const { address, decimals } = token;
    const proxyContract = approveContract;
    const params = {
      account,
      chain,
      tokenAddress: address,
      approveContract: proxyContract,
      decimals,
    };
    const result = await swapSdk.getAllowance(params);
    return result;
  } catch (e) {
    console.log("getAllowance error", e);
    return null;
  }
};

export const sendApproveTo = async (
  chain,
  tokenAddress,
  contractAddress,
  type,
  amount,
  decimals,
  gasPrice,
  amountWithDecimals
) => {
  try {
    const proxyContract = contractAddress;
    amount =
      type === "1"
        ? maxAmount
        : amountWithDecimals || amount2Decimals(amount, +decimals);
    const params = {
      chain,
      tokenAddress,
      contractAddress: proxyContract,
      amount,
      gasPrice,
      tokenAbi: ERC20_abi,
    };
    console.log("sendApproveTo params", params);
    const result = await swapSdk.approve(params);
    console.log("sendApproveTo result", result);
    return result;
  } catch (e) {
    console.log("sendApproveTo error", e);
    return null;
  }
};

export const getTokenByAddress = async (chain, address) => {
  try {
    const params = {
      chain,
      address,
      wallet: swapSdk && swapSdk.wallet && swapSdk.wallet.sdk,
    };
    console.log("getTokenByAddress params", params);
    const result = await api.getTokenByAddress(params);
    console.log("getTokenByAddress result", result);
    return result;
  } catch (e) {
    console.log("getTokenByAddress error", e);
    return null;
  }
};

export const isTokenAddress = (address) => {
  try {
    console.log("isTokenAddress params", address);
    const result = web3.utils.isAddress(address);
    console.log("isTokenAddress result", result);
    return result;
  } catch (e) {
    console.log("isTokenAddress error", e);
    return false;
  }
};

export const getGas = async (swapData) => {
  try {
    const { params = {} } = swapData || {};
    const { chain } = params || {};
    let result = "";
    result = await swapSdk.getGas(swapData);
    return result;
  } catch (e) {
    console.log("getGas error", e);
    return 0;
  }
};

export const sendTransaction = async (swapData) => {
  let explorer = "";
  const instance = showNotification({
    status: "loading",
    text: "Please, sign transaction in your wallet",
  });
  try {
    const { params = {} } = swapData || {};
    const { chain } = params || {};
    let hash = "";
    hash = await swapSdk.fastSwap(swapData);
    getChains().forEach((item) => {
      if (item.value === state.walletType) {
        explorer = item.blockExplorerUrl;
      }
    });
    if (hash) {
      instance.change({
        status: "submitted",
        chain: state.walletType,
        address: hash,
        title: window.$t("notification_submited_title"),
        text: window.$t("notification_submited_content"),
        subcontent: `Successfully swap from ${swapData.inToken.symbol} to ${swapData.outToken.symbol}`,
      });
    }
    return {
      status: "success",
      hash,
    };
  } catch (e) {
    const message = typeof e === "string" ? e : e.message;
    instance.change({ status: "failed", text: message });
    return {
      status: "rejected",
      message,
    };
  }
};

export async function disConnect(network) {
  localStorage.removeItem("walletChainId");
  localStorage.removeItem("walletName");
  localStorage.removeItem("selectedWallet");
  localStorage.removeItem("walletconnect");
  localStorage.removeItem("connectorId");
  localStorage.setItem("walletType", network || "eth");
  if (isWalletConnect(state.walletName)) {
    const { currentProvider } = myWallet;
    await currentProvider.disconnect();
    await sleep(1000);
  }
  reload(true);
}

export async function sendEthApprove(
  inToken,
  type,
  amount,
  gasPrice,
  toContract
) {
  const contract = new myWallet.eth.Contract(ERC20_abi, inToken);
  const approveAmount =
    type === "1"
      ? BigNumber(
          "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
        ).toFixed(0, 1)
      : amount;
  const account = state.default_account;
  const gasAmount = await contract.methods
    .approve(toContract, approveAmount)
    .estimateGas({
      from: account,
    });
  return await confirmLater(
    contract.methods.approve(toContract, approveAmount).send({
      from: account,
      gasPrice,
      gas: gasAmount,
    })
  );
}

export async function getContractDecimals(address) {
  let tokenContract;
  if (state.walletType === "solana") {
    const res = await myWallet.connection.getTokenSupply(
      new PublicKey(address)
    );
    if (res && res.value && res.value.decimals) {
      return res.value.decimals;
    }
  } else if (state.walletType === "tron") {
    tokenContract = await myWallet.contract().at(address);
    return await tokenContract.methods.decimals().call();
  } else {
    let result = await axios.get(
      `https://open-api.openocean.finance/v3/${state.walletType}/getTokenInfo`,
      {
        params: { tokenAddress: address },
      }
    );
    if (result.symbol && result.decimals) {
      return result.decimals;
    }
    return -1;
  }
}

export async function getSolanaTransactions() {
  const result = await myWallet.connection.getConfirmedSignaturesForAddress2(
    myWallet.customPublicKey,
    {
      limit: 25,
    }
  );
  return result;
}

export async function createLimitOrder(
  makerToken,
  takerToken,
  _makerAddress,
  makerAmount,
  takerAmount,
  chainId,
  gasPrice,
  expire,
  decimals
) {
  const connector = new Web3ProviderConnector(myWallet);
  const limitOrderBuilder = new LimitOrderBuilder(
    getLimitContractAddress(),
    chainId,
    connector
  );
  const limitOrderProtocolFacade = new LimitOrderProtocolFacade(
    getLimitContractAddress(),
    connector
  );
  const limitOrderPredicateBuilder = new LimitOrderPredicateBuilder(
    limitOrderProtocolFacade
  );
  const minutes = {
    "10M": 10,
    "1H": 60,
    "1D": 1440,
    "3D": 4320,
    "7D": 10080,
    "30D": 43200,
    "3Month": 129600,
    "6Month": 259200,
    "1Y": 525600,
    "2Y": 1051200,
    "3Y": 1576800,
  }[expire];
  const expireTime = Date.now() + minutes * 60 * 1000;
  const { and, timestampBelow } = limitOrderPredicateBuilder;
  const simplePredicate = and(
    timestampBelow(Math.round(Date.now() / 1000) + minutes * 60) // a limit order is valid only for 1 minute
  );
  const limitOrder = limitOrderBuilder.buildLimitOrder({
    makerAssetAddress: makerToken.address,
    takerAssetAddress: takerToken.address,
    makerAddress: _makerAddress,
    makerAmount,
    takerAmount,
    predicate: simplePredicate,
    permit: "0x",
    interaction: "0x",
  });
  const limitOrderTypedData =
    limitOrderBuilder.buildLimitOrderTypedData(limitOrder);
  limitOrderTypedData.domain.name = "openocean Limit Order Protocol";
  limitOrderTypedData.domain.version = "2";
  const contract = new myWallet.eth.Contract(ERC20_abi, makerToken.address);
  if (!isNativeToken(state.walletType, makerToken.address)) {
    const approveAmount = await contract.methods
      .allowance(_makerAddress, getLimitContractAddress())
      .call();
    const _approveAmount = +decimals2Amount(approveAmount, decimals);
    const _makerAmount2 = +decimals2Amount(makerAmount, decimals);
    console.log("_approveAmount", _approveAmount, _makerAmount2, decimals);
    if (_approveAmount < _makerAmount2) {
      await sendEthApprove(
        makerToken.address,
        "1",
        "",
        gasPrice,
        getLimitContractAddress()
      );
    }
  }
  const signature = await limitOrderBuilder.buildOrderSignature(
    _makerAddress,
    limitOrderTypedData
  );
  const orderHash = limitOrderBuilder.buildLimitOrderHash(limitOrderTypedData);
  const { message } = limitOrderTypedData;
  return {
    makerAmount: makerAmount,
    takerAmount: takerAmount,
    signature,
    orderHash: orderHash,
    orderMaker: _makerAddress,
    remainingMakerAmount: makerAmount,
    data: message,
    isActive: true,
    chainId: chainId,
    expireTime: formatDate(expireTime / 1000),
  };
}

export async function fillLimitOrder(order, gasPrice) {
  const instance = showNotification({
    status: "loading",
    title: "FillOrder",
    text: "Please, sign transaction in your wallet",
  });
  try {
    const { data, signature, makerAmount } = order;
    const limitOrder = data;
    const connector = new Web3ProviderConnector(myWallet);
    const limitOrderProtocolFacade = new LimitOrderProtocolFacade(
      getLimitContractAddress(),
      connector
    );
    const thresholdAmount = makerAmount;
    const callData = limitOrderProtocolFacade.fillLimitOrder(
      limitOrder,
      signature,
      makerAmount,
      "0",
      (thresholdAmount * 2).toString()
    );
    const account = state.default_account;
    const { takerAsset } = limitOrder;
    const contract = new myWallet.eth.Contract(ERC20_abi, takerAsset);
    const approveAmount = await contract.methods
      .allowance(account, getLimitContractAddress())
      .call();
    const _approveAmount =
      Math.floor(+decimals2Amount(approveAmount, 18) * 10000) / 10000;
    const _makerAmount =
      Math.floor(+decimals2Amount(makerAmount, 18) * 10000) / 10000;
    if (_approveAmount < _makerAmount) {
      await sendEthApprove(
        takerAsset,
        "1",
        "",
        gasPrice,
        getLimitContractAddress()
      );
    }
    const swapParams = {
      from: account,
      to: getLimitContractAddress(),
      data: callData,
      gas: 5000000,
      gasPrice,
    };
    const result = await confirmLater(myWallet.eth.sendTransaction(swapParams));
    if (result && result.message) {
      instance.change({ status: "failed", text: result.message });
    } else {
      instance.change({
        status: "submitted",
        chain: state.walletType,
        address: result,
      });
      setTimeout(() => {
        reloadPage(true);
      }, 3000);
    }
  } catch (e) {
    console.warn(e);
    console.log("Error: " + e.message);
    instance.change({ status: "failed", text: e.message || e });
  }
}

export async function cancelLimitOrder(order, gasPrice) {
  const instance = showNotification({
    status: "loading",
    title: "CancelLimitOrder",
    text: "Please, sign transaction in your wallet",
  });
  try {
    const connector = new Web3ProviderConnector(myWallet);
    const limitOrderProtocolFacade = new LimitOrderProtocolFacade(
      getLimitContractAddress(),
      connector
    );
    const callData = limitOrderProtocolFacade.cancelLimitOrder(order.data);
    const account = state.default_account;
    const swapParams = {
      from: account,
      to: getLimitContractAddress(),
      data: callData,
      gas: 5000000,
      gasPrice,
    };
    const result = await confirmLater(myWallet.eth.sendTransaction(swapParams));
    if (result && result.message) {
      instance.change({ status: "failed", text: result.message });
    } else {
      instance.change({
        status: "submitted",
        chain: state.walletType,
        address: result,
      });
      setTimeout(() => {
        reloadPage(true);
      }, 3000);
    }
  } catch (e) {
    console.warn(e);
    console.log("Error: " + e.message);
    instance.change({ status: "failed", text: e.message || e });
  }
}

export function cancelAllLimitOrder(gasPrice) {
  const connector = new Web3ProviderConnector(myWallet);
  const limitOrderProtocolFacade = new LimitOrderProtocolFacade(
    getLimitContractAddress(),
    connector
  );
  const callData = limitOrderProtocolFacade.increaseNonce();
  const from = state.default_account;
  sendTransaction(
    {
      from,
      // gas: 210_000, // Set your gas limit
      gasPrice: 1, // Set your gas price
      to: getLimitContractAddress(),
      data: callData,
      gas: 5000000,
      gasPrice,
    },
    {}
  );
}

export async function ecRecover(account, msg, sig) {
  return new Promise((resolve) => {
    myWallet.eth.personal.ecRecover(msg, sig, function (err, address) {
      if (!err)
        resolve({
          result: address.toLowerCase() === account.toLowerCase(),
        });
      else {
        console.log("web3.eth.personal.ecRecover", err, address);
        resolve({ error: err });
      }
    });
  });
}

export async function personalSign() {
  await init();
  const account = state.default_account;
  const chain = state.walletType;
  const timestamp = new Date().getTime();
  const msg = `action:\nOpenOcean Authentication\nonlySignOn:\nhttps://openocean.finanace\ntimestamp:\n${timestamp}`;
  return new Promise((resolve) => {
    if (myWallet !== null) {
      myWallet.eth.personal.sign(
        msg,
        account,
        "",
        async function (err, result) {
          if (!err) {
            const valid = await ecRecover(account, msg, result);
            if (valid.result) {
              resolve({
                "OPENOCEAN-SIGNATURE": result,
                "OPENOCEAN-MESSAGE": msg,
                "OPENOCEAN-ADDRESS": account,
                "OPENOCEAN-TIMESTAMP": timestamp,
                "OPENOCEAN-TYPE": chain,
              });
            }
          } else {
            // resolve({ error: err });
            disConnect(state.walletType);
          }
        }
      );
    }
  });
}

export async function getOraclePrice(chain, symbol) {
  const result = chainLinkAddress[chain].filter((item) => {
    return item.symbol.toLowerCase() === symbol.toLowerCase();
  });
  if (!result || !result.length) return 0;
  const { address, decimal } = result[0];
  try {
    const contract = new myWallet.eth.Contract(chainLinkAbi.abi, address);
    const { answer } = await contract.methods.latestRoundData().call();
    const price =
      Math.floor(+decimals2Amount(+answer || 0, decimal) * 1000000) / 1000000;
    return price;
  } catch (e) {
    return 0;
  }
}

export async function getLimitOrderAllowance(inToken) {
  try {
    const address = state.default_account;
    if (!state.account) return 0;
    const contract = new myWallet.eth.Contract(ERC20_abi, inToken);
    const approveAmount = await contract.methods
      .allowance(address, getLimitContractAddress())
      .call();
    const _approveAmount =
      Math.floor(+decimals2Amount(approveAmount, 18) * 10000) / 10000;
    return _approveAmount;
  } catch (e) {
    console.log("getLimitOrderAllowance", e);
  }
}

export async function sendLimitOrderApprove(inToken, gasPrice) {
  await sendEthApprove(inToken, "1", "", gasPrice, getLimitContractAddress());
}

export async function sendLimitOrderSign() {
  const account = state.default_account;
  const chain = state.walletType;
  const timestamp = new Date().getTime();
  // const msg = `action:\nOpenOcean Authentication\nonlySignOn:\nhttps://openocean.finanace\ntimestamp:\n${timestamp}`;
  const msg =
    "0xc4fa769adf9cf288396c7e22be81ab22b32b05e35b7fc36968cad99cdf4429f1";
  return new Promise((resolve) => {
    if (myWallet !== null) {
      myWallet.eth.personal.sign(
        msg,
        account,
        "",
        async function (err, result) {
          if (!err) {
            const valid = await ecRecover(account, msg, result);
            if (valid.result) {
              resolve({
                "OPENOCEAN-SIGNATURE": result,
                "OPENOCEAN-MESSAGE": msg,
                "OPENOCEAN-ADDRESS": account,
                // "OPENOCEAN-TIMESTAMP": timestamp,
                // "OPENOCEAN-TIMESTAMP": null,
                "OPENOCEAN-TYPE": chain,
              });
            }
          } else {
            resolve({ error: err });
            return;
            // disConnect(state.walletType);
          }
        }
      );
    }
  });
}

export default init;
