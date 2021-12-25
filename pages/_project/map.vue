<template>
  <div class="map-page">
    <div class="map-page__sidebar">
      <a-tabs type="card">
        <a-tab-pane key="0" tab="Locations">
          <MapCard title="Search locations">
            <a-input-search
              class="mb-1"
              placeholder="Enter a location"
              @search="seachLocation"
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
                @click="locationSearchResults = []"
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
              ref="ruleSearchForm"
              :model="searchForm"
              :rules="rulesSearchForm"
              @submit.prevent="submitSearchForm"
            >
              <a-form-model-item prop="dateRange" label="Select a date range">
                <a-range-picker v-model="searchForm.dateRange" class="mb-1" />
              </a-form-model-item>
              <a-form-model-item
                prop="cloudCoverage"
                label="Select a cloud coverage"
              >
                <a-slider
                  v-model="searchForm.cloudCoverage"
                  range
                  :default-value="[0, 100]"
                />
              </a-form-model-item>
              <a-form-model-item>
                <a-button type="primary" html-type="submit">Search</a-button>
              </a-form-model-item>
            </a-form-model>
          </MapCard>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Glacier segmentation">
          <MapCard title="Glacier segmentation">
            <a-button
              block
              type="primary"
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
      width="520"
      placement="left"
      title="Search results"
      :visible="isSearchResultsDrawerVisible"
      @close="isSearchResultsDrawerVisible = false"
    >
      <a-list item-layout="vertical" :data-source="productResults">
        <a-list-item slot="renderItem" key="item.id" slot-scope="item">
          <h1 class="subtitle-result">{{ item.title }}</h1>
          <p>
            {{ item.description }}
          </p>
        </a-list-item>
      </a-list>
    </a-drawer>
  </div>
</template>

<script>
import L from 'leaflet'
import axios from 'axios'
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
      searchForm: {
        dateRange: [],
        cloudCoverage: []
      },
      rulesSearchForm: {
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
      },
      productResults: [
        {
          id: 1,
          title: 'Ant Design Title 1',
          description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.'
        },
        {
          id: 2,
          title: 'Ant Design Title 2',
          description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.'
        }
      ],
      locationSearchResults: []
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
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
    submitSearchForm() {
      console.log(this.searchForm)
      this.isSearchResultsDrawerVisible = true
    },
    async seachLocation(value) {
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
    zoomToLocation(center) {
      this.map.setView(center, 13)
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
  font-size: 1rem;
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
