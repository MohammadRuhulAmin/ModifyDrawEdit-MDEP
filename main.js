import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import {Draw,Snap,Modify,Select,defaults as defaultInteractions,} from 'ol/interaction';
import {get,transform,fromLonLat} from 'ol/proj';

// start  integrating libraries 

import {Fill, Stroke, Style} from 'ol/style';

//import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';

//import {OSM, Vector as VectorSource} from 'ol/source';


// end integrating libraries 


const style = new Style({
  fill: new Fill({
    color: '#eeeeee',
  }),
});


const source_for_drawing = new VectorSource();
const vector_for_drawing = new VectorLayer({
  source: source_for_drawing,
  style: {
    'fill-color': 'rgba(255, 255, 255, 0.2)',
    'stroke-color': '#ffcc33',
    'stroke-width': 2,
    'circle-radius': 7,
    'circle-fill-color': '#ffcc33',
  },
});



const vector = new VectorLayer({
  background: 'white',
  source: new VectorSource({
    url: 'assets/geojson.json',
    format: new GeoJSON(),
    wrapX: false,
  }),
});


const select = new Select({
  wrapX: false,
});

const modify_forMap = new Modify({
  features: select.getFeatures(),
});

const extent = get('EPSG:3857').getExtent().slice();
extent[0] += extent[0];
extent[2] += extent[2];

const map = new Map({
  interactions: defaultInteractions().extend([select, modify_forMap]),
  layers: [vector,vector_for_drawing],
  target: 'map',
  view: new View({
    center: transform([90.19530825000014,24.988718323000086], 'EPSG:4326', 'EPSG:3857'),
    zoom: 13,
    extent
  }),
});


const modify = new Modify({source: source_for_drawing});
map.addInteraction(modify);

let draw, snap; // global so we can remove them later
const typeSelect = document.getElementById('type');

function addInteractions() {
  draw = new Draw({
    source: source_for_drawing,
    type: typeSelect.value,
  });
  map.addInteraction(draw);
  snap = new Snap({source: source_for_drawing});
  map.addInteraction(snap);
}

/**
 * Handle change event.
 */
typeSelect.onchange = function () {
  map.removeInteraction(draw);
  map.removeInteraction(snap);
  addInteractions();
};

addInteractions();





