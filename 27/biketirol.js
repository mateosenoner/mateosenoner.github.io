/*
    Vorbereitung: GPX Track herunterladen und nach GeoJSON konvertieren
    -------------------------------------------------------------------
    Datenquelle https://www.data.gv.at/suche/?search-term=bike+trail+tirol&searchIn=catalog
    Download Einzeletappen / Zur Ressource ...
    Alle Dateien im unterverzeichnis data/ ablegen
    Die .gpx Datei der eigenen Etappe als etappe00.gpx speichern
    Die .gpx Datei über https://mapbox.github.io/togeojson/ in .geojson umwandeln und als etappe00.geojson speichern
    Die etappe00.geojson Datei in ein Javascript Objekt umwandeln und als etappe00.geojson.js speichern

    -> statt 00 natürlich die eigene Etappe (z.B. 01,02, ...25)
*/

// eine neue Leaflet Karte definieren
let myMap = L.map("map");
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

myMap.addLayer(myLayers.geolandbasemap); //http://leafletjs.com/reference-1.3.0.html#map-addlayer

let myMapControl = L.control.layers({ //http://leafletjs.com/reference-1.3.0.html#control-layers
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

let geojson = L.geoJSON(route).addTo(routeGroup);


myMap.fitBounds(routeGroup.getBounds());

// Grundkartenlayer mit OSM, basemap.at, Elektronische Karte Tirol (Sommer, Winter, Orthophoto jeweils mit Beschriftung) über L.featureGroup([]) definieren
// WMTS URLs siehe https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol

// Maßstab metrisch ohne inch

// Start- und Endpunkte der Route als Marker mit Popup, Namen, Wikipedia Link und passenden Icons für Start/Ziel von https://mapicons.mapsmarker.com/

// GeoJSON Track als Linie in der Karte einzeichnen und auf Ausschnitt zoomen
// Einbauen nicht über async, sondern über ein L.geoJSON() mit einem Javascript Objekt (wie beim ersten Stadtspaziergang Wien Beispiel)

// Baselayer control für OSM, basemap.at, Elektronische Karte Tirol hinzufügen

// Overlay controls zum unabhängigem Ein-/Ausschalten der Route und Marker hinzufügen
