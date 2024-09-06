<template>
    <div>
         <div id="mapContainer" class="w-full"/>
    </div>
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
    createMapLayer()
   })

   onBeforeMount(()=>{
    if (map) {
        map.remove()
    }
   })

   const latitude = ref('')
   const longitude = ref('')

   navigator.geolocation.getCurrentPosition(function (position) {
    latitude.value = position.coords.latitude;
    longitude.value = position.coords.longitude;    
});

   let map = null;
   const createMapLayer = () => {
     map = L.map('mapContainer').setView([latitude.value, longitude.value], 5)
     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
    if (props.markers.lenght > 0) {
          setMarkers()
    }
   }

   const  setMarkers = () => {
    props.markers. map((marker)=> {
      return L.marker([marker.latitude, marker.longitude]).addTo(map).bindPopup(marker.descricao)
    })
   }

</script>

<style>

</style>