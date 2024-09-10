<template>

         <div id="mapContainer" />

</template>

<script setup>
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'
import { ref, onMounted, onBeforeMount } from 'vue';

const props =  defineProps({
      markers: {
        type: Array,
        required: false,
        default: () => [],
      },
   })

   onMounted(()=> {
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //   latitude.value = position.coords.latitude;
  //   longitude.value = position.coords.longitude;
  //  });
    createMapLayer()
   })

   onBeforeMount(()=>{
    if (map) {
        map.remove()
    }
   })

  //  const latitude = ref('')
  //  const longitude = ref('')


   let map = null;
   const createMapLayer = () => {
     map = L.map('mapContainer').setView([-5.08921, -42.8016], 5)
     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
    // console.log(map, 'map')
     if (props.markers.lenght > 0) {
        setMarkers()
    }
   }

   const  setMarkers = () => {
    props.markers.map((marker)=> {
      return L.marker([marker.latitude, marker.longitude]).addTo(map).bindPopup(marker.descricao)
    })
   }

</script>

<style>
  #mapContainer {
    width: 50% !important;
    height: 300px !important;
  }
</style>
