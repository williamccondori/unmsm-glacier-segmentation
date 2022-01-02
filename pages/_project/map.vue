<template>
  <div class="map-page">
    <div class="map-page__sidebar">
      <a-tabs type="card">
        <a-tab-pane key="0" tab="Locations">
          <MapCard title="Search locations">
            <a-input-search
              v-model="locationSearchQuery"
              class="mb-1"
              placeholder="Enter a location"
              @search="searchLocation"
            />
            <a-list :data-source="locationSearchResults">
              <a-list-item slot="renderItem" key="item.id" slot-scope="item">
                <a @click="zoomToLocation(item.center)">
                  <a-icon type="pushpin" />
                  <span>{{ item.title }}</span>
                </a>
              </a-list-item>
              <a-button
                v-if="locationSearchResults.length > 0"
                type="danger"
                @click="clearSearchLocationResults"
              >
                <a-icon type="delete" />
                <span>Clear results</span>
              </a-button>
            </a-list>
          </MapCard>
        </a-tab-pane>
        <a-tab-pane key="1" tab="Products">
          <MapCard title="Search products">
            <a-form-model
              ref="ruleSearchProductForm"
              :model="searchProductForm"
              :rules="rulesSearchProductForm"
              @submit.prevent="searchProducts"
            >
              <a-form-model-item prop="dateRange" label="Select a date range">
                <a-range-picker
                  v-model="searchProductForm.dateRange"
                  class="mb-1"
                />
              </a-form-model-item>
              <a-form-model-item
                prop="cloudCoverage"
                label="Select a cloud coverage"
              >
                <a-slider
                  v-model="searchProductForm.cloudCoverage"
                  range
                  :default-value="[0, 100]"
                />
              </a-form-model-item>
              <a-form-model-item>
                <a-button
                  type="primary"
                  html-type="submit"
                  :loading="searchProductFormIsLoading"
                >
                  Search
                </a-button>
              </a-form-model-item>
            </a-form-model>
          </MapCard>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Glacier segmentation">
          <MapCard title="Glacier segmentation">
            <a-button
              block
              type="primary"
              :loading="searchProductFormIsLoading"
              @click="isProgramSegmentationDrawerVisible = true"
            >
              Program segmentation
            </a-button>
          </MapCard>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div id="map" />
    <a-drawer
      width="520"
      placement="left"
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
    <a-drawer
      width="500"
      placement="left"
      title="Search results"
      :visible="isSearchResultsDrawerVisible"
      @close="isSearchResultsDrawerVisible = false"
    >
      <a-list item-layout="vertical" :data-source="products">
        <a-list-item slot="renderItem" key="item.id" slot-scope="item">
          <h1 class="subtitle-result">{{ item.title }}</h1>
          <p>
            {{ item.summary }}, Cloud coverage: {{ item.cloudcoverpercentage }}%
          </p>
        </a-list-item>
      </a-list>
    </a-drawer>
  </div>
</template>

<script>
import L from 'leaflet'
import axios from 'axios'
import { mapActions, mapState } from 'vuex'
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
      isProgramSegmentationDrawerVisible: false,
      isSearchResultsDrawerVisible: false,
      // Search locations
      locationSearchQuery: '',
      locationSearchResults: [],
      // Search products
      searchProductFormIsLoading: false,
      searchProductForm: {
        dateRange: [],
        cloudCoverage: []
      },
      rulesSearchProductForm: {
        dateRange: [
          {
            required: true,
            message: 'Please enter range date'
          }
        ],
        cloudCoverage: [
          {
            required: true,
            message: 'Please enter cloud coverage'
          }
        ]
      }
    }
  },
  computed: {
    ...mapState(['products'])
  },
  mounted() {
    this.initMap()
  },
  methods: {
    ...mapActions(['fetchProducts']),
    initMap() {
      this.map = L.map('map').setView([-9.3098601, -75.4851312], 5)
      var baseLayer = L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
        {
          maxZoom: 18,
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1
        }
      )
      this.map.addLayer(baseLayer)
    },
    // Search locations
    async searchLocation(value) {
      try {
        const { data } = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw&language=es`
        )
        this.locationSearchResults = data.features.map((x) => {
          return {
            id: x.id,
            title: x.place_name,
            center: [x.center[1], x.center[0]]
          }
        })
      } catch (error) {
        this.$message.error(error.message)
      }
    },
    clearSearchLocationResults() {
      this.locationSearchQuery = ''
      this.locationSearchResults = []
    },
    zoomToLocation(center) {
      this.map.setView(center, 13)
    },
    // Search products
    async searchProducts() {
      this.$refs.ruleSearchProductForm.validate(async (isValid) => {
        if (isValid) {
          try {
            this.searchProductFormIsLoading = true

            // Get polygon from window
            const mapBounds = this.map.getBounds()
            const polygon = L.rectangle(mapBounds)
            const polygonGeoJson = polygon.toGeoJSON()

            await this.fetchProducts({
              geojsonToSearch: JSON.stringify(polygonGeoJson),
              initialDate: '20211020',
              finalDate: '20211022',
              initialCloudCoverage: 0,
              finalCloudCoverage: 100
            })
            this.$message.success('Product search successfully')
            this.isSearchResultsDrawerVisible = true
          } catch (error) {
            this.$message.error(error.message)
          } finally {
            this.searchProductFormIsLoading = false
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.map-page {
  display: grid;
  grid-template-columns: 25rem 1fr;
}
.map-page__sidebar {
  padding: 0.5rem;
}
#map {
  height: calc(100vh - 64px);
}
.subtitle-result {
  font-size: 0.8rem;
  font-style: italic;
}
.result-link {
  padding: 0;
  font-size: 0.8rem;
}
.result-link span {
  word-wrap: break-word;
}
</style>
