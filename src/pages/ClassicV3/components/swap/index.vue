<template>
  <div>
    <div class="swap">
      <Field
        :token="tokenSwapPrev"
        :usd-value="tokenSwapPrevUsdValue"
        @change="changeToken"
      />
      <div class="g-clickable switch" @click="changeTokenSwap">
        <i class="iconfont iconjiaohuan1"></i>
      </div>
      <Field
        :token="tokenSwapNext"
        :usd-value="tokenSwapNextUsdValue"
        :from="false"
        @change="changeToken"
      />
      <!-- <Label
        :in-amount="inAmount"
        :out-amount="outAmount"
        :quote-status="quoteStatus"
        :rate="rate"
        :inverse-rate="inverseRate"
        :token-prev="tokenSwapPrev"
        :token-next="tokenSwapNext"
      /> -->
      <Button
        :in-amount="inAmount"
        :out-amount="inAmount"
        :token="tokenSwapPrev"
        :loading="loading"
        :price-impact="priceImpact"
        :exchange="exchange"
        :chain="walletType"
        type="swap"
        @confirm="swapQuote"
      />
      <div class="info-group">
        <Info
          label="Minimum Receive"
          :usd="minReceiveUsd"
          :value="minReceive"
        />
        <!-- <Info
          label="Est. Gas Fee"
          :usd="estimatedGasValueUsd"
          :value="estimatedGasValue"
        /> -->
        <div class="magic-edit">
          <Info label="Price Impact" :value="priceImpact + '%'" color="red" help="Price Impact" explaination="The difference between market price and est. price due to trade size"/>
          <div
            class="t-label right"
            :class="{ warning: +priceImpact < -10 }"
          >
            <i class="iconfont iconjinggao warning__icon red" />
            <!-- <div class="warning-info">
              The difference between market price and est. price due to trade
              size
            </div> -->
          </div>
        </div>
        <Info
          label="You Save"
          :value="youSaveUsd"
          help="You Save"
          color="green"
          v-if="youSave != '--'"
        />
      </div>
      <div class="copyright">
        <span>Powered by</span>
        <a href="https://app.openocean.finance" target="_blank">
          <svg viewBox="0 0 121 24" version="1.1">
              <defs>
                  <polygon id="path-d3s5vpedmc-1" points="1.61676228e-15 2.77555756e-17 84.87816 2.77555756e-17 84.87816 14.7924 1.61676228e-15 14.7924"></polygon>
                  <polygon id="path-d3s5vpedmc-3" points="0 0 26.55315 0 26.55315 23.99997 0 23.99997"></polygon>
              </defs>
              <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="icon-logo-classic-dark.da1bee87" transform="translate(0.000000, 0.000000)">
                      <g transform="translate(35.747340, 6.207630)">
                          <mask id="mask-d3s5vpedmc-2" fill="var(--logo-color)">
                              <use xlink:href="#path-d3s5vpedmc-1"></use>
                          </mask>
                          <g id="path-3"></g>
                          <path d="M79.5159,11.22 L79.5159,5.5071 C79.7139,5.2176 79.9752,4.9878 80.3004,4.8177 C80.6253,4.6476 80.9757,4.5627 81.3516,4.5627 C81.768,4.5627 82.0701,4.6692 82.2582,4.8825 C82.446,5.0958 82.5399,5.4408 82.5399,5.9184 L82.5399,11.22 L84.8784,11.22 L84.8784,5.7888 C84.8784,4.875 84.6471,4.1676 84.1851,3.6675 C83.7228,3.1671 83.0655,2.9172 82.2123,2.9172 C81.0393,2.9172 80.0922,3.3387 79.3713,4.1817 L79.1199,3.0468 L77.1699,3.0468 L77.1699,11.22 L79.5159,11.22 Z M71.1066,9.8184 C70.7355,9.8184 70.4487,9.7308 70.2459,9.5556 C70.0425,9.3804 69.9411,9.1254 69.9411,8.79 C69.9411,8.3838 70.125,8.0664 70.4934,7.8381 C70.8612,7.6095 71.3781,7.4952 72.0435,7.4952 L72.8433,7.4952 L72.8433,9.0033 C72.6348,9.252 72.3771,9.4503 72.0702,9.5976 C71.7627,9.7446 71.4417,9.8184 71.1066,9.8184 L71.1066,9.8184 Z M70.5048,11.3418 C70.9821,11.3418 71.4303,11.2491 71.8491,11.0637 C72.2682,10.8783 72.6453,10.608 72.9804,10.2525 L73.2471,11.22 L75.1818,11.22 L75.1818,6.2154 C75.1818,5.1339 74.8743,4.3086 74.2599,3.7398 C73.6455,3.171 72.7617,2.8869 71.6094,2.8869 C71.0913,2.8869 70.5351,2.9463 69.9411,3.0657 C69.3471,3.1851 68.7807,3.3537 68.2425,3.5724 L68.7375,5.1492 C69.1131,4.9866 69.5346,4.8531 70.002,4.7493 C70.4691,4.6449 70.8804,4.593 71.2359,4.593 C72.2769,4.593 72.8127,5.0652 72.8433,6.0099 L72.8433,6.2154 L71.8455,6.2154 C70.5555,6.2154 69.5511,6.4539 68.8329,6.9315 C68.1141,7.4088 67.755,8.0742 67.755,8.9271 C67.755,9.6636 68.0025,10.2501 68.4975,10.6869 C68.9928,11.1234 69.6615,11.3418 70.5048,11.3418 L70.5048,11.3418 Z M64.7691,6.2154 L61.4631,6.2154 C61.5546,5.6415 61.7487,5.2137 62.046,4.932 C62.343,4.6503 62.7504,4.5093 63.2685,4.5093 C64.2027,4.5093 64.7028,5.0778 64.7691,6.2154 L64.7691,6.2154 Z M63.2838,11.3725181 C64.3347,11.3772 65.4798,11.0928 66.7191,10.5192 L66.1554,9.0642 C65.6577,9.2724 65.2032,9.4236 64.7919,9.5175 C64.3806,9.6114 63.9717,9.6585 63.5655,9.6585 C62.2554,9.6585 61.5393,8.9628 61.4175,7.5714 L66.9171,7.5714 L66.9171,7.0383 C66.9171,4.2705 65.6958,2.8869 63.2532,2.8869 C61.953,2.8869 60.9426,3.2586 60.2217,4.0026 C59.5002,4.7466 59.1399,5.7837 59.1399,7.1142 C59.1399,8.4498 59.508,9.4932 60.2445,10.245 C60.9807,10.9965 61.9938,11.3725181 63.2838,11.3725181 L63.2838,11.3725181 Z M55.8798,11.3418 C56.2758,11.3418 56.6922,11.2962 57.129,11.2047 C57.5655,11.1135 57.972,10.9839 58.3476,10.8162 L57.9744,9.2244 C57.4158,9.4731 56.8446,9.5976 56.2605,9.5976 C55.5495,9.5976 55.005,9.3816 54.6267,8.9502 C54.2481,8.5182 54.0594,7.9065 54.0594,7.1142 C54.0594,6.3168 54.2433,5.7 54.6114,5.2635 C54.9795,4.8264 55.5012,4.6083 56.1768,4.6083 C56.6949,4.6083 57.2304,4.7529 57.7842,5.0424 L58.302,3.4962 C57.5556,3.1101 56.7657,2.9172 55.9332,2.9172 C54.5871,2.9172 53.5464,3.2841 52.8099,4.0179 C52.0734,4.7514 51.7056,5.7837 51.7056,7.1142 C51.7056,8.4801 52.0635,9.5262 52.7796,10.2525 C53.4957,10.9785 54.5289,11.3418 55.8798,11.3418 L55.8798,11.3418 Z M45.3375,9.4908 C44.403,9.4908 43.6962,9.1635 43.2162,8.5083 C42.7362,7.8531 42.4965,6.8958 42.4965,5.6367 C42.4965,4.3974 42.7338,3.4605 43.2087,2.826 C43.6833,2.1909 44.3931,1.8738 45.3375,1.8738 C46.272,1.8738 46.9791,2.1936 47.4591,2.8335 C47.9388,3.4734 48.1788,4.4076 48.1788,5.6367 C48.1788,6.8958 47.9388,7.8531 47.4591,8.5083 C46.9791,9.1635 46.272,9.4908 45.3375,9.4908 L45.3375,9.4908 Z M45.3375,11.3571 C47.064,11.3571 48.3792,10.8669 49.2834,9.8871 C50.187,8.9067 50.6391,7.4898 50.6391,5.6367 C50.6391,3.8238 50.1846,2.4309 49.2756,1.4586 C48.3666,0.486 47.0538,0 45.3375,0 C43.6212,0 42.3084,0.4875 41.3994,1.4625 C40.4904,2.4375 40.0359,3.8286 40.0359,5.6367 C40.0359,7.4952 40.4853,8.9133 41.3844,9.8907 C42.2832,10.8681 43.6008,11.3571 45.3375,11.3571 L45.3375,11.3571 Z M33.1578,11.22 L33.1578,5.5071 C33.3558,5.2176 33.6171,4.9878 33.9423,4.8177 C34.2672,4.6476 34.6176,4.5627 34.9935,4.5627 C35.4096,4.5627 35.7117,4.6692 35.8998,4.8825 C36.0876,5.0958 36.1818,5.4408 36.1818,5.9184 L36.1818,11.22 L38.5203,11.22 L38.5203,5.7888 C38.5203,4.875 38.289,4.1676 37.827,3.6675 C37.3647,3.1671 36.7074,2.9172 35.8542,2.9172 C34.6812,2.9172 33.7341,3.3387 33.0129,4.1817 L32.7615,3.0468 L30.8115,3.0468 L30.8115,11.22 L33.1578,11.22 Z M27.0792,6.2154 L23.7732,6.2154 C23.8647,5.6415 24.0591,5.2137 24.3561,4.932 C24.6531,4.6503 25.0605,4.5093 25.5786,4.5093 C26.5128,4.5093 27.0129,5.0778 27.0792,6.2154 L27.0792,6.2154 Z M25.5939,11.3725181 C26.6451,11.3772 27.7899,11.0928 29.0292,10.5192 L28.4655,9.0642 C27.9678,9.2724 27.5133,9.4236 27.102,9.5175 C26.6907,9.6114 26.2818,9.6585 25.8756,9.6585 C24.5655,9.6585 23.8494,8.9628 23.7276,7.5714 L29.2272,7.5714 L29.2272,7.0383 C29.2272,4.2705 28.0059,2.8869 25.5633,2.8869 C24.2631,2.8869 23.2527,3.2586 22.5318,4.0026 C21.8103,4.7466 21.45,5.7837 21.45,7.1142 C21.45,8.4498 21.8181,9.4932 22.5546,10.245 C23.2908,10.9965 24.3039,11.3725181 25.5939,11.3725181 L25.5939,11.3725181 Z M15.8973,9.75 C15.6786,9.75 15.4935,9.7395 15.3411,9.7194 C15.1887,9.699 14.9625,9.6531 14.6631,9.5823 L14.6631,5.8728 C14.7951,5.4663 15.0096,5.1513 15.3069,4.9281 C15.6039,4.7046 15.9603,4.59295294 16.377,4.59295294 C17.5197,4.5879 18.0909,5.4081 18.0909,7.0533 C18.0909,7.9371 17.9016,8.6073 17.5233,9.0642 C17.145,9.5214 16.6029,9.75 15.8973,9.75 L15.8973,9.75 Z M14.6631,14.7924 L14.6631,11.1744 C15.1506,11.286 15.6078,11.3418 16.0344,11.3418 C16.938,11.3418 17.7201,11.1678 18.3804,10.8201 C19.0404,10.4721 19.5507,9.9708 19.9113,9.3156 C20.2719,8.6607 20.4522,7.881 20.4522,6.9771 C20.4522,5.6874 20.1372,4.692 19.5078,3.9912 C18.8778,3.2904 17.997,2.94 16.8645,2.94 C16.3719,2.94 15.9363,3.0252 15.5583,3.1953 C15.1797,3.3651 14.8179,3.6384 14.4726,4.014 L14.1147,3.0468 L12.3246,3.0468 L12.3246,14.7924 L14.6631,14.7924 Z M5.3016,9.4908 C4.3671,9.4908 3.66,9.1635 3.1803,8.5083 C2.7003,7.8531 2.4603,6.8958 2.4603,5.6367 C2.4603,4.3974 2.6976,3.4605 3.1725,2.826 C3.6471,2.1909 4.3572,1.8738 5.3016,1.8738 C6.2358,1.8738 6.9432,2.1936 7.4229,2.8335 C7.9029,3.4734 8.1429,4.4076 8.1429,5.6367 C8.1429,6.8958 7.9029,7.8531 7.4229,8.5083 C6.9432,9.1635 6.2358,9.4908 5.3016,9.4908 L5.3016,9.4908 Z M5.3016,11.3571 C7.0281,11.3571 8.3433,10.8669 9.2472,9.8871 C10.1511,8.9067 10.6032,7.4898 10.6032,5.6367 C10.6032,3.8238 10.1484,2.4309 9.2397,1.4586 C8.3307,0.486 7.0179,0 5.3016,0 C3.585,0 2.2722,0.4875 1.3635,1.4625 C0.4545,2.4375 0,3.8286 0,5.6367 C0,7.4952 0.4494,8.9133 1.3482,9.8907 C2.2473,10.8681 3.5649,11.3571 5.3016,11.3571 L5.3016,11.3571 Z" id="Fill-3" fill="var(--logo-color)" fill-rule="nonzero" mask="url(#mask-d3s5vpedmc-2)"></path>
                      </g>
                      <g>
                          <mask id="mask-d3s5vpedmc-4" fill="var(--logo-color)">
                              <use xlink:href="#path-d3s5vpedmc-3"></use>
                          </mask>
                          <g id="path-1"></g>
                          <path d="M20.98005,12.46827 C20.97855,12.50007 20.97795,12.53247 20.97615,12.56397 C20.95065,12.65727 20.87055,12.72627 20.77035,12.72957 C20.73555,12.72237 20.70045,12.71457 20.66535,12.70677 C20.42655,12.65427 20.18325,12.59727 19.92945,12.53007 C16.34325,11.58267 14.26755,12.13917 13.56345,12.40887 C13.55775,12.41127 13.55145,12.41277 13.54605,12.41547 C13.41405,12.47367 13.31505,12.59247 13.28595,12.73707 L13.28595,12.91707 L13.28595,14.77167 L13.28595,14.95137 C13.32735,15.15687 13.50915,15.31167 13.72665,15.31167 C13.75665,15.31167 13.78605,15.30837 13.81395,15.30267 C13.81965,15.30117 13.82445,15.29967 13.83015,15.29847 C14.89005,15.02097 17.35485,14.56887 19.92945,15.46167 L20.02755,15.49497 L20.04465,15.50067 C20.04915,15.50217 20.05425,15.50367 20.05905,15.50517 C20.13465,15.54147 20.18775,15.61737 20.18775,15.70677 C20.18775,15.72117 20.18235,15.73347 20.17995,15.74697 C20.16225,15.78507 20.14395,15.82257 20.12565,15.86037 C18.68025,18.89787 15.58785,20.99997 11.99985,20.99997 C7.02945,20.99997 2.99985,16.97067 2.99985,11.99997 C2.99985,7.02927 7.02945,2.99997 11.99985,2.99997 C15.51375,2.99997 18.55395,5.01567 20.03625,7.95237 C20.05335,7.97547 20.06565,8.00097 20.07315,8.02977 C20.07765,8.04807 20.08425,8.06547 20.08425,8.08557 C20.08425,8.20977 19.98375,8.31057 19.85925,8.31057 C19.83855,8.31057 19.81995,8.30367 19.80075,8.29857 C19.79025,8.29557 19.77885,8.29527 19.76865,8.29047 C16.37355,7.42557 14.35965,7.91697 13.61685,8.18817 C13.58115,8.20137 13.55085,8.21307 13.52145,8.22507 C13.40205,8.28687 13.31295,8.39817 13.28595,8.53347 L13.28595,8.71317 L13.28595,10.58307 L13.28595,10.76277 C13.32735,10.96827 13.50915,11.12307 13.72665,11.12307 C13.73325,11.12307 13.73925,11.12127 13.74585,11.12097 C13.80165,11.10567 13.86225,11.08977 13.92735,11.07387 C15.03495,10.79577 17.42985,10.39497 19.92945,11.26167 L20.04465,11.30067 C20.31195,11.38917 20.57715,11.46087 20.84025,11.52237 C20.84835,11.52477 20.85705,11.52507 20.86485,11.52837 C20.93325,11.55837 20.98005,11.62257 20.99265,11.69847 C20.99355,11.71977 20.99385,11.74107 20.99445,11.76237 C20.99655,11.84157 20.99985,11.92047 20.99985,11.99997 C20.99985,12.15777 20.98815,12.31257 20.98005,12.46827 M26.10255,8.53437 C26.07255,8.53437 26.04285,8.53737 26.01405,8.54307 C25.98555,8.55207 25.95705,8.56107 25.92585,8.57037 C25.46685,8.70507 24.74985,8.84727 23.76825,8.85777 C23.75625,8.85807 23.74425,8.85807 23.73195,8.85837 C23.65005,8.85147 23.58165,8.80347 23.54775,8.73327 C23.54085,8.71887 23.53785,8.70327 23.53455,8.68737 C22.02405,3.42057 17.00715,-0.36423 11.17095,0.02787 C5.25015,0.42567 0.45285,5.20197 0.03135,11.12097 C-0.46905,18.14577 5.08185,23.999979 11.99985,23.999979 C17.17155,23.999979 21.57675,20.72787 23.26365,16.14177 C23.26815,16.12767 23.27235,16.11417 23.27895,16.10127 C23.31375,16.03497 23.37945,15.98907 23.45835,15.98247 C23.46855,15.98217 23.47875,15.98157 23.48925,15.98127 C24.69795,15.94587 25.67055,15.72327 26.17425,15.58047 C26.21655,15.56847 26.25405,15.55737 26.28975,15.54687 C26.43825,15.47967 26.54295,15.33447 26.55315,15.16317 L26.55315,15.10827 L26.55315,13.26747 L26.55315,13.11057 C26.51595,12.89667 26.33055,12.73347 26.10585,12.73347 C26.07585,12.73347 26.04705,12.73707 26.01885,12.74217 C25.99365,12.74997 25.96485,12.75837 25.93755,12.76647 C25.55205,12.88107 24.98205,13.00197 24.22035,13.04427 C24.20535,13.04517 24.18975,13.04577 24.17475,13.04637 C24.06135,13.03707 23.97255,12.94647 23.96895,12.83157 C23.96925,12.82497 23.96985,12.81837 23.97015,12.81177 C23.98785,12.54327 23.99985,12.27327 23.99985,11.999979 C23.99985,11.99187 23.99955,11.98377 23.99955,11.97537 C23.99955,11.96247 23.99925,11.95017 23.99925,11.93727 C24.00705,11.84307 24.07185,11.76777 24.16035,11.74257 C24.18825,11.74017 24.21645,11.73777 24.24405,11.73537 C25.09005,11.65377 25.76535,11.49567 26.16135,11.38407 C26.21325,11.36937 26.25945,11.35587 26.30145,11.34327 C26.44065,11.27577 26.53845,11.13957 26.55315,10.97847 L26.55315,10.89717 L26.55315,8.99637 L26.55315,8.97507 C26.54775,8.73087 26.34855,8.53437 26.10255,8.53437" id="Fill-1" fill="var(--logo-color)" fill-rule="nonzero" mask="url(#mask-d3s5vpedmc-4)"></path>
                      </g>
                  </g>
              </g>
          </svg>
        </a>
      </div>
    </div>
    <NouDialog close-on-click-modal :visible.sync="isConfirmShow">
      <Confirm
        :trade="tradeData"
        @close="isConfirmShow = false"
        @confirm="confirmSwap"
        @refresh="swapQuote"
        v-if="isConfirmShow"
      />
    </NouDialog>
  </div>
