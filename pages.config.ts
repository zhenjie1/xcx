import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  pages: [
    {
      path: 'pages/invoiceList',
      style: {
        enablePullDownRefresh: true,
        onReachBottomDistance: 150,
        navigationBarBackgroundColor: '#fff',
        onReachBottomDistance: 150,
      },
    },
    {
      path: 'pages/lookUp',
      style: {
        navigationBarTitleText: '抬头发票',
      },
    },
    {
      path: 'pages/cash',
      style: {
        navigationBarTitleText: '现金开票',
      },
    },
    {
      path: 'pages/unionPay',
      style: {
        navigationBarTitleText: '银联开票',
      },
    },
    {
      path: 'pages/issue/index',
      style: {
        navigationBarTitleText: '常见问题',
      },
    },
  ],
  globalStyle: {
    'navigationBarTitleText': '电子发票',
    'navigationBarBackgroundColor': '@navBgColor',
    'navigationBarTextStyle': '@navTxtStyle',
    'backgroundColor': '@bgColor',
    'backgroundTextStyle': '@bgTxtStyle',
    'backgroundColorTop': '@bgColorTop',
    'backgroundColorBottom': '@bgColorBottom',
    'app-plus': {
      titleNView: false, // 移除 H5、APP 顶部导航
    },
  },
})
