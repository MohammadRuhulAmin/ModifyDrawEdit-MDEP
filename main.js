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

const vector = new VectorLayer({
  background: 'white',
  source: new VectorSource({
    url: 'assets/geojson.json',
    format: new GeoJSON(),
    wrapX: false,
  }),
});


// const vector = new VectorLayer({
//     style: {
//       'fill-color': 'rgba(0,255,0,0.3)',
//       'stroke-color': '#0000FF',
//       'stroke-width': 2,
//       'circle-radius': 7,
//       'circle-fill-color': '#0000FF',
//     },
//   });


// const vectorLayer = new VectorLayer({
//   background: 'black', // for background color
//   source: new VectorSource({
//     url: 'assets/geojson.json',
//     format: new GeoJSON(),
//     warpX:false 
//   }),
//   style: function (feature) {
//     const color = feature.get('COLOR') || 'white';
//     style.getFill().setColor(color);
//     return style;
//   },
// });



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
  layers: [vector],
  target: 'map',
  view: new View({
    center: transform([90.19530825000014,24.988718323000086], 'EPSG:4326', 'EPSG:3857'),
    zoom: 13,
  }),
});


