<template>
  <div id="mapContainer" />
</template>

<script setup>
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { onMounted, onUnmounted, defineProps } from 'vue';

const props = defineProps({
  markers: {
    type: Array,
    required: true,
    default: () => [],
  },
});

let map = null;

onMounted(() => {
  createMapLayer();
});

onUnmounted(() => {
  if (map) {
    map.remove();
  }
});

const createMapLayer = () => {
  map = L.map('mapContainer').setView([-12.9714, -38.5014], 5);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  if (props.markers.length > 0) {
    setMarkers();
  }
};

const setMarkers = () => {
  props.markers.forEach((marker) => {
    const latitude = parseFloat(marker.latitude);
    const longitude = parseFloat(marker.longitude);
    const { cidade, estado, valor_total, quantidade_contratos } = marker;

    L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup(`
        <b>${cidade} - ${estado}</b><br/>
        Valor Total: R$ ${valor_total.toFixed(2)}<br/>
        Quantidade de Contratos: ${quantidade_contratos}
      `);
  });
};
</script>

<style>
#mapContainer {
  width: 100%;
  height: 500px;
}
</style>
