import ethIconDark from "@/assets/chains/eth-dark.svg";
import bscIconDark from "@/assets/chains/bsc-dark.svg";
import okIconDark from "@/assets/chains/ok-dark.svg";
import ontIconDark from "@/assets/chains/ont-dark.svg";
import tronIconDark from "@/assets/chains/tron-dark.svg";
import solIconDark from "@/assets/chains/sol-dark.svg";
import dotIconDark from "@/assets/chains/dot-dark.svg";
import neoIconDark from "@/assets/chains/neo-dark.svg";
import fantomIconDark from "@/assets/chains/fantom-dark.svg";
import hecoIconDark from "@/assets/chains/heco-dark.svg";
import polygonIconDark from "@/assets/chains/polygon-dark.svg";
import xdaiIconDark from "@/assets/chains/xdai-dark.svg";
import terraIconDark from "@/assets/chains/terra-dark.svg";
import avalancheIconDark from "@/assets/chains/avalanche-dark.svg";
import harmonyIconDark from "@/assets/chains/harmony-dark.svg";
import arbIconDark from "@/assets/chains/arb-dark.svg";
import opIconDark from "@/assets/chains/op-dark.svg";
import bobaIconDark from "@/assets/chains/boba-dark.svg";
import mrIconDark from '@/assets/chains/moonriver-dark.svg'
import auroraIconDark from '@/assets/chains/aurora-dark.svg'
import cronosIconDark from '@/assets/chains/cronos-dark.svg'
import osmosisIconDark from '@/assets/chains/osmosis-dark.svg'
import sifchainIconDark from '@/assets/chains/sifchain-dark.svg'

import ethIcon from "@/assets/chains/eth-dark.svg";
import bscIcon from "@/assets/chains/bsc.svg";
import okIcon from "@/assets/chains/ok.svg";
import ontIcon from "@/assets/chains/ont.svg";
import tronIcon from "@/assets/chains/tron.svg";
import solIcon from "@/assets/chains/sol.svg";
import dotIcon from "@/assets/chains/dot.svg";
import neoIcon from "@/assets/chains/neo.svg";
import fantomIcon from "@/assets/chains/fantom.svg";
import hecoIcon from "@/assets/chains/heco.svg";
import polygonIcon from "@/assets/chains/polygon.svg";
import xdaiIcon from "@/assets/chains/xdai.svg";
import terraIcon from "@/assets/chains/terra.svg";
import avalancheIcon from "@/assets/chains/avalanche.svg";
import harmonyIcon from "@/assets/chains/harmony.svg";
import arbIcon from "@/assets/chains/arb.svg";
import opIcon from "@/assets/chains/op.svg";
import bobaIcon from "@/assets/chains/boba.svg";
import mrIcon from '@/assets/chains/moonriver.svg'
import auroraIcon from '@/assets/chains/aurora.svg'
import cronosIcon from '@/assets/chains/cronos.svg'
import osmosisIcon from '@/assets/chains/osmosis.svg'
import sifchainDark from '@/assets/chains/sifchain.svg'

