<style>
html,body,div,h1,h2,h3,p,ul,li{
  padding: 0;
  margin: 0;
}
li{
  list-style: none;
}
.amap-toolbar {
  bottom: 50% !important;
}
.amap-maptypecontrol {
  display: none !important;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.amap-wrapper {
  height: 100%;
  height: 100vh;
}

.slider-wraper{
  margin: 8px 0;
}
.slider{
  margin: 0 16px;
}
.mode-image{
  position: absolute;
  margin-left: -24px;
  width: 18px;
  height: 18px;
}
.title{
  font-size: 18px;
  text-align: left;
}
.sub{
  position: relative;
  line-height: 18px;
  height: 18px;
  font-size: 14px;
  color: gray;
}
.bottom-top-right-left-fixed {
  position: fixed;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  overflow-y: auto;
  z-index: 999;
}
.bottom-fixed {
  padding: 6px;
  padding-bottom: 22px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  text-align: left;
}
.bottom-right-fixed {
  position: fixed;
  bottom: 12px;
  right: 12px;
  z-index: 999;
}
</style>

<template>
  <div id="app">
    <div class="amap-wrapper">
      <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :plugin="plugin" :events="events">
        <el-amap-marker v-if="markers" v-for="(marker, index) in markers" :position="marker.position" :template="marker.template" :vid="index" :key="index"></el-amap-marker>
        <el-amap-polyline v-if="polyline.path" :editable="polyline.editable" :path="polyline.path" :events="polyline.events" :strokeColor="polyline.strokeColor"></el-amap-polyline>
        <el-amap-circle-marker
          v-if="circleMarkers"
          v-for="circleMarker in circleMarkers"
          :key="circleMarker.center[0]"
          :center="circleMarker.center"
          :radius="circleMarker.radius"
          :zIndex="circleMarker.zIndex"
          :strokeColor="circleMarker.strokeColor"
          :strokeOpacity="circleMarker.strokeOpacity"
          :strokeWeight="circleMarker.strokeWeight"
          :fill-color="circleMarker.fillColor"
          :fill-opacity="circleMarker.fillOpacity"></el-amap-circle-marker>
      </el-amap>
    </div>
    <div class="bottom-fixed " v-if="current">
      <div style="display:flex;" class="slider-wraper">
        <el-button icon="el-icon-caret-left" circle size="small" @click="handleMarker(-1)"></el-button>
        <el-slider :min="min" :max="max" v-model="currentPage" style="flex: 1;" class="slider" @change="handleChanerMaker"></el-slider>
        <el-button icon="el-icon-caret-right" circle size="small"  @click="handleMarker(1)"></el-button>
      </div>
      <div style="display:flex;">
        <div style="margin-right: 20px;">
          <h3 class="title">{{current.address}}</h3>
          <p class="sub"><img class="mode-image" :src="modeImage">精度{{current.radius}}米 {{current.create_time}}</p>
        </div>
        <el-button type="primary" style="height: 52px;" @click="isLists = true">更多</el-button>
      </div>
    </div>
    <div v-if="isLists && lists">
      <ul class="bottom-top-right-left-fixed" >
        <li v-for="list in lists" :key="list.create_time" style="display: flex; padding-top: 10px; padding-bottom: 10px; border-bottom: 1px solid darkgrey">
          <div style="padding: 20px;">
            <img style="width: 18px; height: 18px;" src="static/icon_gps.png" v-if="list.mode === 'GPS'">
            <img style="width: 18px; height: 18px;" src="static/icon_wifi.png" v-if="list.mode === 'WIFI'">
            <img style="width: 18px; height: 18px;" src="static/icon_lbs.png" v-if="list.mode === 'LBS'">
          </div>
          <h3 class="title" style="width: 260px !important; font-size: 16px;">
            {{list.address}}
          </h3>
          <p class="sub">{{list.create_time}}</p>
        </li>
      </ul>
       <el-button type="primary" class="bottom-right-fixed" @click="isLists = false">返回</el-button>
    </div>
  </div>
</template>

<script>
import gps from '../static/icon_gps.png'
import lbs from '../static/icon_lbs.png'
import wifi from '../static/icon_wifi.png'
import marker from '../static/maker.png'
import { bd09togcj02 } from 'coordtransform'
import test from './test.json'
import { AMapManager } from 'vue-amap'
let amapManager = new AMapManager()
console.log(test)
export default {
  data () {
    return {
      isLists: false,
      currentPage: 0,
      current: null,
      lists: null,
      amapManager,
      zoom: 12,
      center: null,
      circleMarkers: null,
      markers: null,
      polyline: {
        path: null,
        events: {
          click (e) {
            // alert('click polyline')
          },
          end: (e) => {
            // let newPath = e.target.getPath().map(point => [point.lng, point.lat])
            // console.log(newPath)
          }
        },
        editable: false,
        strokeColor: '#399af7',
        lineJoin: 'round'
      },
      events: {
        init: (o) => {
          // console.log(o.getCenter())
          // console.log(this.$refs.map.$$getInstance())
          // o.getCity(result => {
          //   console.log(result)
          // })
        },
        'moveend': () => {
        },
        'zoomchange': () => {
        },
        'click': (e) => {
          // alert('map clicked')
        }
      },
      plugin: ['ToolBar', {
        pName: 'MapType',
        defaultType: 0,
        events: {
          init (o) {
            // console.log(o)
          }
        }
      }]
    }
  },
  computed: {
    modeImage () {
      if (this.current.mode === 'WIFI') return wifi
      if (this.current.mode === 'LBS') return lbs
      if (this.current.mode === 'GPS') return gps
      return ''
    },
    max () {
      if (this.lists.length > 0) return this.lists.length
    },
    min () {
      return 0
    }
  },
  created () {
    let lists = test.data
    let currentPage = test.data.length - 1
    console.log(currentPage)
    let { current } = this.generateCurrent(lists, currentPage)
    let { markers, polylinePaths } = this.generateMarkers(test.data)
    let { center } = this.generateCenter(current)
    let { circleMarkers } = this.generateCircleMarkers(current)
    this.current = current
    this.currentPage = currentPage
    this.lists = lists
    this.center = center
    this.markers = markers
    this.polyline.path = polylinePaths
    this.circleMarkers = circleMarkers
  },
  methods: {
    generateCurrent (data, currentPage) {
      return {
        current: data[currentPage]
      }
    },
    generateMarkers (data) {
      let markers = []
      let polylinePaths = []
      data.forEach(item => {
        markers.push({    
          position: bd09togcj02(item.longitude, item.latitude),
          template: `<img src=${marker} style="width: 20px; height: 20px; position: relative; top: 20px;"/>`,
        })
        polylinePaths.push(bd09togcj02(item.longitude, item.latitude))
      })
      return {
        markers,
        polylinePaths
      }
    },
    generateCircleMarkers (current) {
      return {
        circleMarkers: [
          {
            center: bd09togcj02(current.longitude, current.latitude),
            radius: current.radius,
            zIndex: 999,
            strokeColor: '#ffffff',
            strokeOpacity: '0.8',
            strokeWeight: 1,
            fillColor: '#399af7',
            fillOpacity: '0.6'
          }
        ]
      }
    },
    generateCenter (current) {
      return {
        center: bd09togcj02(current.longitude, current.latitude)
      }
    },
    handleChanerMaker (value) {
      if (value >= this.lists.length || value < 0) return
      let { circleMarkers } = this.generateCircleMarkers(this.lists[value])
      let { center } = this.generateCenter(this.lists[value])
      let { current } = this.generateCurrent(this.lists, value)
      this.current = current
      this.circleMarkers = circleMarkers
      this.center = center
    },
    handleMarker (value) {
      let newValue = this.currentPage + value
      if (newValue >= this.lists.length || newValue < 0) return
      let { circleMarkers } = this.generateCircleMarkers(this.lists[newValue])
      let { center } = this.generateCenter(this.lists[newValue])
      let { current } = this.generateCurrent(this.lists, newValue)
      this.current = current
      this.circleMarkers = circleMarkers
      this.center = center
      this.currentPage = newValue
    }
  }
}
</script>
