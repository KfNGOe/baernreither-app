//map settings
let mapHash = location.hash; //get hash
let markerFlag = false;
let markerTriggExt;
let markerTriggExtObj;

if (mapHash.length != 0) {
  //hash exists?
  geoID = mapHash.substring(1);
  console.log("geoID = ", geoID);
  markerFlag = true;
}

let map = L.map("map", {
  center: [10.0, 5.0],
  minZoom: 2,
  zoom: 2,
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: ["a", "b", "c"],
}).addTo(map); //add openstreatmaps to leaflet

function setMarker(data) {
  let markerClusters = L.markerClusterGroup();
  for (let marker of data) {
    //generate a html popup for each mark
    if (marker.Lat == undefined || marker.Long == undefined) {
      console.log("Skip marker", marker);
      continue;
    }
    //check if there is a name today
    let markerName;
    if (marker.B == undefined) {
      markerName = marker.A;
    } else {
      //name today
      markerName = marker.B;
    }
    let popup =
      markerName +
      "<br />" +
      "<b>Geo Names Id:</b><br /> " +
      '<div style="margin-left: 10px"><a href="' +
      marker.C +
      '" target="blank">' +
      getGeoNamesId(marker.C) +
      "</a></div>";
    let m = L.marker([marker.Lat, marker.Long], {})
      .bindPopup(popup)
      .on("click", function (e) {
        markerSelected(marker);
      }); //generate a marker and bind popup and select callback to it
    m.getPopup().on("remove", function (e) {
      markerUnselected();
    }); //when a popup is unselected call markerUnselected function

    if (markerFlag == true && getGeoNamesId(marker.C) == geoID) {
      console.log("catch geoID");
      markerTriggExt = marker;
      markerTriggExtObj = L.marker([markerTriggExt.Lat, markerTriggExt.Long], {}).bindPopup(popup); //generate a marker and bind popup and select callback to it ;
    }

    markerClusters.addLayer(m);
  }

  map.addLayer(markerClusters); //add marker cluster to map

  //trigger out of map
  if (markerFlag == true) {
    console.log("fire extern triggered marker");

    markerTriggExtObj.on("click", function (e) {
      markerSelected(markerTriggExt);
    }); //generate a marker and bind popup and select callback to it
    markerTriggExtObj.getPopup().on("remove", function (e) {
      markerUnselected();
    }); //when a popup is unselected call markerUnselected function
    markerTriggExtObj.addTo(map);

    markerTriggExtObj.fire("click");
  }
}

function markerSelected(marker) {
  //is called when a marker is selected

  console.log("marker_key", marker.A);
  $(".toc_map").text(""); //clear the left side

  $(".toc_map#name").text(marker.A); //set the place name in the toc
  $(".toc_map#name_today").text(marker.B); //set the place details in the toc
  $(".toc_map#coordinates_lat").text(marker.Lat); //set the coordinates in the toc
  $(".toc_map#coordinates_long").text(marker.Long); //set the coordinates in the toc
  $(".toc_map#wiki_link").attr('href', marker.Wiki); //set the wiki link in the toc  
}

function markerUnselected() {
  //when a marker is unselected clear the left side
  $(".toc_map").text("");

  if (map.hasLayer(markerTriggExtObj)) {
    console.log("oldmarker = ", markerTriggExtObj);
    map.removeLayer(markerTriggExtObj);
  }
}

function getGeoNamesId(geoNamesUrl) {
  //gets the geonames id out of the url
  let regex = /geonames\.org\/(\d+)\//;
  let match = regex.exec(geoNamesUrl);
  if (match) {
    return match[1];
  }
  return null;
}

function init() {
  //fetch the json
  const path = "./data/json/anno/register/tmp/register_place_geo.json";
  fetch(path).then((response) => {
    response.json().then((data) => {
      setMarker(data.results.bindings);
    });
  });
}

//Call init when the page is loaded
window.addEventListener("load", init);
