
let myMap = L.map("map",{
    fullscreenControl: true,
});
let markerGroup = L.featureGroup();
let routeGroup= L.featureGroup().addTo(myMap);
myMap.addLayer(markerGroup);

let myLayers = {
    osm : L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        	subdomains : ["a","b","c"],
			attribution : "© <a href= 'https://www.openstreetmap.org/copyright'>OpenStreetMap</a> Mitwirkende"
        }
    ),
    geolandbasemap : L.tileLayer(
        "https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains : ["maps","maps1","maps2","maps3","maps4"], 
            attribution : "Datenquelle: <a href= 'https://www.basemap.at'>Basemap.at</a>" 
        }
    ),
    sommer : L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_base_summer/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80",{
            attribution : "Datenquelle: <a href='https://www.kartetirol.at'>kartetirol.at</a>"
        }
    ),
    winter : L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_base_winter/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80",{
            attribution : "Datenquelle: <a href='https://www.kartetirol.at'>kartetirol.at</a>"
        }
	),
    ortho : L.tileLayer(
        "http://wmts.kartetirol.at/wmts/gdi_ortho/GoogleMapsCompatible/{z}/{x}/{y}.jpeg80",{
            attribution : "Datenquelle: <a href='https://www.kartetirol.at'>kartetirol.at</a>"
        }
	),
};

myMap.addLayer(myLayers.geolandbasemap);

let myMapControl = L.control.layers({
    "Openstreetmap" : myLayers.osm,
    "Basemap" : myLayers.geolandbasemap,
	"Sommerkarte" : myLayers.sommer,
	"Winterkarte" : myLayers.winter,   
	"Orthofoto" : myLayers.ortho          
},{  
    "Start-Ziel" : markerGroup,
	"Route" : routeGroup
},{
	collapsed: false 
});

myMap.addControl(myMapControl); 
myMap.setView([47.224541,10.749633], 11); 


var start = L.icon({
    iconUrl: 'start-race-2.png',
});

var finish = L.icon({
    iconUrl: 'finish.png',
});

L.marker([47.224541, 10.749633],{icon: start}).addTo(markerGroup).bindPopup("<p><strong>Start: Imst</strong></p><a href=https://de.wikipedia.org/wiki/Imst>Link zur Stadt</a>")
L.marker([47.167189, 10.730059],{icon: finish}).addTo(markerGroup).bindPopup("<p><strong>Ziel: Wenns</strong></p><a href=https://de.wikipedia.org/wiki/Wenns>Link zur Stadt</a>")

L.control.scale({ 
	position: "bottomleft", 
	maxWidth: 200, 
	metric: true, 
	imperial: false, 
}).addTo(myMap); 

//let geojson = L.geoJSON(route).addTo(routeGroup);
//myMap.fitBounds(routeGroup.getBounds());

let gpxTrack = new L.GPX("data/etappe27.gpx", {
      async : true,
     }).addTo(routeGroup);

gpxTrack.on("loaded", function(evt) {
    console.log("Name: "+evt.target.get_name())
    console.log("Länge: "+evt.target.get_distance().toFixed(0))
    console.log("Minimale Höhe: "+evt.target.get_elevation_min().toFixed(0))
    console.log("Maximale Höhe: " +evt.target.get_elevation_max().toFixed(0))
    console.log("Elevation Loss: " +evt.target.get_elevation_loss().toFixed(0))
    console.log("Elevation gain: " +evt.target.get_elevation_gain().toFixed(0))
    let laenge = evt.target.get_distance().toFixed(0)
    document.getElementById("laenge").innerHTML=laenge;
    
    myMap.fitBounds(evt.target.getBounds());
});

