
let myMap = L.map("map",{
    fullscreenControl: true,
});
let markerGroup = L.featureGroup().addTo(myMap);
let routeGroup= L.featureGroup().addTo(myMap);
let overlaySteigung= L.featureGroup().addTo(myMap)


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
	nomenklatur: L.tileLayer(
	        "http://wmts.kartetirol.at/wmts/gdi_nomenklatur/GoogleMapsCompatible/{z}/{x}/{y}.png8", {
	            attribution: "Datenquelle: <a href='https://www.data.gv.at/katalog/dataset/land-tirol_elektronischekartetirol'>eKarte Tirol</a>",
	            pane: "overlayPane",
	        }
	    ),
};

// Layergruppen für die Elektronische Karte Tirol definieren
const tirisSommer = L.layerGroup([
    myLayers.sommer,
    myLayers.nomenklatur
]);
const tirisWinter = L.layerGroup([
    myLayers.winter,
    myLayers.nomenklatur
]);
const tirisOrtho = L.layerGroup([
    myLayers.ortho,
    myLayers.nomenklatur
]);

// Map control mit Grundkarten und GeoJSON Overlay definieren
let kartenAuswahl = L.control.layers({
    "Openstreetmap": myLayers.osm,
    "basemap.at Grundkarte": myLayers.geolandbasemap,
    "Elektronische Karte Tirol - Sommer" : tirisSommer,
    "Elektronische Karte Tirol - Winter" : tirisWinter,
    "Elektronische Karte Tirol - Orthophoto" : tirisOrtho,
}, {
    //"GPS-Track": routeGroup,
    "Start / Ziel": markerGroup,
    "Steigungslinie" : overlaySteigung,
},{
	collapsed : false
});

myMap.addControl(kartenAuswahl);
myMap.addLayer(tirisSommer);
myMap.setView([47.224541,10.749633], 11); 


var start = L.icon({
    iconUrl: 'start-race-2.png',
 	iconAnchor : [16,37],
    popupAnchor : [0,-37],
});

var finish = L.icon({
    iconUrl: 'finish.png',
 	iconAnchor : [16,37],
    popupAnchor : [0,-37],
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

//Höhenprofil-control
let hoehenProfil = L.control.elevation({
    position: "topright",
    theme : "steelblue-theme",
    collapsed : true,
}).addTo(myMap)



//gpx-Track
let gpxTrack = new L.GPX("data/etappe27.gpx", {
      async : true,
     })//.addTo(routeGroup);

gpxTrack.on("loaded", function(evt) {
    console.log("Name: "+evt.target.get_name())
    console.log("Länge: "+evt.target.get_distance().toFixed(0))
    console.log("Minimale Höhe: "+evt.target.get_elevation_min().toFixed(0))
    console.log("Maximale Höhe: " +evt.target.get_elevation_max().toFixed(0))
    console.log("Elevation Loss: " +evt.target.get_elevation_loss().toFixed(0))
    console.log("Elevation gain: " +evt.target.get_elevation_gain().toFixed(0))
    let laenge = evt.target.get_distance().toFixed(0)
	let tiefsterPunkt = evt.target.get_elevation_min().toFixed(0)
	let hoechsterPunkt = evt.target.get_elevation_max().toFixed(0)
	let aufstieg = evt.target.get_elevation_gain().toFixed(0)
	let abstieg = evt.target.get_elevation_loss().toFixed(0)
    document.getElementById("laenge").innerHTML=laenge;
	document.getElementById("tiefsterPunkt").innerHTML=tiefsterPunkt;
	document.getElementById("hoechsterPunkt").innerHTML=hoechsterPunkt;
	document.getElementById("aufstieg").innerHTML=aufstieg;
	document.getElementById("abstieg").innerHTML=abstieg;
    
    myMap.fitBounds(evt.target.getBounds());
});

gpxTrack.on("addline",function(evt){
    hoehenProfil.addData(evt.line);
    //console.log(evt.line);
    //console.log(evt.line.getLatLngs());
    //console.log(evt.line.getLatLngs()[0]);
    //console.log(evt.line.getLatLngs()[0].lat);
    //console.log(evt.line.getLatLngs()[0].lng);
    //console.log(evt.line.getLatLngs()[0].meta);
    //console.log(evt.line.getLatLngs()[0].meta.ele);

    //alle Segmente der Steigungslinie hinzufügen
    let gpxLinie = evt.line.getLatLngs();
    for(let i=1; i < gpxLinie.length; i++){
        let p1 = gpxLinie[i-1];
        let p2 = gpxLinie[i];
        //console.log(p1.lat,p1.lng,p2.lat,p2.lng)

        //Entfernung zwischen den Punkten berechnen

        let dist=myMap.distance(
            [p1.lat,p1.lng],
            [p2.lat,p2.lng]
            );
        
        
        //Höhenunterschied berechnen
        let delta= p2.meta.ele - p1.meta.ele;
        
        //Steigung in Prozent berechnen
        
        let proz = (dist > 0) ? (delta/dist*100.0).toFixed(1) : 0;
        //Bedingung ? Ausdruck1 : Ausdruck2
        console.log(p1.lat,p1.lng,p2.lat,p2.lng, dist,delta,proz)
        
        //Linie zeichnen
        //Farben:
            //grün: http://colorbrewer2.org/#type=sequential&scheme=Greens&n=6
            //rot: http://colorbrewer2.org/#type=sequential&scheme=Reds&n=6
        let farbe = 
            proz > 10  ? "#a50f15" :
            proz > 6   ? "#de2d26" :
            proz > 2   ? "#fb6a4a" :
            proz > 0   ? "#a1d99b" :
            proz > -2  ? "#74c476" :
            proz > -6  ? "#c7e9c0" :
            proz > -10 ? "#31a354" :
                     "#006d2c";
        
                     let segment = L.polyline(
           [
                [p1.lat,p1.lng],
                [p2.lat,p2.lng]
           ],{
                 color: farbe,
                 weight : 6,
                 
            }
        ).addTo(overlaySteigung);
    
    }
});