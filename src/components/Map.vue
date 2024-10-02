<template >
  <div class="containerMap" >
    <div id="mapContainer">
    </div>
      <div class="title-map pt-2">
        <span class="font-semibold">Contratos</span>
        <p>por localização</p>
      </div>

  </div>

</template>

<script setup>
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { onMounted, onUnmounted, defineProps, ref } from 'vue';

const props = defineProps({
  markers: {
    type: Array,
    required: true,
    default: () => [],
  },
  initialCoordinates: {
    type: Object,
    default: () => ({ latitude: 0.0344566, longitude: -51.0666 }),
  },
});

const formatCurrency = (value) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);
};

let map = null;

const defaultIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41], // tamanhos padrão do ícone
  iconAnchor: [12, 41], // ponto do ícone que será posicionado sobre as coordenadas
  popupAnchor: [1, -34], // ponto do popup que será posicionado sobre o ícone
});

onMounted(() => {
  createMapLayer();
});

onUnmounted(() => {
  if (map) {
    map.remove();
  }
});

const createMapLayer = () => {
  const { latitude, longitude } = props.initialCoordinates;
  const initialZoom = 5;

  map = L.map('mapContainer').setView([latitude, longitude], initialZoom);

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

    if(latitude && longitude){
      L.marker([latitude, longitude], { icon: defaultIcon })
      .addTo(map)
      .bindPopup(`
       <div class="container-popup">
        <b>${cidade} - ${estado}</b><br/>
        Valor Total:  ${formatCurrency(valor_total)}<br/>
        Quantidade de Contratos: ${quantidade_contratos}
        </div>
      `);
    }
  });
};
</script>

<style>

.containerMap {
  position: relative;
  width:104%;
  height: 100%;
}

#mapContainer {
  border: 1px solid black;
  border-radius: 9px;
  height: 100%;
}

.title-map {
  position:absolute;
  top: 0;
  right: 10px;
  z-index: 1000;
}

.container-popup {
  font-size: 14px;
  font-weight: 500;
}
</style>
