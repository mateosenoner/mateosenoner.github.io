let myMap = L.map("mapdiv");
const sehenswuerdigkeitenfeature = L.featureGroup()
let myLayers = {
    geolandbasemap : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"],
            attribution : "Datenquelle: <a href= 'https://www.basemap.at'>Basemap.at</a>"
        }
    ),
    bmapoverlay : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png",{
            subdomains : ["maps","maps1","maps2","maps3","maps4"],
            attribution : "Datenquelle: <a href= 'https://www.basemap.at'>Basemap.at</a>"
        }
    ),

};

myMap.addLayer(myLayers.geolandbasemap);

let myMapControl = L.control.layers({
    "Basemap" : myLayers.geolandbasemap,    
},{
    "basemap.at Overlay": myLayers.bmapoverlay,
    "Sehenswürdigkeiten Standorte" : sehenswuerdigkeitenfeature
    



},{
	collapsed: false
});

myMap.addControl(myMapControl); 
myMap.setView([47.267,11.383], 11);

L.control.scale({ 
	position: "bottomleft", 
	maxWidth: 200, 
	metric: true, 
	imperial: false,
}).addTo(myMap); 

var myIcon = L.icon({
    iconUrl: 'sehenswuerdigkeiten.png',
});

async function addGeojson(url) {
    console.log("Url wird geladen: ", url);
    const response = await fetch(url);
    console.log("Response: ", response);
    const sehenswuerdigkeitendata = await response.json();
    console.log("Geojson: ", sehenswuerdigkeitendata);
    const geojson = L.geoJSON(sehenswuerdigkeitendata, {
        style: function(feature) {
            return { color: "#ff0000"};
        },
        pointToLayer: function(geoJsonPoint, latlng) {
            return L.marker(latlng, {icon: myIcon});
        }
    });
    sehenswuerdigkeitenfeature.addLayer(geojson);
    myMap.fitBounds(sehenswuerdigkeitenfeature.getBounds());

}


const url = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SEHENSWUERDIGOGD&srsName=EPSG:4326&outputFormat=json"

addGeojson(url);

myMap.addLayer(sehenswuerdigkeitenfeature)

