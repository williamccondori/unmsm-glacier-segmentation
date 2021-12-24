<template>
  <div class="map-page">
    <div class="map-page__sidebar">
      <a-card>
        <Subtitle label="Search places" />
        <a-input placeholder="Enter a place" class="mb-1" />
        <a-button type="primary">Search</a-button>
      </a-card>
      <MapCard title="Seearch products">
        <a-input placeholder="Enter a place" class="mb-1" />
        <a-button type="primary">Search</a-button>
      </MapCard>
      <MapCard title="Glacier segmentation">
        <a-button
          block
          type="primary"
          @click="isProgramSegmentationDrawerVisible = true"
          >Program segmentation</a-button
        >
      </MapCard>
    </div>
    <div id="map" />
    <a-drawer
      :visible="isProgramSegmentationDrawerVisible"
      @close="isProgramSegmentationDrawerVisible = false"
    >
      <Subtitle label="Program segmentation" />
      <a-form-model>
        <a-form-model-item prop="startDate" label="Product">
          <a-select placeholder="Select a valid product" />
        </a-form-model-item>
      </a-form-model>
    </a-drawer>
  </div>
</template>

<script>
import L from 'leaflet'
import Subtitle from '~/components/Subtitle.vue'
import MapCard from '~/components/MapCard.vue'
import 'leaflet/dist/leaflet.css'
export default {
  components: {
    Subtitle,
    MapCard
  },
  layout: 'map',
  data() {
    return {
      map: null,
      isProgramSegmentationDrawerVisible: false
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      const baseMapUrl = 'https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}'
      this.map = L.map('map')
      this.map.addLayer(L.tileLayer(baseMapUrl))
      console.log(this.map)
    }
  }
}
</script>

<style scoped>
.map-page {
  display: grid;
  grid-template-columns: 20rem 1fr;
}
.map-page__sidebar {
  padding: 0.5rem;
}
#map {
  height: calc(100vh - 64px);
  background-color: aqua;
}
</style>
