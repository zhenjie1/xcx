import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  pages: [
    {
      path: 'pages/invoiceList',
      style: {
        navigationBarBackgroundColor: '#fff',
      },
    },
    {
      path: 'pages/issue/index',
      style: {
        navigationBarTitleText: '常见问题',
      },
    },
    {
      path: 'pages/issue/detail',
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
