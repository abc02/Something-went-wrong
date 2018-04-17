<template>
  <div id="app">
    <div class="amap-wrapper">
      <!-- <el-amap class="amap-box" :vid="'amap-vue'"></el-amap> -->
      <el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :plugin="plugin" :events="events" >
        <el-amap-marker v-if="markers" v-for="(marker, index) in markers" :position="marker.position" :vid="index"></el-amap-marker>
        <!-- <el-amap-polyline :editable="polyline.editable"  :path="polyline.path" :events="polyline.events" :outlineColor="polyline.outlineColor"></el-amap-polyline> -->
        <!-- <el-amap-circle-marker v-for="marker in markers" :center="marker.center" :radius="marker.radius" :fill-color="marker.fillColor" :fill-opacity="marker.fillOpacity" :events="marker.events"></el-amap-circle-marker> -->
      </el-amap>

      <!-- <div class="toolbar">
        <button @click="getMap()">get map</button>
      </div> -->
       <!-- <div class="toolbar">
        <button type="button" name="button" v-on:click="toggleVisible">toggle first marker</button>
        <button type="button" name="button" v-on:click="changePosition">change position</button>
        <button type="button" name="button" v-on:click="chnageDraggle">change draggle</button>
        <button type="button" name="button" v-on:click="addMarker">add marker</button>
        <button type="button" name="button" v-on:click="removeMarker">remove marker</button>
      </div> -->
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
// import iconMark from './assets/icon108.png'
import coordtransform from 'coordtransform'
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
      markers: null,
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
  async created () {
    // let locationBaiDuToGaoDe = `http://restapi.amap.com/v3/assistant/coordinate/convert?locations=116.481499,39.990475&coordsys=baidu&key=50af587e5b2390b5ccc993b4888e819b`
    let arryLength = test.data.length
    let lastdataArry = test.data[arryLength - 1]
    this.center = [lastdataArry.longitude, lastdataArry.latitude]
    // let limit = 39
    // let xx = []
    // test.data.forEach((item, index) => {
    //   // console.log(item, index)
    //   if (index === limit) {
    //   //   //  let res = await axios.get(`http://restapi.amap.com/v3/assistant/coordinate/convert?locations=${xx.join('|')}&coordsys=baidu&key=50af587e5b2390b5ccc993b4888e819b`)
    //     console.log(xx.join('|'))
    //   //   //  xx = []
    //   }
    //   xx.push(`${item.longitude},${item.latitude}`)
    //   // markers.push({ position: [item.longitude, item.latitude] } )
    // })
    // let markers = []
    // test.data.forEach(item => {
    //   markers.push({ position: [item.longitude, item.latitude] } )
    // })
    let bd09togcj02 = coordtransform.bd09togcj02(lastdataArry.longitude, lastdataArry.latitude)
    this.markers = [{ position: bd09togcj02 }]
  }
  // methods: {
  //   onClick() {
  //     this.count += 1;
  //   },
  //   changePosition() {
  //     let position = this.markers[0].position;
  //     this.markers[0].position = [position[0] + 0.002, position[1] - 0.002];
  //   },
  //   chnageDraggle() {
  //     let draggable = this.markers[0].draggable;
  //     this.markers[0].draggable = !draggable;
  //   },
  //   toggleVisible() {
  //     let visableVar = this.markers[0].visible;
  //     this.markers[0].visible = !visableVar;
  //   },
  //   addMarker() {
  //     let marker = {
  //       position: [121.5273285 + (Math.random() - 0.5) * 0.02, 31.21515044 + (Math.random() - 0.5) * 0.02]
  //     };
  //     this.markers.push(marker);
  //   },
  //   removeMarker() {
  //     if (!this.markers.length) return;
  //     this.markers.splice(this.markers.length - 1, 1);
  //   }
  // }
  // methods: {
  //   getMap () {
  //     // amap vue component
  //     console.log(amapManager._componentMap)
  //     // gaode map instance
  //     console.log(amapManager._map)
  //   }
  // }
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