const getChains = () => {
  return [
    {
      name: "Ethereum Mainnet",
      label:"Ethereum",
      value: "eth",
      walletValue: "eth",
      icon: ethIcon,
      chainId: 1,
      iconDark: ethIconDark,
      blockExplorerUrl: "https://etherscan.io/tx/",
      defaultSymbol: {
        in: "eth",
        out: "usdt",
      },
      popularToken: [
        "ETH",
        "USDT",
        "USDC",
        "BUSD",
        "UNI",
        "C98",
        "LINK",
        "MATIC",
      ],
      disabled: false,
    },
    // {
    //   name: "Ropsten Test Network",
    //   value: "ropsten",
    //   walletValue: "ropsten",
    //   icon: ethIcon,
    //   chainId: 3,
    //   iconDark: ethIconDark,
    //   blockExplorerUrl: "https://ropsten.etherscan.io/tx/",
    //   defaultSymbol: {
    //     in: "dai",
    //     out: "ooe",
    //   },
    //   popularToken: [
    //     "ETH",
    //     "DAI",
    //     "OOE",
    //   ],
    // },
    {
      name: "BSC Mainnet",
      name: "BNB Chain",
      label:"BNB Chain",
      value: "bsc",
      walletValue: "bsc",
      icon: bscIcon,
      chainId: 56,
      // chainId: 97,
      iconDark: bscIconDark,
      blockExplorerUrl: "https://bscscan.com/tx/",
      defaultSymbol: {
        in: "bnb",
        out: "busd",
      },
      popularToken: [
        "OOE",
        "BNB",
        "USDT",
        "BUSD",
        "CAKE",
        "C98",
        "BAKE",
        "MBOX",
      ],
      disabled: false,
    },
    // {
    //   name: "BSC Testnet Network",
    //   value: "bsctest",
    //   walletValue: "bsctest",
    //   icon: bscIcon,
    //   chainId: 97,
    //   iconDark: bscIconDark,
    //   blockExplorerUrl: "https://testnet.bscscan.com/tx/",
    //   defaultSymbol: {
    //     in: "bnb",
    //     out: "busd",
    //   },
    //   popularToken: [
    //     "OOE",
    //     "BNB",
    //     "USDT",
    //     "BUSD",
    //     "CAKE",
    //     "C98",
    //     "BAKE",
    //     "MBOX",
    //   ],
    // },
    {
      name: "Solana Mainnet",
      label:"Solana",
      value: "solana",
      walletValue: "solana",
      icon: solIcon,
      iconDark: solIconDark,
      blockExplorerUrl: "https://solscan.io/tx/",
      defaultSymbol: {
        in: "sol",
        out: "usdc",
      },
      popularToken: ["SOL", "SNY", "USDT", "USDC", "RAY", "STEP"],
      disabled: false,
    },
    {
      name: "Polygon Mainnet",
      label:"Polygon",
      value: "polygon",
      walletValue: "polygon",
      chainId: 137,
      icon: polygonIcon,
      iconDark: polygonIconDark,
      blockExplorerUrl: "https://polygonscan.com/tx/",
      defaultSymbol: {
        in: "matic",
        out: "usdt",
      },
      popularToken: [
        "OOE",
        "USDT",
        "USDC",
        "MATIC",
        "AAVE",
        "DINO",
        "ADDY",
        "MIMATIC",
      ],
      disabled: false,
    },
    {
      name: "Avalanche",
      label:"Avalanche",
      value: "avax",
      walletValue: "avax",
      chainId: 43114,
      icon: avalancheIcon,
      iconDark: avalancheIconDark,
      blockExplorerUrl: "https://cchain.explorer.avax.network/tx/",
      defaultSymbol: {
        in: "avax",
        out: "usdt.e",
      },
      popularToken: [
        "OOE",
        "AVAX",
        "PNG",
        "DAI.E",
        "ETH",
        "WAVAX",
        "JOE",
        "QI",
        "USDC.E",
      ],
      disabled: false,
    },
    {
      name: "Fantom",
      label:"Fantom",
      value: "fantom",
      walletValue: "fantom",
      chainId: 250,
      icon: fantomIcon,
      iconDark: fantomIconDark,
      blockExplorerUrl: "https://ftmscan.com/tx/",
      defaultSymbol: {
        in: "ftm",
        out: "usdc",
      },
      popularToken: [
        "OOE",
        "ETH",
        "USDT",
        "USDC",
        "SPIRIT",
        "1INCH",
        "C98",
        "FTM",
        "fUSDT",
        "MIM",
        "BOO",
      ],
      disabled: false,
    },
    {
      name: "Arbitrum",
      label:"Arbitrum",
      value: "arbitrum",
      walletValue: "arbitrum",
      icon: arbIcon,
      chainId: 42161,
      iconDark: arbIconDark,
      blockExplorerUrl: "https://arbiscan.io/tx/",
      defaultSymbol: {
        in: "uni",
        out: "usdc",
      },
      disabled: false,
    },
    {
      name: "Optimism",
      label:"Optimism",
      value: "optimism",
      walletValue: "optimism",
      icon: opIcon,
      chainId: 10,
      iconDark: opIconDark,
      blockExplorerUrl: "https://optimistic.etherscan.io/tx/",
      defaultSymbol: {
        in: "eth",
        out: "usdc",
      },
    },
    {
      name: "Aurora Mainnet",
      label:"Aurora",
      value: "aurora",
      walletValue: "aurora",
      icon: auroraIcon,
      chainId: 1313161554,
      iconDark: auroraIconDark,
      blockExplorerUrl: "https://aurorascan.dev/tx/",
      defaultSymbol: {
        in: "eth",
        out: "usdc",
      },
    },
    // {
    //   name: "Terra Mainnet",
    //   label:"Terra",
    //   value: "terra",
    //   walletValue: "terra",
    //   chainId: "columbus-5",
    //   icon: terraIcon,
    //   iconDark: terraIconDark,
    //   blockExplorerUrl: "https://finder.terra.money/columbus-5/tx/",
    //   defaultSymbol: {
    //     in: "luna",
    //     out: "ust",
    //   },
    //   disabled: false,
    // },
    {
      name: "Harmony Mainnet",
      label:"Harmony",
      value: "harmony",
      walletValue: "harmony",
      chainId: 1666600000,
      icon: harmonyIcon,
      iconDark: harmonyIconDark,
      blockExplorerUrl: "https://explorer.harmony.one/tx/",
      defaultSymbol: {
        in: "one",
        out: "1usdc",
      },
      disabled: false,
    },
    {
      name: "Gnosis Mainnet",
      label:"Gnosis",
      value: "xdai",
      walletValue: "xdai",
      chainId: 100,
      icon: xdaiIcon,
      iconDark: xdaiIconDark,
      blockExplorerUrl: "https://blockscout.com/poa/xdai/tx/",
      defaultSymbol: {
        in: "xdai",
        out: "usdt",
      },
      popularToken: ["OOE", "ETH", "USDT", "USDC", "BUSD", "1INCH", "C98"],
      disabled: false,
    },
    {
      name: "Boba Mainnet",
      label:"Boba",
      value: "boba",
      walletValue: "boba",
      chainId: 288,
      icon: bobaIcon,
      iconDark: bobaIconDark,
      blockExplorerUrl: "https://blockexplorer.boba.network/tx/",
      defaultSymbol: {
        in: "weth",
        out: "usdt",
      },
      disabled: false,
    },
    {
      name: "Ontology Mainnet",
      label:"Ontology",
      value: "ont",
      walletValue: "ont",
      icon: ontIcon,
      iconDark: ontIconDark,
      blockExplorerUrl: "https://explorer.ont.io/transaction/",
      defaultSymbol: {
        in: "wing",
        out: "ontd",
      },
      popularToken: [],
      disabled: false,
    },
    {
      name: "Tron Mainnet",
      label:"Tron",
      value: "tron",
      walletValue: "tron",
      icon: tronIcon,
      iconDark: tronIconDark,
      blockExplorerUrl: "https://tronscan.io/#/transaction/",
      defaultSymbol: {
        in: "trx",
        out: "usdt",
      },
      popularToken: ["TRX", "WTRX", "ETH", "BTC", "USDT", "USDJ", "JST"],
      disabled: false,
    },
    {
      name: "Heco Mainnet",
      label:"Heco",
      value: "heco",
      walletValue: "heco",
      chainId: 128,
      icon: hecoIcon,
      iconDark: hecoIconDark,
      blockExplorerUrl: "https://hecoinfo.com/tx/",
      defaultSymbol: {
        in: "ht",
        out: "usdc",
      },
      popularToken: ["HT", "ETH", "AAVE", "USDT", "USDC", "MDX", "DEP"],
      disabled: false,
    },
    {
      name: "OKC Mainnet",
      label:"OKC",
      value: "okex",
      walletValue: "okex",
      icon: okIcon,
      chainId: 66,
      // chainId: 97,
      iconDark: okIconDark,
      blockExplorerUrl: "https://www.oklink.com/en/okc/tx/",
      defaultSymbol: {
        in: "okt",
        out: "usdt",
      },
      popularToken: ["OKT", "OKB", "USDT", "USDC", "BUSD", "BNB", "CHE"],
      disabled: false,
    },
    // {
    //   name: "Cronos Mainnet",
    //   label:"Cronos",
    //   value: "cronos",
    //   walletValue: "cronos",
    //   icon: cronosIcon,
    //   chainId: 25,
    //   iconDark: cronosIconDark,
    //   blockExplorerUrl: "https://cronos.org/explorer/tx/",
    //   defaultSymbol: {
    //     in: "cro",
    //     out: "usdc",
    //   },
    // },
    {
      name: "Moonriver",
      label: "Moonriver",
      value: "moonriver",
      walletValue: "moonriver",
      icon: mrIcon,
      chainId: 1285,
      iconDark: mrIconDark,
      blockExplorerUrl: "https://moonriver.moonscan.io/tx/",
      defaultSymbol: {
        in: "movr",
        out: "usdc",
      },
      disabled: true,
    },
    // {
    //   name: "Cronos Mainnet",
    //   label: "Cronos",
    //   value: "cronos",
    //   walletValue: "cronos",
    //   icon: cronosIcon,
    //   chainId: 25,
    //   iconDark: cronosIconDark,
    //   blockExplorerUrl: "https://cronos.org/explorer/tx/",
    //   defaultSymbol: {
    //     in: "cro",
    //     out: "usdc",
    //   },
    //   disabled: false,
    // },
    // {
    //   name: "Osmosis Mainnet",
    //   label: "Osmosis",
    //   value: "osmosis",
    //   walletValue: "osmosis",
    //   icon: osmosisIcon,
    //   chainId: "osmosis-1",
    //   iconDark: osmosisIconDark,
    //   blockExplorerUrl: "https://www.mintscan.io/osmosis/txs/",
    //   defaultSymbol: {
    //     in: "osmo",
    //     out: "atom",
    //   },
    //   disabled: false,
    // },
    // {
    //   name: "Sifchain Mainnet",
    //   label: "Sifchain",
    //   value: "sifchain",
    //   walletValue: "sifchain",
    //   icon: sifchainDark,
    //   chainId: "sifchain-1",
    //   iconDark: sifchainIconDark,
    //   blockExplorerUrl: "https://www.mintscan.io/sifchain/txs/",
    //   defaultSymbol: {
    //     in: "rowan",
    //     out: "atom",
    //   },
    //   popularToken: ["OOE", "ETH", "USDT", "USDC", "BUSD", "1INCH", "C98"],
    //   disabled: false,
    // },
    // {
    //   name: "Polkadot",
    //   label: "Polkadot",
    //   value: "dot",
    //   walletValue: "dot",
    //   icon: dotIcon,
    //   iconDark: dotIconDark,
    //   blockExplorerUrl: "",
    //   defaultSymbol: {
    //     in: "eth",
    //     out: "usdt",
    //   },
    //   popularToken: ["OOE", "ETH", "USDT", "USDC", "BUSD", "1INCH", "C98"],
    //   disabled: true,
    // },
    // {
    //   name: "Neo",
    //   label: "Neo",
    //   value: "neo",
    //   walletValue: "neo",
    //   icon: neoIcon,
    //   iconDark: neoIconDark,
    //   blockExplorerUrl: "",
    //   defaultSymbol: {
    //     in: "eth",
    //     out: "usdt",
    //   },
    //   popularToken: ["OOE", "ETH", "USDT", "USDC", "BUSD", "1INCH", "C98"],
    //   disabled: true,
    // },
  ];
};

