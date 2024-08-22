// helper functions
function createMarkerOptions(title, icon) {
  return {
    title: title,
    clickable: true,
    draggable: false,
    icon: icon,
  };
}

function createSmallIconOptions(imgURL) {
  const newIcon = L.icon({
    iconUrl: imgURL,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -15],
  });
  return newIcon;
}

// map designs
const baseMapURL =
  'https://files.jcink.net/uploads2/welcomehomeroleplay/Maps/town_map_interactive_final.png';
const houseURL =
  'https://files.jcink.net/uploads2/welcomehomeroleplay/Maps/map_home.png';
const jobURL =
  'https://files.jcink.net/uploads2/welcomehomeroleplay/Maps/map_job.png';
const parkURL =
  'https://files.jcink.net/uploads2/welcomehomeroleplay/Maps/map_park.png';

const communeBorder = L.polygon(
  [
    [2922, 2660],
    [2922, 2887.809677],
    [1374, 2887.809677],
    [1374, 2660],
  ],
  { color: '#7f4559', fillOpacity: 0.3 },
);

const townSquareBorder = L.polygon(
  [
    [2320, 3191.96646],
    [2320, 3639.63851],
    [1978.4318245, 3639.63851],
    [1978.4318245, 3191.96646],
  ],
  { color: '#bfe0dc' },
);

const noMansLandBorder = L.polygon(
  [
    [2922, 2890],
    [2922, 3039.75],
    [1374, 3039.75],
    [1374, 2890],
  ],
  { color: '#dabb69', fillOpacity: 0.3 },
);

const hangingGardensBorder = L.polygon(
  [
    [1766, 3038],
    [1766, 3191.780909],
    [1372.43, 3191.780909],
    [1372.43, 3038],
  ],
  { color: '#96d83a', fillOpacity: 0.5 },
);

const packingDistrictBorder = L.polygon(
  [
    [2522.25, 3131.646683],
    [2518.795471, 3247.563257],
    [2324.795471, 3247.563257],
    [2320, 3191.96646],
    [2166.795471, 3191.603531],
    [2164.795471, 3131.646683],
  ],
  { color: '#8ccabf', fillOpacity: 0.3 },
);

const commune = L.layerGroup([communeBorder]);
const townSquare = L.layerGroup([townSquareBorder]);
const noMansLand = L.layerGroup([noMansLandBorder]);
const hangingGardens = L.layerGroup([hangingGardensBorder]);
const packingDistrict = L.layerGroup([packingDistrictBorder]);

// resident houses
const houses = L.layerGroup();

const houseIcon = createSmallIconOptions(houseURL);
const houseOptions = createMarkerOptions('Residence', houseIcon);

// job locations
const jobs = L.layerGroup();

const jobIcon = createSmallIconOptions(jobURL);
const jobOptions = createMarkerOptions('Business', jobIcon);

// landmarks
const landmarks = L.layerGroup();

// town hall
const townHallIcon = L.icon({
  iconUrl:
    'https://files.jcink.net/uploads2/welcomehomeroleplay/Maps/map_townhall.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -22.5],
});

const townHallOptions = createMarkerOptions('Town Hall', townHallIcon);

// parks
const parkIcon = L.icon({
  iconUrl:
    'https://files.jcink.net/uploads2/welcomehomeroleplay/Maps/map_park.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -22.5],
});

const parkSwingIcon = createSmallIconOptions(parkURL);

const townSquareOptions = createMarkerOptions('Town Square', parkIcon);
const cemeteryOptions = createMarkerOptions('Cemetery', parkIcon);
const swingOptions = createMarkerOptions('Swing Set', parkSwingIcon);

// map config
const bounds = [
  [0, 0],
  [4349, 5000],
];

const baseMap = L.imageOverlay(baseMapURL, bounds);

const baseLayers = {
  'Town Map': baseMap,
};

const overlays = {
  'Town Square': townSquare,
  'Packing District': packingDistrict,
  'Hanging Gardens': hangingGardens,
  "No Man's Land": noMansLand,
  Commune: commune,
  Landmarks: landmarks,
  Residences: houses,
  Businesses: jobs,
};
