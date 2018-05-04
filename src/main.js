// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { Button, Slider } from 'element-ui'
import App from './App'
import VueAMap from 'vue-amap'
Vue.component(Button.name, Button)
Vue.component(Slider.name, Slider)
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '7204bfff049e6370b935f9ccbf3bf61e',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