</template>

<script>
import NouDialog from "@/components/common/NouDialog";
import Field from "./components/field";
import Button from "./components/button";
import Label from "./components/label";
import Info from "./components/info";
import Confirm from "./components/confirm";
import qs from "qs";
import * as BN from "bignumber.js";
import showToast from "@/components/toast";
import { contract as state } from "@/contract";
import { toFixed, formatPrice } from "@/utils/format";
import { isNativeToken, isCustomGas, getNativeToken } from "@/utils/getChains";
import { decimals2Amount } from "@/utils/number";
import { getBalance, getAllowance } from "@/init";
import { sendTransaction } from "@/init";
import { utils } from "ontology-ts-sdk";
import { client } from "@ont-dev/ontology-dapi";
import showOntoScan from "../connect/showOntoScan";
import showNotification from "@/components/notification";

export default {
  components: {
    NouDialog,
    Field,
    Button,
    Label,
    Info,
    Confirm,
  },
  props: {
    tabCode: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      minOutAmount: "",
      isConfirmShow: false,
      quoteStatus: 0,
      retry: 3,
      timeout: null,
      approveType: "",
      loading: false,
      dexesList: [],
      exchange: {},
      estimatedGas: null,
      tradeData: {},
      swapRes: {},
    };
  },
  watch: {
    "tokenSwapPrev.value"(newVal, oldVal) {
      state.routePath = {
        routes: [],
      };
      this.quote();
    },
    "tokenSwapPrev.symbol"(newVal, oldVal) {
      state.routePath = {
        routes: [],
      };
      this.getBalanceOf();
      this.quote();
    },
    "tokenSwapNext.symbol"(newVal, oldVal) {
      state.routePath = {
        routes: [],
      };
      this.getBalanceOf();
      this.quote();
    },
    default_account(newVal, oldVal) {
      this.getBalanceOf();
    },
    tabCode(newVal, oldVal) {
      if (newVal === "01") {
        this.getBalanceOf();
        this.quote();
      }
    },
  },
  computed: {
    inAmount() {
      return this.tokenSwapPrev.value;
    },
    outAmount() {
      return this.tokenSwapNext.value;
    },
    rate() {
      if (!this.outAmount || !this.inAmount || !this.quoteStatus) return "--";
      return `${toFixed(this.outAmount / this.inAmount)} ${
        this.tokenSwapNext.symbol
      }`;
    },
    inverseRate() {
      if (!this.outAmount || !this.inAmount || !this.quoteStatus) return "--";
      return `${toFixed(this.inAmount / this.outAmount)} ${
        this.tokenSwapPrev.symbol
      }`;
    },
    estimatedGasValue() {
      if (!this.outAmount || !this.inAmount || !this.quoteStatus) return "--";
      if (this.estimatedGas && this.gasPrice) {
        const { symbol, decimals } = getNativeToken(this.walletType);
        if (symbol && decimals) {
          const amount = decimals2Amount(
            this.estimatedGas * this.gasPrice,
            decimals
          );
          return `${toFixed(amount, 4)} ${symbol}`;
        }
      }
    },
    estimatedGasValueUsd() {
      if (!this.outAmount || !this.inAmount || !this.quoteStatus) return "";
      if (this.estimatedGas && this.gasPrice) {
        const { symbol, decimals } = getNativeToken(this.walletType);
        if (symbol && decimals && this.nativeTokenUsd > 0) {
          const amount = decimals2Amount(
            this.estimatedGas * this.gasPrice,
            decimals
          );
          return `~ $${toFixed(this.nativeTokenUsd * amount, 2)}`;
        }
      }
    },
    minReceive() {
      if (!this.outAmount || !this.quoteStatus || !this.tokenSwapNext.usd)
        return "--";
      return `${toFixed(this.outAmount * (1 - this.tolerance / 100), 8, 4)} ${
        this.tokenSwapNext.symbol
      }`;
    },
    minReceiveUsd() {
      if (!this.outAmount || !this.quoteStatus || !this.tokenSwapNext.usd)
        return "--";
      const amount = this.outAmount * (1 - this.tolerance / 100);
      return `~ $${toFixed(amount * this.tokenSwapNext.usd, 8, 8)}`;
    },
    youSave() {
      if (!this.outAmount || !this.inAmount || !this.quoteStatus) return "--";
      if (
        this.exchangeList &&
        this.exchangeList.length > 2 &&
        +this.exchangeList[1].amount > 0
      ) {
        const amount = toFixed(
          this.exchangeList[0].amount - this.exchangeList[1].amount,
          8,
          8
        );
        return !amount ? "--" : `${amount} ${this.tokenSwapNext.symbol}`;
      }
      return "--";
    },
    youSaveUsd() {
      if (!this.outAmount || !this.inAmount || !this.quoteStatus) return "";
      if (
        this.exchangeList &&
        this.exchangeList.length > 1 &&
        +this.exchangeList[1].amount > 0 &&
        this.tokenSwapNext.usd > 0
      ) {
        const amount =
          this.exchangeList[0].amount - this.exchangeList[1].amount;
        return +amount === 0
          ? ""
          : `~ $${toFixed(this.tokenSwapNext.usd * amount, 6, 6)}`;
      }
      return "";
    },
    priceImpact() {
      if (!this.outAmount || !this.inAmount || !this.quoteStatus) return 0;
      if (
        this.tokenSwapPrev.usd &&
        this.tokenSwapNext.usd &&
        this.inAmount &&
        this.outAmount
      ) {
        const inUsdtValue = this.inAmount * this.tokenSwapPrev.usd;
        const outUsdtValue = this.outAmount * this.tokenSwapNext.usd;
        return (
          (Math.floor(((outUsdtValue - inUsdtValue) / inUsdtValue) * 10000) /
            100) *
          (this.tokenSwap === 0 ? 1 : -1)
        );
      }
      return 0;
    },
    comparedTo() {
      if (!this.outAmount || !this.inAmount || !this.quoteStatus) return "";
      if (
        this.exchangeList &&
        this.exchangeList.length > 2 &&
        +this.exchangeList[1].amount > 0
      ) {
        const amount = toFixed(
          this.exchangeList[0].amount - this.exchangeList[1].amount
        );
        return !amount ? "" : `Compared to ${this.exchangeList[1].dexCode}`;
      }
      return "";
    },
  },
  mounted() {
    if (isCustomGas(this.walletType)) {
      this.getGasPrice();
    } else {
      this.loading = false;
    }
    this.getDexesList();
    this.getExchange();
    this.quote();
  },
  methods: {
    changeTokenSwap() {
      state.tokenSwap = 1 - state.tokenSwap;
    },
    getAmount() {
      const { value, decimals, balance, balanceDecimals } = this.tokenSwapPrev;
      const amountDecimals =
        value === balance
          ? balanceDecimals
          : BN(value).times(BN(10).pow(decimals)).toFixed(0);
      return {
        amount: value,
        amountDecimals,
      };
    },
    async getDexesList() {
      if (this.walletType === "ont") {
        this.dexesList = [
          {
            code: "innoswap",
            index: 2,
            checked: true,
            name: "InnoSwap",
          },
        ];
        return;
      }
      const res = await this.$axios.get(this.walletPath + "dex", {
        cache: true,
      });
      if (res && res.length) {
        this.dexesList = res.map((item) => {
          return Object.assign(item, {
            checked: true,
          });
        });
      }
    },
    getDisabledDexIds() {
      const list = [];
      const temp = window.localStorage.getItem(this.walletType + "_dexes");
      const dexes = (temp && JSON.parse(temp)) || {};
      this.dexesList.forEach((item) => {
        if (+dexes[item.code] === 0) {
          list.push(item.index);
        }
      });
      return list;
    },
    changeToken(target, from) {
      const { id, code, name, symbol, address, icon, decimals } = target;
      const token = {
        id: id || code,
        name,
        symbol,
        icon,
        address,
        decimals,
        price: 0,
        usd: 0,
        balance: 0,
        usdtValue: 0,
        value: 0,
        balanceDecimals: 0,
      };
      if (from) {
        token.value = 1;
        Object.assign(state.tokenSwapList[this.tokenSwap], token);
      } else {
        Object.assign(state.tokenSwapList[1 - this.tokenSwap], token);
      }
      console.log("state.tokenSwapList", state.tokenSwapList);
    },
    async getBalanceOf() {
      if (
        !this.default_account ||
        this.default_account === "0x0000000000000000000000000000000000000000"
      )
        return;
      await this.getTokenBalanceOf(this.tokenSwapPrev);
      await this.getTokenBalanceOf(this.tokenSwapNext);
    },
    async getTokenBalanceOf(token) {
      const { symbol, address, decimals } = token;
      const { abi, approveContract } = this.exchange || {};
      if (!address) {
        token.balance = "";
        return;
      }
      // console.log("getTokenBalanceOf", token);
      // const { balance, balanceDecimals, approve } = await getBalance(
      //   symbol,
      //   address,
      //   abi,
      //   decimals,
      //   approveContract
      // );

      const { short, long } = await getBalance(
        this.walletType, this.default_account, token
      );
      if (this.walletType !== 'solana') {
        const approve = await getAllowance(this.walletType, this.default_account, token, approveContract)
        token.approve = approve;
      }
      token.balance = short ? short + "" : "";
      token.balanceDecimals = long;
      // console.log("getTokenBalanceOf", token, token.balance, token.approve);
    },
    setExchange(dexes, unSelected, inAmount, outAmout, outDecimals) {
      let temp = dexes.map((item) => {
        item.amount =
          (+item.swapAmount &&
            BN(+item.swapAmount)
              .div(BN(10).pow(outDecimals))
              .decimalPlaces(4)
              .toString()) ||
          "0";
        item.price = toFixed(item.amount / inAmount, 4);
        if (unSelected.indexOf(item.dexIndex) >= 0) {
          item.disabled = 1;
          item.sortId = -1;
        } else {
          item.disabled = 0;
          item.sortId = +item.amount;
        }
        return Object.assign(item, {
          code: 1,
        });
      });
      temp.sort((a, b) => {
        return a.sortId > b.sortId ? -1 : 1;
      });
      outAmout =
        temp && temp[0] && +temp[0].amount > +outAmout
          ? temp[0].amount
          : outAmout;
      temp.map((item) => {
        if (item.amount && +item.amount !== 0) {
          if (item.amount == outAmout) {
            item.diff = this.$t("table_match");
          } else {
            item.diff =
              (((item.amount - outAmout) / outAmout) * 100).toFixed(2) + "%";
          }
        } else {
          item.diff = "";
        }
      });
      if (this.walletType === "ont") {
        temp = [
          {
            code: 2,
            dexCode: "innoswap",
            amount: outAmout,
            price: toFixed(outAmout / inAmount, 4),
            disabled: 0,
            diff: this.$t("table_match"),
          },
        ];
      }
      temp.unshift({
        code: 1,
        dexCode: "OpenOcean",
        amount: outAmout,
        price: toFixed(outAmout / inAmount, 4),
        disabled: 0,
        diff: this.$t("table_best"),
      });
      state.exchangeList = temp;
    },
    updateToken() {
      history.pushState(
        {},
        "",
        `/classic#/${this.walletType}/${this.tokenSwapPrev.symbol}/${this.tokenSwapNext.symbol}`.toUpperCase()
      );
      // alert('updateToken')
      // console.log('updateToken', state.tokenSwapList)
      this.saveToken("tokenSwapPrev", this.tokenSwapPrev);
      this.saveToken("tokenSwapNext", this.tokenSwapNext);
    },
    quote(flag) {
      this.retry = 3;
      this.quoteStatus = 0;
      if (flag) {
        this.quoteCore(flag);
      } else {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.quoteCore();
        }, 500);
      }
    },
    quoteCore(auto) {
      if (this.loading) return;
      if (!this.gasPrice) return;
      if (this.tabCode === "02") return;
      this.updateToken();
      if (+this.inAmount <= 0 && this.outAmount <= 0) {
        this.tokenSwapPrev.usd = 0;
        this.tokenSwapNext.usd = 0;
        this.minOutAmount = "";
        this.getBalanceOf();
        return;
      }
      const { symbol, address } = this.tokenSwapPrev;
      const outToken = this.tokenSwapNext;
      const { amount: _inAmount, amountDecimals } = this.getAmount();
      if (+_inAmount === 0) {
        this.tokenSwapNext.value = "";
        return;
      }
      if (isNaN(amountDecimals)) {
        this.loading = false;
        return;
      }
      if (!auto) {
        this.loading = true;
      }
      const unSelected = this.getDisabledDexIds();
      const slippage = +this.tolerance;
      this.$axios
        .get(
          this.walletPath +
            "quote?" +
            qs.stringify({
              inTokenSymbol: symbol,
              inTokenAddress: address,
              outTokenSymbol: outToken.symbol,
              outTokenAddress: outToken.address,
              amount: amountDecimals,
              gasPrice: this.gasPrice,
              slippage: slippage * 100,
              disabledDexIds: unSelected.join(","),
            })
        )
        .then(async (res) => {
          const {
            dexes = [],
            inAmount,
            outAmount,
            estimatedGas = "",
            path = [],
          } = res;
          const amount = this.getAmount();
          if (+inAmount !== +amount.amountDecimals) {
            this.loading = false;
            this.quote();
            return;
          }
          window.localStorage.setItem(
            this.walletType + "_in",
            symbol.toLowerCase()
          );
          window.localStorage.setItem(
            this.walletType + "_out",
            outToken.symbol.toLowerCase()
          );
          const outDecimals = outToken.decimals;
          let _outAmout =
            (outAmount &&
              BN(outAmount)
                .div(BN(10).pow(outDecimals))
                .decimalPlaces(4)
                .toString()) ||
            "";
          this.estimatedGas = estimatedGas;
          state.routePath = path;
          this.setExchange(
            dexes,
            unSelected,
            _inAmount,
            _outAmout,
            outDecimals
          );
          state.tokenSwapList[1 - state.tokenSwap].value = _outAmout;
          this.loading = false;
          this.quoteStatus = 1;
          await this.getTokenPrice(this.tokenSwapPrev, this.tokenSwapNext);
          await this.getNativeTokenPrice();
          await this.getBalanceOf();
          clearTimeout(this.timer);
          this.timer = setTimeout(async () => {
            this.quoteCore(true);
          }, 3000);
        })
        .catch((e) => {
          this.loading = false;
          setTimeout(() => {
            this.quote();
          }, 3000);
        });
    },
    async swapQuote() {
      if (!this.account) {
        window.showWalletEvent && window.showWalletEvent(this.walletType);
        return;
      }
      if (+this.inAmount <= 0 || +this.outAmount <= 0) return;
      if (this.loading) return;
      const { symbol, address, balance, id: ids } = this.tokenSwapPrev;
      const outToken = this.tokenSwapNext;
      const unSelected = this.getDisabledDexIds();
      if (this.walletType !== "solana") {
        if (symbol !== "OOE") {
          if (unSelected.length === this.dexesList.length) return;
        }
      }
      const native = isNativeToken(this.walletType, address);
      const { amount, amountDecimals } = this.getAmount();
      console.log(amount,amountDecimals)
      if (native) {
        const { symbol, decimals } = getNativeToken(this.walletType);
        if (symbol && decimals) {
          const gasFee = decimals2Amount(
            this.estimatedGas * this.gasPrice,
            decimals
          );
          if (+gasFee && +balance - +amount < gasFee * 2) {
            showToast(
              `You need to keep a small amount of ${symbol} to pay for the gas fees.`
            );
            return;
          }
        }
      }
      this.loading = true;
      const params = {
        inTokenSymbol: symbol,
        inTokenAddress: address,
        outTokenSymbol: outToken.symbol,
        outTokenAddress: outToken.address,
        amount: amountDecimals,
        gasPrice: this.gasPrice,
        disabledDexIds: unSelected.join(","),
        slippage: this.tolerance * 100,
        account: this.default_account,
        referrer: this.$route.query.referral || "0x3487ef9f9b36547e43268b8f0e2349a226c70b53",
        referrerFee: this.$route.query.referral ? 100 : 0,
        referrerFeeShare: this.$route.query.referral ? 100 : 0,
      }
      this.$axios
        .get(
          this.walletPath +
            "swap-quote?" +
            qs.stringify(params)
        )
        .then((res) => {
          res.gasPrice = this.gasPrice;
          if (this.walletType === "eth") {
            const option = window.localStorage.getItem("gasoption");
            this.gasPriceOptions.forEach((item) => {
              if (item.code === option && item.ethgas) {
                res.ethGasPrice = item.ethgas;
              }
            });
          }
          console.log("this.walletType === 'eth'", this.walletType);

          res._amount = amountDecimals;
          res.symbol = symbol;
          res.outTokenSymbol = outToken.symbol;
          res.fromIds = ids;
          res.params = params;
          res.timestamp = new Date().getTime();
          this.swapRes = res;
          // this.swapRes.gasPrice = this.gasPrice;
          const outDecimals = outToken.decimals;
          const { outAmount, minOutAmount } = res;
          this.minOutAmount =
            (minOutAmount &&
              BN(minOutAmount).div(BN(10).pow(outDecimals)).toFixed(4)) ||
            "";
          this.swapOutAmount =
            (outAmount &&
              BN(outAmount).div(BN(10).pow(outDecimals)).toFixed(4)) ||
            "";
          this.loading = false;
          this.tradeData = {
            price: this.rate,
            symbol: this.tokenSwapPrev.symbol,
            priceImpact: this.priceImpact,
            tolerance: this.tolerance,
            estimatedGasValue: this.estimatedGasValue,
            estimatedGasValueUsd: this.estimatedGasValueUsd,
            minOutAmount: formatPrice(this.minOutAmount),
            swapOutAmount: this.swapOutAmount,
            approve: !!res.approve,
          };
          this.isConfirmShow = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async confirmSwap() {
      // this.swapRes.gasPrice = window.localStorage.getItem(`${this.walletType}_setting_gasPrice`);
      const { approve, swap, transaction, _amount, symbol, params, timestamp, rfqDeadline = 0 } = this.swapRes;
      if (new Date().getTime() - timestamp > 5 * 1000 || rfqDeadline > 0) {
        const res = await this.$axios
          .get(
            this.walletPath +
            `${this.gasOOE ? 'meta-swap' : 'swap-quote'}?` +
            qs.stringify(params)
          );
        if (this.walletType === "eth") {
          const option = window.localStorage.getItem("gasoption");
          this.gasPriceOptions.forEach((item) => {
            if (item.code === option && item.ethgas) {
              res.ethGasPrice = item.ethgas;
            }
          });
        }
        const _outAmout1 = decimals2Amount(res.outAmount, res.outToken.decimals);
        const _outAmout2 = decimals2Amount(this.swapRes.outAmount, this.swapRes.outToken.decimals);
        if (new BN(_outAmout1).comparedTo(_outAmout2) < 0 || rfqDeadline > 0) {
          res._amount = this.swapRes.amountDecimals;
          res.symbol = this.swapRes.symbol;
          res.outTokenSymbol = this.swapRes.outToken.symbol;
          res.fromIds = this.swapRes.ids;
          this.swapRes = res;
        }
      }
      this.swapRes.gasPrice = this.gasPrice;
      if (this.walletType === "ont") {
        console.log("walletName", this.walletName);
        if (this.walletName === "ONTO Mobile") {
          const instance = showOntoScan(approve ? approve : swap);
          instance.$on("close", this.hideQrcode);
        } else {
          if (approve) {
            this.approveOnt(transaction, _amount, symbol);
          } else {
            this.sendOntTransaction(transaction);
          }
        }
      } else {
        console.log(this.swapRes, this.exchange,symbol, '++++++++++')
        // this.swapRes = Object.assign(this.swapRes, {dex:'openOcean'})
        sendTransaction(this.swapRes)
        //sendTransaction(this.swapRes, this.exchange, symbol);
      }
      this.isConfirmShow = false;
    },

    async approveOnt(transaction, _amount, symbol) {
      const instance = showNotification({
        status: "loading",
        title: this.$t("notification_pending_title"),
        notice: this.$t("notification_pending_notice"),
        text: this.$t("notification_pending_content", { symbol }),
      });
      try {
        const { scriptHash, operation, gasLimit, args } = transaction;
        const params = {
          contract: this.tokenSwapPrev.address,
          operation: "approve",
          args: [
            {
              type: "Address",
              value: this.default_account,
            },
            {
              type: "ByteArray",
              value: utils.reverseHex(scriptHash),
            },
            {
              type: "ByteArray",
              value: utils.bigIntToBytes(_amount + ""),
            },
          ],
          gasPrice: 2500,
          gasLimit: 40000,
        };
        const result = await client.api.smartContract.invoke(params);
        console.log("approveOnt params, result", params, result);
        this.sendOntTransaction(transaction, instance);
      } catch (e) {
        // tslint:disable-next-line:no-console
        console.log("onScCall error:", e);
        instance.change({ status: "failed", text: (e && e.message) || e });
        this.isConfirmShowing = false;
      }
    },
    async sendOntTransaction(transaction, instance) {
      const { symbol, outTokenSymbol } = this.swapRes;
      if (!instance) {
        instance = showNotification({
          status: "loading",
          title: this.$t("notification_pending_title"),
          notice: this.$t("notification_pending_notice"),
          text: this.$t("notification_pending_content", { symbol }),
        });
      }
      try {
        const { scriptHash, operation, gasLimit, args } = transaction;
        const params = {
          scriptHash,
          operation,
          args: this.formatArgs(args),
          gasPrice: 2500,
          gasLimit: 60000,
          requireIdentity: false,
        };
        console.log("sendOntTransaction params", params);
        const result = await client.api.smartContract.invoke(params);
        // tslint:disable-next-line:no-console
        console.log("onScCall finished, result:" + JSON.stringify(result));
        console.log("submitted", this.swapRes);
        if (result && result.transaction) {
          instance.change({
            status: "submitted",
            chain: this.walletType,
            address: result.transaction,
            title: this.$t("notification_submited_title"),
            text: this.$t("notification_submited_content"),
            subcontent: `Successfully swap from ${symbol} to ${outTokenSymbol}`,
          });
          setTimeout(() => {
            window.reloadPage();
          }, 3000);
        } else {
          instance.change({ status: "failed", text: result.message });
          window.reloadPage();
        }
        this.isConfirmShowing = false;
      } catch (e) {
        // tslint:disable-next-line:no-console
        console.log("onScCall error:", e);
        instance.change({ status: "failed", text: (e && e.message) || e });
        this.isConfirmShowing = false;
      }
    },
    formatArgs(args) {
      return args.map((item) => {
        const { type } = item;
        if (["Long", "Integer"].indexOf(type) >= 0) {
          item.value = Number(item.value);
        }
        return item;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";

.magic-edit{
  display: flex;
}

.content {
  flex: 1;
  margin-left: 10px;
  text-align: right;
}

.t-label {
  color: var(--color-content);
  font-size: 12px;
  line-height: 16px;
  transform: scale(0.833);
  transform-origin: left;
  display: flex;
  align-items: flex-end;

  &.left {
    max-width: 80px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }

  &.max {
    max-width: 90px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }

  &.right {
    transform-origin: right;
  }

  .red {
    color: var(--red);
  }
}

.warning__icon {
  display: none;
}

.warning-info {
  display: none;
}

.warning {
  position: relative;
  cursor: pointer;

  .warning__icon {
    margin-left: 2px;
    display: inline-block;
    font-size: 12px;
    transform: scale(0.9);
    transform-origin: left;
  }

  &:hover,
  &.on {
    .warning-info {
      display: block;
      top: -64px;
    }
  }
  // .warning-info {
  //   position: absolute;
  //   right: -20px;
  //   top: -18px;
  //   padding: 8px 10px;
  //   line-height: 1.5;
  //   background-color: var(--tooltip-bg);
  //   border-radius: 5px;
  //   color: var(dialog-content);
  //   font-size: 14px;
  //   text-align: left;
  //   width: 260px;
  //   display: none;
  //   &::after {
  //     position: absolute;
  //     right: 20px;
  //     bottom: -4px;
  //     content: "";
  //     display: block;
  //     width: 0;
  //     height: 0;
  //     border-top: 5px solid var(--tooltip-bg);
  //     border-right: 5px solid transparent;
  //     border-left: 5px solid transparent;
  //   }
  // }
}
.copyright {
  margin-top: 12px;
  height: 16px;
  line-height: 16px;
  transform: translateY(6px);
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-size: 13px;
    color: var(--classic-text-common);
  }

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  svg {
    height: 16px;
    margin-left: 6px;
  }
}
</style>