let myMap = L.map("mapdiv"); //http://leafletjs.com/reference-1.3.0.html#map-l-map
let markerGroup = L.featureGroup();
myMap.addLayer(markerGroup);
let myLayers = {
    osm : L.tileLayer( //hhttp://leafletjs.com/reference-1.3.0.html#tilelayer
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        	subdomains : ["a","b","c"],
			attribution : "© <a href= 'https://www.openstreetmap.org/copyright'>OpenStreetMap</a> Mitwirkende"
        }
    ),
    geolandbasemap : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"], //http://leafletjs.com/reference-1.3.0.html#tilelayer-subdomains
            attribution : "Datenquelle: <a href= 'https://www.basemap.at'>Basemap.at</a>" //http://leafletjs.com/reference-1.3.0.html#control-attribution
        }
    ),
    bmapoverlay : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png",{
            subdomains : ["maps","maps1","maps2","maps3","maps4"],
            attribution : "Datenquelle: <a href= 'https://www.basemap.at'>Basemap.at</a>"
        }
    ),
    bmapgrau : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png",{
            subdomains : ["maps","maps1","maps2","maps3","maps4"],
            attribution : "Datenquelle: <a href= 'https://www.basemap.at'>Basemap.at</a>"
        }
    ),
    bmaphidpi : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg",{
            subdomains : ["maps","maps1","maps2","maps3","maps4"],
            attribution : "Datenquelle: <a href= 'https://www.basemap.at'>Basemap.at</a>"
        }
    ),
    bmaporthofoto30cm : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg",{
            subdomains : ["maps","maps1","maps2","maps3","maps4"],
            attribution : "Datenquelle: <a href= 'https://www.basemap.at'>Basemap.at</a>"
        }
    ),

};

myMap.addLayer(myLayers.geolandbasemap); //http://leafletjs.com/reference-1.3.0.html#map-addlayer

let myMapControl = L.control.layers({ //http://leafletjs.com/reference-1.3.0.html#control-layers
    "Openstreetmap" : myLayers.osm,
    "Basemap" : myLayers.geolandbasemap,    
    "basemap.at grau" : myLayers.bmapgrau,
    "basemap.at hidpi" : myLayers.bmaphidpi,
    "basemap.at Orthofoto" :  myLayers.bmaporthofoto30cm
},{
    "basemap.at Overlay": myLayers.bmapoverlay,
    "Marker": markerGroup



},{
	collapsed: false //http://leafletjs.com/reference-1.3.0.html#control-layers-collapsed
});

myMap.addControl(myMapControl); //http://leafletjs.com/reference-1.3.0.html#map-addcontrol
myMap.setView([47.267,11.383], 11); //http://leafletjs.com/reference-1.3.0.html#map-setview

L.control.scale({ //http://leafletjs.com/reference-1.3.0.html#control-scale
	position: "bottomleft", //http://leafletjs.com/reference-1.3.0.html#control-scale-position
	maxWidth: 200, //http://leafletjs.com/reference-1.3.0.html#control-scale-maxwidth
	metric: true, //http://leafletjs.com/reference-1.3.0.html#control-scale-metric
	imperial: false, //http://leafletjs.com/reference-1.3.0.html#control-scale-imperial
}).addTo(myMap); 

const uni = [47.264, 11.385];
const usi = [47.257, 11.356];
const technik = [47.263, 11.343];
const igls = [47.232025, 11.410990];
const patscherkofel = [47.208611, 11.460556]
const markerOptions = {
    draggable: true,
    opacity: 0.8
}

L.marker(uni,markerOptions).addTo(markerGroup);
L.marker(usi, markerOptions).addTo(markerGroup);
L.marker(technik, markerOptions).addTo(markerGroup);
L.marker(igls, markerOptions).addTo(markerGroup);
L.marker(patscherkofel, markerOptions).addTo(markerGroup).bindPopup("<p>Patscherkofel</p><img style ='width:200px'src ='https://upload.wikimedia.org/wikipedia/commons/2/2b/Luftbild_Patscherkofel.jpg', alt='Patscherkofel'/>").openPopup();

let lift = L.polyline([igls,patscherkofel],{
    color: "red"
});
myMap.addLayer(lift)

let uniPolygon = L.polygon([uni,usi,technik])
myMap.addLayer(uniPolygon)

myMap.fitBounds(markerGroup.getBounds());

