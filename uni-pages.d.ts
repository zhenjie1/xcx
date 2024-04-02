/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by vite-plugin-uni-pages

interface NavigateToOptions {
  url: "pages/index" |
       "pages/UserProtocol" |
       "pages/bulletin" |
       "pages/cash" |
       "pages/hi" |
       "pages/invoiceConfirm" |
       "pages/invoiceList" |
       "pages/lookUp" |
       "pages/lookUpAdd" |
       "pages/merchant" |
       "pages/scanCode" |
       "pages/unionPay" |
       "pages/webView" |
       "pages/whatMerchant" |
       "pages/issue/detail" |
       "pages/issue/index" |
       "pages/issue/source" |
       "pages-sub/index";
}
interface RedirectToOptions extends NavigateToOptions {}

interface SwitchTabOptions {
  
}

type ReLaunchOptions = NavigateToOptions | SwitchTabOptions;

declare interface Uni {
  navigateTo(options: UniNamespace.NavigateToOptions & NavigateToOptions): void;
  redirectTo(options: UniNamespace.RedirectToOptions & RedirectToOptions): void;
  switchTab(options: UniNamespace.SwitchTabOptions & SwitchTabOptions): void;
  reLaunch(options: UniNamespace.ReLaunchOptions & ReLaunchOptions): void;
}