export const getChainId = (selectedChain) => {
  if (selectedChain === "eth") {
    return 1;
  } else if (selectedChain === "ropsten") {
    return 3;
  } else if (selectedChain === "bsc") {
    return 56;
  } else if (selectedChain === "bsctest") {
    return 97;
  } else if (selectedChain === "okex") {
    return 66;
  } else if (selectedChain === "polygon") {
    return 137;
  } else if (selectedChain === "xdai") {
    return 100;
  } else if (selectedChain === "heco") {
    return 128;
  } else if (selectedChain === "fantom") {
    return 250;
  } else if (selectedChain === "boba") {
    return 288;
  } else if (selectedChain === "avax") {
    return 43114;
  } else if (selectedChain === "arbitrum") {
    return 42161;
  } else if (selectedChain === "optimism") {
    return 10;
  } else if (selectedChain === "moonriver") {
    return 1285;
  } else if (selectedChain === "aurora") {
    return 1313161554;
  } else if (selectedChain === "cronos") {
    return 25;
  } else if (selectedChain === "harmony") {
    return 1666600000;
  }
};

export const Chains = {
  ETH: 'ETH',
  BSC: 'BSC',
  ONT: 'ONT',
  TRON: 'TRON',
  POLYGON: 'POLYGON',
  XDAI: 'XDAI',
  BOBA: 'BOBA',
  FANTOM: 'FANTOM',
  HECO: 'HECO',
  AVALANCHE: 'AVAX',
  OKEX: 'OKEX',
  SOLANA: 'SOLANA',
  ARBITRUM: 'ARBITRUM',
  OPTIMISM: 'OPTIMISM',
  MOONRIVER: 'MOONRIVER',
  AURORA: 'AURORA',
  CRONOS: 'CRONOS',
  HARMONY: 'HARMONY'
};

export const getNativeToken = (selectedChain) => {
  if (["eth", "ropsten", "arbitrum", "optimism", "boba", "aurora"].indexOf(selectedChain) >= 0) {
    return {
      symbol: "ETH",
      id: "ethereum",
      decimals: 18,
    };
  } else if (selectedChain === "bsc" || selectedChain === "bsctest") {
    return {
      symbol: "BNB",
      id: "binancecoin",
      decimals: 18,
    };
  } else if (selectedChain === "okex") {
    return {
      symbol: "OKT",
      id: "okexchain",
      decimals: 18,
    };
  } else if (selectedChain === "polygon") {
    return {
      symbol: "MATIC",
      id: "matic-network",
      decimals: 18,
    };
  } else if (selectedChain === "xdai") {
    return {
      symbol: "XDAI",
      id: "wrapped-xda",
      decimals: 18,
    };
  } else if (selectedChain === "fantom") {
    return {
      symbol: "FTM",
      id: "fantom",
      decimals: 18,
    };
  } else if (selectedChain === "heco") {
    return {
      symbol: "HT",
      id: "huobi-token",
      decimals: 18,
    };
  } else if (selectedChain === "avax") {
    return {
      symbol: "AVAX",
      id: "wrapped-avax",
      decimals: 18,
    };
  } else if (selectedChain === "terra") {
    return {
      symbol: "UST",
      id: "terrausd",
      decimals: 18,
    };
  } else if (selectedChain === "moonriver") {
    return {
      symbol: "MOVR",
      id: "moonriver",
      decimals: 18,
    };
  } else if (selectedChain === "cronos") {
    return {
      symbol: "CRO",
      id: "crypto-com-chain",
      decimals: 18,
    };
  } else if (selectedChain === "harmony") {
    return {
      symbol: "ONE",
      id: "harmony",
      decimals: 18,
    };
  } else if (selectedChain === "cosmos") {
    return {
      symbol: "ATOM",
      id: "cosmos",
      decimals: 18,
    };
  }
};

