<template>
  <div id="app">
    <div class="amap-wrapper">
      <!-- <el-amap class="amap-box" :vid="'amap-vue'"></el-amap> -->
      <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :plugin="plugin" :events="events" class="amap-demo">
        <el-amap-marker v-for="(marker, index) in markers"
          :position="marker.position"
          :events="marker.events"
          :visible="marker.visible"
          :draggable="marker.draggable"
          :vid="index"></el-amap-marker>
        <el-amap-polyline :editable="polyline.editable"  :path="polyline.path" :events="polyline.events" :outlineColor="polyline.outlineColor"></el-amap-polyline>
      </el-amap>

      <!-- <div class="toolbar">
        <button @click="getMap()">get map</button>
      </div> -->
    </div>
  </div>
</template>

<script>
import test from './test.json'
import { AMapManager } from 'vue-amap'
let amapManager = new AMapManager()
console.log(test)
export default {
  data () {
    return {
      amapManager,
      zoom: 12,
      center: [121.59996, 31.197646],
      markers: [
        {
          position: [121.5273285, 31.21515044],
          events: {
            click: () => {
              alert('click marker')
            },
            dragend: (e) => {
              console.log('---event---: dragend')
              this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
            }
          },
          visible: true,
          draggable: false,
          template: '<span>1</span>',
        }
      ],
      polyline: {
        path: [[121.5389385, 31.21515044], [121.5389385, 31.29615044], [121.5273285, 31.21515044]],
        events: {
          click (e) {
            alert('click polyline')
          },
          end: (e) => {
            let newPath = e.target.getPath().map(point => [point.lng, point.lat])
            console.log(newPath)
          }
        },
        editable: false,
        outlineColor: '#ffffff'
      },
      events: {
        init: (o) => {
          console.log(o.getCenter())
          console.log(this.$refs.map.$$getInstance())
          o.getCity(result => {
            console.log(result)
          })
        },
        'moveend': () => {
        },
        'zoomchange': () => {
        },
        'click': (e) => {
          alert('map clicked')
        }
      },
      plugin: ['ToolBar', {
        pName: 'MapType',
        defaultType: 0,
        events: {
          init (o) {
            console.log(o)
          }
        }
      }]
    }
  },
  methods: {
    getMap () {
      // amap vue component
      console.log(amapManager._componentMap)
      // gaode map instance
      console.log(amapManager._map)
    }
  }
}
</script>

<style>
html,body,div{
  padding: 0;
  margin: 0;
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
</style>