export const getWrappedNativeToken = (selectedChain) => {
  return {
    'eth': '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // WETH
    'bsc': '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', // WBNB
    'polygon': '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270', // WMATIC
    'avax': '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7', // WAVAX
    'fantom': '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83', // WFTM
    'arbitrum': '0x82af49447d8a07e3bd95bd0d56f35241523fbab1', // WETH
    'optimism': '0x4200000000000000000000000000000000000006', // WETH
    'aurora': '0xC9BdeEd33CD01541e1eeD10f90519d2C06Fe3feB', // WETH
    'xdai': '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d', // XDAI
    'boba': '0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000', // WETH
    'heco': '0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F', // WHT
    'wokt': '0x8F8526dbfd6E38E3D8307702cA8469Bae6C56C15', // WOKT
    'harmony': '0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a', // WONE
    'cronos': '0x5c7f8a570d578ed84e63fdfa7b1ee72deae1ae23', // WCRO
  }[selectedChain];
};

export const getDefaultToken = (selectedChain) => {
  if (selectedChain === "eth") {
    return [
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        icon: "https://cloudstorage.openocean.finance/images/1637894743832_8242841824007741.png",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://ethapi.openocean.finance/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "bsc") {
    return [
      {
        id: "binancecoin",
        name: "Binance Coin",
        symbol: "BNB",
        icon: "https://ethapi.openocean.finance/logos/bsc/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
      },
      {
        id: "binance-usd",
        name: "Binance-Peg BUSD Token",
        symbol: "BUSD",
        icon: "https://ethapi.openocean.finance/logos/bsc/0xe9e7cea3dedca5984780bafc599bd69add087d56.png",
        address: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
        decimals: 18,
      },
    ];
  } else if (selectedChain === "solana") {
    return [
      // {
      //   id: "ethereum",
      //   name: "Ethereum",
      //   symbol: "ETH",
      //   icon: "https://ethapi.openocean.finance/logos/solana/2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk.png",
      //   address: "2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk",
      //   decimals: 18,
      // },
      {
        ids: 'solana',
        name: 'Wrapped SOL',
        address: 'So11111111111111111111111111111111111111112',
        decimals: 9,
        symbol: 'SOL',
        // chain: 'solana',
        // chainId: null,
        icon: 'https://ethapi.openocean.finance/logos/solana/So11111111111111111111111111111111111111112.png',
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://ethapi.openocean.finance/logos/solana/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB.png",
        address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
        decimals: 6,
      },
    ];
    // return [
    //   {
    //     id: 'solana',
    //     name: 'Wrapped SOL',
    //     address: 'So11111111111111111111111111111111111111112',
    //     decimals: 9,
    //     symbol: 'SOL',
    //     icon: 'https://ethapi.openocean.finance/logos/solana/So11111111111111111111111111111111111111112.png',
    //   },
    //   {
    //     id: "tether",
    //     name: "Tether USD",
    //     symbol: "USDT",
    //     icon: "https://ethapi.openocean.finance/logos/solana/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB.png",
    //     address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    //     decimals: 6,
    //   }
    // ]
  } else if (selectedChain === "polygon") {
    return [
      {
        id: "matic-network",
        name: "Matic Token",
        symbol: "MATIC",
        icon: "https://cloudstorage.openocean.finance/images/1637561049975_1903381661429342.png",
        address: "0x0000000000000000000000000000000000001010",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://cloudstorage.openocean.finance/images/1640831384587_011475796734160326.png",
        address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "avax") {
    return [
      {
        id: "wrapped-avax",
        name: "Avalanche Token",
        symbol: "AVAX",
        icon: "https://ethapi.openocean.finance/logos/avax/0x0000000000000000000000000000000000000000.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT.e",
        icon: "https://ethapi.openocean.finance/logos/avax/0xc7198437980c041c805a1edcba50c1ce5db95118.png",
        address: "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "fantom") {
    return [
      {
        id: "wrapped-fantom",
        name: "Wrapped Fantom Token",
        symbol: "WFTM",
        icon: "https://ethapi.openocean.finance/logos/fantom/0x0000000000000000000000000000000000000000.png",
        address: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "USDC",
        icon: "https://ethapi.openocean.finance/logos/fantom/0x04068da6c83afcfa0e13ba15a6696662335d5b75.png",
        address: "0x04068da6c83afcfa0e13ba15a6696662335d5b75",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "arbitrum") {
    return [
      {
        id: "uniswap",
        name: "Uniswap",
        symbol: "UNI",
        icon: "https://cloudstorage.openocean.finance/images/1637745250132_641351376587165.png",
        address: "0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "USDC",
        icon: "https://cloudstorage.openocean.finance/images/1637744329482_9981818339876964.png",
        address: "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "terra") {
    return [
      {
        id: "terra-luna",
        name: "Terra luna",
        symbol: "LUNA",
        icon: "https://cloudstorage.openocean.finance/images/1639100963010_2658239135059679.png",
        address: "uluna",
        decimals: 6,
      },
      {
        id: "terrausd",
        name: "uusd",
        symbol: "UST",
        icon: "https://cloudstorage.openocean.finance/images/1639029594362_05697848220423185.png",
        address: "uusd",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "xdai") {
    return [
      {
        id: "xdai",
        name: "xDAI",
        symbol: "XDAI",
        icon: "https://cloudstorage.openocean.finance/images/1641700780963_888840142160457.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://cloudstorage.openocean.finance/images/1638169059809_43825648352164004.png",
        address: "0x4ECaBa5870353805a9F068101A40E0f32ed605C6",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "boba") {
    return [
      {
        id: "weth",
        name: "WETH",
        symbol: "WETH",
        icon: "https://cloudstorage.openocean.finance/images/1640068479467_666268388062502.png",
        address: "0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://cloudstorage.openocean.finance/images/1639128907722_5976524470347457.png",
        address: "0x5de1677344d3cb0d7d465c10b72a8f60699c062d",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "ont") {
    return [
      {
        id: "wing-finance",
        name: "Wing Token",
        symbol: "WING",
        icon: "https://cloudstorage.openocean.finance/images/1634661206221_011924567549566945.png",
        address: "00c59fcd27a562d6397883eab1f2fff56e58ef80",
        decimals: 9,
      },
      {
        id: "ontology",
        name: "ONT-Decimal",
        symbol: "ONTd",
        icon: "https://cloudstorage.openocean.finance/images/1634661267534_05787055010497766.png",
        address: "33ae7eae016193ba0fe238b223623bc78faac158",
        decimals: 9,
      },
    ];
  } else if (selectedChain === "tron") {
    return [
      {
        id: "tron",
        name: "TRX",
        symbol: "TRX",
        icon: "https://ethapi.openocean.finance/logos/tron/T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb.png",
        address: "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb",
        decimals: 6,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://ethapi.openocean.finance/logos/tron/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t.png",
        address: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "heco") {
    return [
      {
        id: "huobi-token",
        name: "Huobi Token",
        symbol: "HT",
        icon: "https://ethapi.openocean.finance/logos/heco/0x0000000000000000000000000000000000000000.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "Heco-Peg USDCHECO Token",
        symbol: "USDC",
        icon: "https://ethapi.openocean.finance/logos/heco/0x9362bbef4b8313a8aa9f0c9808b80577aa26b73b.png",
        address: "0x9362Bbef4B8313A8Aa9f0c9808B80577Aa26B73B",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "okex") {
    return [
      {
        id: "oec-token",
        name: "OKExChain Token",
        symbol: "OKT",
        icon: "https://cloudstorage.openocean.finance/images/1645248813662_00923301689420386.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://ethapi.openocean.finance/logos/okex/0x382bb369d343125bfb2117af9c149795c6c65c50.png",
        address: "0x382bB369d343125BfB2117af9c149795C6C65C50",
        decimals: 18,
      },
    ];
  } else if (selectedChain === "optimism") {
    return [
      {
        id: "ethereum",
        name: "Etherum",
        symbol: "ETH",
        icon: "https://cloudstorage.openocean.finance/images/1642671041381_10284101720073968.png",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "USDC",
        icon: "https://cloudstorage.openocean.finance/images/1638172240797_3452267574610799.png",
        address: "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "moonriver") {
    return [
      {
        id: "moonriver",
        name: "Moonriver",
        symbol: "MOVR",
        icon: "https://cloudstorage.openocean.finance/images/1645695305943_14303353853029155.png",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "USDC",
        icon: "https://cloudstorage.openocean.finance/images/1645696098204_6669947964697305.png",
        address: "0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "aurora") {
    return [
      {
        id: "wrapped-near",
        name: "Near",
        symbol: "NEAR",
        icon: "https://cloudstorage.openocean.finance/images/1649218444944_9275656747870795.png",
        address: "0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d",
        decimals: 24,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "USDC",
        icon: "https://cloudstorage.openocean.finance/images/1645696098204_6669947964697305.png",
        address: "0xB12BFcA5A55806AaF64E99521918A4bf0fC40802",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "harmony") {
    return [
      {
        id: "harmony",
        name: "Harmony",
        symbol: "ONE",
        icon: "https://cloudstorage.openocean.finance/images/1651227331224_44299201118428244.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "1USDC",
        icon: "https://cloudstorage.openocean.finance/images/1649345307461_6323050085681814.png",
        address: "0x985458E523dB3d53125813eD68c274899e9DfAb4",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "harmony") {
    return [
      {
        id: "harmony",
        name: "Harmony",
        symbol: "ONE",
        icon: "https://cloudstorage.openocean.finance/images/1651227331224_44299201118428244.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "1USDC",
        icon: "https://cloudstorage.openocean.finance/images/1649345307461_6323050085681814.png",
        address: "0x985458E523dB3d53125813eD68c274899e9DfAb4",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "cronos") {
    return [
      {
        id: "crypto-com-chain",
        name: "Cronos",
        symbol: "CRO",
        icon: "https://cloudstorage.openocean.finance/images/1649345104693_25875851731877186.jpg",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        id: "tether",
        name: "USDT",
        symbol: "USDT",
        icon: "https://cloudstorage.openocean.finance/images/1650429842604_9848666254566818.png",
        address: "0x66e428c3f67a68878562e79a0234c1f83c208770",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "osmosis") {
    return [
      {
        id: "cosmos",
        name: "Cosmos Hub",
        symbol: "ATOM",
        icon: "https://cloudstorage.openocean.finance/images/1650361794073_7291591364827013.png",
        address: "ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2",
        decimals: 6,
      },
      {
        id: "usd-coin",
        name: "USDC",
        symbol: "USDC",
        icon: "https://cloudstorage.openocean.finance/images/1650429842604_9848666254566818.png",
        address: "ibc/D189335C6E4A68B513C10AB227BF1C1D38C746766278BA3EEB4FB14124F1D858",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "sifchain") {
    return [
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        icon: "https://cloudstorage.openocean.finance/images/1652158605193_9955665521454042.png",
        address: "ceth",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USDC",
        symbol: "USDC",
        icon: "https://cloudstorage.openocean.finance/images/1652158887182_4430143528379695.png",
        address: "cusdc",
        decimals: 6,
      },
    ];
  }
};

export const getDefaultLimitToken = (selectedChain) => {
  if (selectedChain === "eth") {
    return [
      {
        id: "weth",
        name: "Wrapped Ether",
        symbol: "WETH",
        icon: "https://cloudstorage.openocean.finance/images/1638942151100_28998249988659763.png",
        address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://ethapi.openocean.finance/logos/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
        address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "bsc") {
    return [
      {
        id: "wbnb",
        name: "Wrapped BNB",
        symbol: "WBNB",
        icon: "https://ethapi.openocean.finance/logos/bsc/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c.png",
        address: "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
        decimals: 18,
      },
      {
        id: "binance-usd",
        name: "Binance-Peg BUSD Token",
        symbol: "BUSD",
        icon: "https://ethapi.openocean.finance/logos/bsc/0xe9e7cea3dedca5984780bafc599bd69add087d56.png",
        address: "0xe9e7cea3dedca5984780bafc599bd69add087d56",
        decimals: 18,
      },
    ];
  } else if (selectedChain === "solana") {
    return [
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        icon: "https://ethapi.openocean.finance/logos/solana/2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk.png",
        address: "2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk",
        decimals: 18,
      },
      // {
      //   id: 'solana',
      //   name: 'Wrapped SOL',
      //   address: 'So11111111111111111111111111111111111111112',
      //   decimals: 9,
      //   symbol: 'SOL',
      //   icon: 'https://ethapi.openocean.finance/logos/solana/So11111111111111111111111111111111111111112.png',
      // },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://ethapi.openocean.finance/logos/solana/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB.png",
        address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "polygon") {
    return [
      {
        id: "wmatic",
        name: "Wrapped Matic",
        symbol: "WMATIC",
        icon: "https://cloudstorage.openocean.finance/images/1637561049975_1903381661429342.png",
        address: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://cloudstorage.openocean.finance/images/1640831384587_011475796734160326.png",
        address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "avax") {
    return [
      {
        id: "wrapped-avax",
        name: "Wrapped AVAX",
        symbol: "WAVAX",
        icon: "https://ethapi.openocean.finance/logos/avax/0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7.png",
        address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT.e",
        icon: "https://ethapi.openocean.finance/logos/avax/0xc7198437980c041c805a1edcba50c1ce5db95118.png",
        address: "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "fantom") {
    return [
      {
        id: "wrapped-fantom",
        name: "Wrapped FTM",
        symbol: "WFTM",
        icon: "https://ethapi.openocean.finance/logos/fantom/0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83.png",
        address: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "USDC",
        icon: "https://ethapi.openocean.finance/logos/fantom/0x04068da6c83afcfa0e13ba15a6696662335d5b75.png",
        address: "0x04068da6c83afcfa0e13ba15a6696662335d5b75",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "arbitrum") {
    return [
      {
        id: "uniswap",
        name: "Uniswap",
        symbol: "UNI",
        icon: "https://cloudstorage.openocean.finance/images/1637745250132_641351376587165.png",
        address: "0xfa7f8980b0f1e64a2062791cc3b0871572f1f7f0",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "USDC",
        icon: "https://cloudstorage.openocean.finance/images/1637744329482_9981818339876964.png",
        address: "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "terra") {
    return [
      {
        id: "terra-luna",
        name: "Terra luna",
        symbol: "LUNA",
        icon: "https://cloudstorage.openocean.finance/images/1639100963010_2658239135059679.png",
        address: "uluna",
        decimals: 6,
      },
      {
        id: "terrausd",
        name: "uusd",
        symbol: "UST",
        icon: "https://cloudstorage.openocean.finance/images/1639029594362_05697848220423185.png",
        address: "uusd",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "xdai") {
    return [
      {
        id: "xdai",
        name: "xDAI",
        symbol: "XDAI",
        icon: "https://cloudstorage.openocean.finance/images/1641700780963_888840142160457.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://cloudstorage.openocean.finance/images/1638169059809_43825648352164004.png",
        address: "0x4ECaBa5870353805a9F068101A40E0f32ed605C6",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "boba") {
    return [
      {
        id: "weth",
        name: "WETH",
        symbol: "WETH",
        icon: "https://cloudstorage.openocean.finance/images/1640068479467_666268388062502.png",
        address: "0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://cloudstorage.openocean.finance/images/1639128907722_5976524470347457.png",
        address: "0x5de1677344d3cb0d7d465c10b72a8f60699c062d",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "ont") {
    return [
      {
        id: "wing-finance",
        name: "Wing Token",
        symbol: "WING",
        icon: "https://cloudstorage.openocean.finance/images/1634661206221_011924567549566945.png",
        address: "00c59fcd27a562d6397883eab1f2fff56e58ef80",
        decimals: 9,
      },
      {
        id: "ontology",
        name: "ONT-Decimal",
        symbol: "ONTd",
        icon: "https://cloudstorage.openocean.finance/images/1634661267534_05787055010497766.png",
        address: "33ae7eae016193ba0fe238b223623bc78faac158",
        decimals: 9,
      },
    ];
  } else if (selectedChain === "tron") {
    return [
      {
        id: "tron",
        name: "TRX",
        symbol: "TRX",
        icon: "https://ethapi.openocean.finance/logos/tron/T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb.png",
        address: "T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb",
        decimals: 6,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://ethapi.openocean.finance/logos/tron/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t.png",
        address: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "heco") {
    return [
      {
        id: "huobi-token",
        name: "Huobi Token",
        symbol: "HT",
        icon: "https://ethapi.openocean.finance/logos/heco/0x0000000000000000000000000000000000000000.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "Heco-Peg USDCHECO Token",
        symbol: "USDC",
        icon: "https://ethapi.openocean.finance/logos/heco/0x9362bbef4b8313a8aa9f0c9808b80577aa26b73b.png",
        address: "0x9362Bbef4B8313A8Aa9f0c9808B80577Aa26B73B",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "okex") {
    return [
      {
        id: "oec-token",
        name: "OKExChain Token",
        symbol: "OKT",
        icon: "https://cloudstorage.openocean.finance/images/1645248813662_00923301689420386.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        id: "tether",
        name: "Tether USD",
        symbol: "USDT",
        icon: "https://ethapi.openocean.finance/logos/okex/0x382bb369d343125bfb2117af9c149795c6c65c50.png",
        address: "0x382bB369d343125BfB2117af9c149795C6C65C50",
        decimals: 18,
      },
    ];
  } else if (selectedChain === "optimism") {
    return [
      {
        id: "ethereum",
        name: "Etherum",
        symbol: "ETH",
        icon: "https://cloudstorage.openocean.finance/images/1642671041381_10284101720073968.png",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "USDC",
        icon: "https://cloudstorage.openocean.finance/images/1638172240797_3452267574610799.png",
        address: "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "moonriver") {
    return [
      {
        id: "moonriver",
        name: "Moonriver",
        symbol: "MOVR",
        icon: "https://cloudstorage.openocean.finance/images/1645695305943_14303353853029155.png",
        address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "USDC",
        icon: "https://cloudstorage.openocean.finance/images/1645696098204_6669947964697305.png",
        address: "0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "aurora") {
    return [
      {
        id: "wrapped-near",
        name: "Near",
        symbol: "NEAR",
        icon: "https://cloudstorage.openocean.finance/images/1649218444944_9275656747870795.png",
        address: "0xC42C30aC6Cc15faC9bD938618BcaA1a1FaE8501d",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "USDC",
        icon: "https://cloudstorage.openocean.finance/images/1645696098204_6669947964697305.png",
        address: "0xB12BFcA5A55806AaF64E99521918A4bf0fC40802",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "harmony") {
    return [
      {
        id: "harmony",
        name: "Harmony",
        symbol: "ONE",
        icon: "https://cloudstorage.openocean.finance/images/1651227331224_44299201118428244.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "1USDC",
        icon: "https://cloudstorage.openocean.finance/images/1649345307461_6323050085681814.png",
        address: "0x985458E523dB3d53125813eD68c274899e9DfAb4",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "harmony") {
    return [
      {
        id: "harmony",
        name: "Harmony",
        symbol: "ONE",
        icon: "https://cloudstorage.openocean.finance/images/1651227331224_44299201118428244.png",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USD Coin",
        symbol: "1USDC",
        icon: "https://cloudstorage.openocean.finance/images/1649345307461_6323050085681814.png",
        address: "0x985458E523dB3d53125813eD68c274899e9DfAb4",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "cronos") {
    return [
      {
        id: "crypto-com-chain",
        name: "Cronos",
        symbol: "CRO",
        icon: "https://cloudstorage.openocean.finance/images/1649345104693_25875851731877186.jpg",
        address: "0x0000000000000000000000000000000000000000",
        decimals: 18,
      },
      {
        id: "tether",
        name: "USDT",
        symbol: "USDT",
        icon: "https://cloudstorage.openocean.finance/images/1650429842604_9848666254566818.png",
        address: "0x66e428c3f67a68878562e79a0234c1f83c208770",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "osmosis") {
    return [
      {
        id: "cosmos",
        name: "Cosmos Hub",
        symbol: "ATOM",
        icon: "https://cloudstorage.openocean.finance/images/1650361794073_7291591364827013.png",
        address: "ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2",
        decimals: 6,
      },
      {
        id: "usd-coin",
        name: "USDC",
        symbol: "USDC",
        icon: "https://cloudstorage.openocean.finance/images/1650429842604_9848666254566818.png",
        address: "ibc/D189335C6E4A68B513C10AB227BF1C1D38C746766278BA3EEB4FB14124F1D858",
        decimals: 6,
      },
    ];
  } else if (selectedChain === "sifchain") {
    return [
      {
        id: "ethereum",
        name: "Ethereum",
        symbol: "ETH",
        icon: "https://cloudstorage.openocean.finance/images/1652158605193_9955665521454042.png",
        address: "ceth",
        decimals: 18,
      },
      {
        id: "usd-coin",
        name: "USDC",
        symbol: "USDC",
        icon: "https://cloudstorage.openocean.finance/images/1652158887182_4430143528379695.png",
        address: "cusdc",
        decimals: 6,
      },
    ];
  }
};

export const isNativeToken = (selectedChain, address) => {
  if (selectedChain === "eth" || selectedChain === "ropsten") {
    return address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  } else if (selectedChain === "bsc" || selectedChain === "bsctest") {
    return address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  } else if (selectedChain === "okex") {
    return address === "0x0000000000000000000000000000000000000000";
  } else if (selectedChain === "polygon") {
    return address === "0x0000000000000000000000000000000000001010";
  } else if (selectedChain === "fantom") {
    return address === "0x0000000000000000000000000000000000000000";
  } else if (selectedChain === "heco") {
    return address === "0x0000000000000000000000000000000000000000";
  } else if (selectedChain === "avax") {
    return address === "0x0000000000000000000000000000000000000000";
  } else if (selectedChain === "arbitrum") {
    return address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  } else if (selectedChain === "xdai") {
    return address === "0x0000000000000000000000000000000000000000";
  } else if (selectedChain === "optimism") {
    return address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  } else if (selectedChain === "boba") {
    return address === "0x0000000000000000000000000000000000000000";
  } else if (selectedChain === "terra") {
    // return address === "uusd" || address === "uusd";
    return true;
  } else if (selectedChain === "moonriver") {
    return address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  } else if (selectedChain === "aurora") {
    return address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
  } else if (selectedChain === "cronos") {
    return address === "0x0000000000000000000000000000000000000000";
  } else if (selectedChain === "cosmos") {
    return true;
  } else if (selectedChain === "harmony") {
    return address === "0x0000000000000000000000000000000000000000";
  }
};

export const isV2 = (selectedChain) => {
  return (
    [
      "eth",
      "ropsten",
      "bsc",
      "bsctest",
      "avax",
      "fantom",
      "polygon",
      "xdai",
      "optimism",
      "arbitrum",
      "boba",
      "heco",
      "okex",
      "moonriver",
      "aurora",
      "cronos",
      "harmony",
    ].indexOf(selectedChain) >= 0
  );
};

export const isSideChain = (selectedChain) => {
  return (
    [
      "eth",
      "ropsten",
      "bsc",
      "bsctest",
      "polygon",
      "xdai",
      "heco",
      "avax",
      "okex",
      "fantom",
      "optimism",
      "arbitrum",
      "boba",
      "moonriver",
      "aurora",
      "cronos",
      "harmony",
    ].indexOf(selectedChain) >= 0
  );
};

export const isCustomGas = (selectedChain) => {
  return (
    [
      "eth",
      "ropsten",
      "bsc",
      "bsctest",
      "polygon",
      "xdai",
      "heco",
      "avax",
      "okex",
      "fantom",
      "optimism",
      "xdai",
      "arbitrum",
      "boba",
      "moonriver",
      "aurora",
      "cronos",
      "harmony",
    ].indexOf(selectedChain) >= 0
  );
};

export const isCustomToken = (selectedChain) => {
  return (
    [
      // "solana",
      // "tron",
      "eth",
      "ropsten",
      "bsc",
      "bsctest",
      "avax",
      "fantom",
      "polygon",
      "okex",
      "heco",
      "xdai",
      "optimism",
      "arbitrum",
      "boba",
      "moonriver",
      "aurora",
      "cronos",
      "harmony",
    ].indexOf(selectedChain) >= 0
  );
};

export const isLimitOrder = (selectedChain) => {
  return (
    [
      "bsc",
      "eth",
      "polygon",
      "avax",
      "fantom"
    ].indexOf(selectedChain) >= 0
  );
};

export const addEthereumChainParams = {
  ropsten: [
    {
      chainId: `0x3`, // 3
      chainName: "Ropsten Test Network",
      nativeCurrency: {
        name: "Ether",
        symbol: "eth",
        decimals: 18,
      },
      rpcUrls: ["https://bsc-dataseed1.binance.org/"],
      blockExplorerUrls: ["https://bscscan.com/"],
    },
  ],
  bsc: [
    {
      chainId: `0x38`, // 56
      chainName: "BSC Mainnet",
      nativeCurrency: {
        name: "BNB",
        symbol: "bnb",
        decimals: 18,
      },
      rpcUrls: ["https://bsc-dataseed1.binance.org/"],
      blockExplorerUrls: ["https://bscscan.com/"],
    },
  ],
  bsctest: [
    {
      chainId: `0x61`, // 97
      chainName: "BSC Test Network",
      nativeCurrency: {
        name: "BNB",
        symbol: "bnb",
        decimals: 18,
      },
      rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
      blockExplorerUrls: ["https://testnet.bscscan.com/"],
    },
  ],
  ok: [
    {
      chainId: `0x42`, // 66
      chainName: "OKC Mainnet",
      nativeCurrency: {
        name: "OKT",
        symbol: "okt",
        decimals: 18,
      },
      rpcUrls: ["https://exchainrpc.okex.org"],
      blockExplorerUrls: ["https://www.oklink.com/en/okc/"],
    },
  ],
  polygon: [
    {
      chainId: `0x89`, // 137
      chainName: "Matic Mainnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "matic",
        decimals: 18,
      },
      rpcUrls: ["https://rpc-mainnet.maticvigil.com"],
      blockExplorerUrls: ["https://polygonscan.com"],
    },
  ],
  xdai: [
    {
      chainId: `0x64`, // 100
      chainName: "Gnosis Mainnet",
      nativeCurrency: {
        name: "xDai",
        symbol: "xdai",
        decimals: 18,
      },
      rpcUrls: ["https://gnosischain-rpc.gateway.pokt.network"],
      blockExplorerUrls: ["https://blockscout.com/xdai/mainnet"],
    },
  ],
  fantom: [
    {
      chainId: `0xfa`, // 250
      chainName: "Fantom Mainnet",
      nativeCurrency: {
        name: "FTM",
        symbol: "ftm",
        decimals: 18,
      },
      rpcUrls: ["https://rpcapi.fantom.network"],
      blockExplorerUrls: ["https://ftmscan.com/"],
    },
  ],
  heco: [
    {
      chainId: `0x80`, // 128
      chainName: "Heco Mainnet",
      nativeCurrency: {
        name: "HT",
        symbol: "ht",
        decimals: 18,
      },
      rpcUrls: ["https://http-mainnet.hecochain.com"],
      blockExplorerUrls: ["https://hecoinfo.com"],
    },
  ],
  moonriver: [
    {
      chainId: `0x505`, // 1285
      chainName: "Moonriver Mainnet",
      nativeCurrency: {
        name: "MOVR",
        symbol: "movr",
        decimals: 18,
      },
      rpcUrls: ["https://rpc.moonriver.moonbeam.network"],
      blockExplorerUrls: ["https://moonriver.moonscan.io"],
    },
  ],
  aurora: [
    {
      chainId: `0x4e454152`, // 1313161554
      chainName: "Aurora Mainnet",
      nativeCurrency: {
        name: "ETH",
        symbol: "eth",
        decimals: 18,
      },
      rpcUrls: ["https://mainnet.aurora.dev"],
      blockExplorerUrls: ["https://aurorascan.dev"],
    },
  ],
  avax: [
    {
      chainId: `0xa86a`, // 43114
      chainName: "Avalanche Mainnet C-Chain",
      nativeCurrency: {
        name: "AVAX",
        symbol: "avax",
        decimals: 18,
      },
      rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
      blockExplorerUrls: ["https://cchain.explorer.avax.network/"],
    },
  ],
  okex: [
    {
      chainId: `0x42`, // 66
      chainName: "OKC Mainnet",
      nativeCurrency: {
        name: "OKT",
        symbol: "okt",
        decimals: 18,
      },
      rpcUrls: ["https://exchainrpc.okex.org"],
      blockExplorerUrls: ["https://www.oklink.com/en/okc"],
    },
  ],
  cronos: [
    {
      chainId: `0x19`, // 25
      chainName: "Cronos Mainnet",
      nativeCurrency: {
        name: "CRO",
        symbol: "cro",
        decimals: 18,
      },
      rpcUrls: ["https://evm.cronos.org"],
      blockExplorerUrls: ["https://cronos.org/explorer"],
    },
  ],
  harmony: [
    {
      chainId: `0x63564c40`, // 1666600000
      chainName: "Harmony Mainnet",
      nativeCurrency: {
        name: "ONE",
        symbol: "one",
        decimals: 18,
      },
      rpcUrls: ["https://api.harmony.one"],
      blockExplorerUrls: ["https://explorer.harmony.one/"],
    },
  ],
  arbitrum: [
    {
      chainId: `0xa4b1`, // 42161
      chainName: "Arbitrum One",
      nativeCurrency: {
        name: "ETH",
        symbol: "eth",
        decimals: 18,
      },
      rpcUrls: ["https://arb1.arbitrum.io/rpc"],
      blockExplorerUrls: ["https://arbiscan.io"],
    },
  ],
  optimism: [
    {
      chainId: `0xa`, // 10
      chainName: "Optimism",
      nativeCurrency: {
        name: "OETH",
        symbol: "oeth",
        decimals: 18,
      },
      rpcUrls: ["https://mainnet.optimism.io"],
      blockExplorerUrls: ["https://optimistic.etherscan.io"],
    },
  ],
  boba: [
    {
      chainId: `0x120`, // 288
      chainName: "Boba Mainnet",
      nativeCurrency: {
        name: "ETH",
        symbol: "eth",
        decimals: 18,
      },
      rpcUrls: ["https://mainnet.boba.network"],
      blockExplorerUrls: ["https://blockexplorer.boba.network"],
    },
  ],
};

export default getChains;
