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

//wait for load
$(document).ready(function () {
  setMarker(mapData); //set the markers
});

function setMarker(data) {
  let markerClusters = L.markerClusterGroup();
  for (let marker of data.results) {
    //generate a html popup for each mark
    if (marker.Lat == undefined || marker.Long == undefined) {
      console.log("Skip marker", marker);
      continue;
    }
    let popup =
      marker.B +
      "<br />" +
      "<b>Geo Names Id:</b><br /> " +
      '<div style="margin-left: 10px"><a href="' +
      marker.E +
      '" target="blank">' +
      getGeoNamesId(marker.E) +
      "</a></div>";
    let m = L.marker([marker.Lat, marker.Long], {})
      .bindPopup(popup)
      .on("click", function (e) {
        markerSelected(marker);
      }); //generate a marker and bind popup and select callback to it
    m.getPopup().on("remove", function (e) {
      markerUnselected();
    }); //when a popup is unselected call markerUnselected function

    if (markerFlag == true && getGeoNamesId(marker.E) == geoID) {
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

  console.log("marker_key", marker.B);
  $(".toc_map").text(""); //clear the left side

  $(".toc_map#name").text(marker.B); //set the place name in the toc
  $(".toc_map#name_full").text(marker.D); //set the place details in the toc
  $(".toc_map#coordinates_lat").text(marker.Lat); //set the coordinates in the toc
  $(".toc_map#coordinates_long").text(marker.Long); //set the coordinates in the toc
  $(".toc_map#writings").text(marker.A);
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

mapData = {
  head: {
    vars: ["A", "B", "C", "D", "E", "Lemma_gn", "Lat", "Long"],
  },
  results: [
    {
      A: "Zagreb",
      B: "Agram",
      D: "Hauptstadt von Kroatien (Rep. Kroatien/Rep. Hrvatska)",
      E: "https://www.geonames.org/3186886/zagreb.html",
      Lemma_gn: "Zagreb",
      Lat: "45.81444",
      Long: "15.97798",
    },
    {
      A: "Vereinigte Staaten von Amerika",
      B: "Amerika",
      D: "Vereinigte Staaten von Amerika",
      E: "https://www.geonames.org/6252001/united-states.html",
      Lemma_gn: "United States",
      Lat: "39.76",
      Long: "-98.5",
    },
    {
      B: "BadIschl",
      C: "Ischl",
      D: "Kurort im Bezirk Gmunden (Rep. Österreich)",
      E: "https://www.geonames.org/2782052/bad-ischl.html",
      Lemma_gn: "Bad Ischl",
      Lat: "47.71109",
      Long: "13.61893",
    },
    {
      B: "Belgien",
      D: "Königreich Belgien",
      E: "https://www.geonames.org/2802361/kingdom-of-belgium.html",
      Lemma_gn: "Belgium",
      Lat: "50.75",
      Long: "4.5",
    },
    {
      B: "Berlin",
      D: "Hauptstadt des Deutschen Kaiserreiches (Bundesrep. Deutschland)",
      E: "https://www.geonames.org/6547383/berlin-stadt.html",
      Lemma_gn: "Berlin, Stadt",
      Lat: "52.5233",
      Long: "13.41377",
    },
    {
      A: "Bielsko-Biała",
      B: "Biala",
      C: "Biala",
      D: "Bezirkshauptstadt im Kronland Galizien (Rep. Polen/Rzeczpospolita Polskaa)",
      E: "https://www.geonames.org/3103402/bielsko-biala.html",
      Lemma_gn: "Bielsko-Biala",
      Lat: "49.82245",
      Long: "19.04686",
    },
    {
      A: "Čechy",
      B: "Boehmen",
      D: "Österr. Kronland Königreich Böhmen (Rep. Tschechien/Česká rep.)",
      E: "https://www.geonames.org/3078198/cechy.html",
      Lemma_gn: "Bohemia",
      Lat: "50",
      Long: "14.5",
    },
    {
      A: "Böhmen",
    },
    {
      A: "Bosna;Босна",
      B: "Bosnien",
      D: "1878 okkupiertes u. 1908 annektiertes Land d. Habsburger Monarchie (Rep. Bosnien-Herzegowina/Rep. Bosna i Hercegovina)",
      E: "https://www.geonames.org/3277605/bosnia-and-herzegovina.html",
      Lemma_gn: "Bosnia and Herzegovina",
      Lat: "44.25",
      Long: "17.83333",
    },
    {
      A: "Bolzano",
      B: "Bozen",
      D: "Hauptstadt von Südtirol (Rep. Italien/Rep. Italia)",
      E: "https://www.geonames.org/6535953/bolzano-bozen.html",
      Lemma_gn: "Bolzano/Bozen",
      Lat: "46.49272",
      Long: "11.33358",
    },
    {
      A: "Brno",
      B: "Bruenn",
      D: "Hauptstadt des österr. Kronlandes Markgrafschaft Mähren (Rep. Tschechien/Česká rep.)",
      E: "https://www.geonames.org/3078609/mesto-brno.html",
      Lemma_gn: "Město Brno",
      Lat: "49.19954",
      Long: "16.60755",
    },
    {
      A: "Most",
      B: "Bruex",
      D: "Bezirkshauptstadt in Nordböhmen (Rep. Tschechien/Česká rep.)",
      E: "https://www.geonames.org/11922564/most.html",
      Lemma_gn: "Most",
      Lat: "50.5151",
      Long: "13.61584",
    },
    {
      A: "Budapest",
      B: "Budapest",
      D: "Hauptstadt des Königreichs Ungarn (Rep. Ungarn/Magyarország)",
      E: "https://www.geonames.org/3054638/budapest.html",
      Lemma_gn: "Budapest",
      Lat: "47.5",
      Long: "19.08333",
    },
    {
      A: "České Budějovice",
      B: "Budweis",
      D: "Kreishauptstadt in Südböhmen (Rep. Tschechien/Česká rep.)",
      E: "https://www.geonames.org/11920790/ceske-budejovice.html",
      Lemma_gn: "České Budějovice",
      Lat: "48.98111",
      Long: "14.48113",
    },
    {
      A: "Celje",
      B: "Cilli",
      D: "Stadt in Untersteiermark/Štajerska (Rep. Slowenien/Rep. Slovenija)",
      E: "https://www.geonames.org/3202780/celje.html",
      Lemma_gn: "Celje",
      Lat: "46.25",
      Long: "15.27028",
    },
    {
      A: "Dalmacija",
      B: "Dalmatien",
      D: "Österr. Kronland Dalmatien (Rep. Kroatien/rep. Hrvatska u. Rep. Montenegro/rep. Crna Gora)",
      E: "https://www.geonames.org/3202210/dalmatia.html",
      Lemma_gn: "Dalmatia",
      Lat: "43",
      Long: "17",
    },
    {
      B: "Deutschboehmen",
      D: "Deutschsprachige Gebiete in Nordböhmen (Rep. Tschechien/Česká rep.)",
      E: "https://d-nb.info/gnd/4058386-7",
    },
    {
      A: "Deutsches Reich",
      B: "Deutschland",
      D: "Deutsches Kaiserreich (Bundesrep. Deutschland)",
      E: "https://d-nb.info/gnd/7509421-6",
    },
    {
      A: "Cheb",
      B: "Eger",
      D: "Bezirkshauptstadt in Westböhmen (Rep. Tschechien/Česká rep.)",
      E: "https://www.geonames.org/11926248/cheb.html",
      Lemma_gn: "Cheb",
      Lat: "50.07122",
      Long: "12.37963",
    },
    {
      A: "Mnichov",
      B: "Einsiedl",
      D: "Gemeinde im Bezirk Eger/Okres Cheb (Rep. Tschechien/Česká rep.)",
      E: "https://www.geonames.org/11921999/mnichov.html",
      Lemma_gn: "Mnichov",
      Lat: "50.02222",
      Long: "12.76266",
    },
    {
      A: "Úpice",
      B: "Eipel",
      D: "Gemeinde im Bezirk Trautenau/Okres Trutnov (Rep. Tschechien/Česká rep.)",
      E: "https://www.geonames.org/11926030/mnichov.html",
      Lemma_gn: "Mnichov",
      Lat: "49.30709",
      Long: "13.82406",
    },
    {
      B: "England",
      D: "Landesteil des Vereinten Königreichs Großbritannien",
      E: "https://www.geonames.org/2635167/united-kingdom-of-great-britain-and-northern-ireland.html",
      Lemma_gn: "United Kingdom",
      Lat: "54.75844",
      Long: "-2.69531",
    },
    {
      A: "Rijeka",
      B: "Fiume",
      D: "Hafenstadt in Kroatien (Rep. Kroatien/rep. Hrvatska)",
      E: "https://www.geonames.org/3191647/grad-rijeka.html",
      Lemma_gn: "Town of Rijeka",
      Lat: "45.32693",
      Long: "14.43758",
    },
    {
      B: "Floridsdorf",
      D: "Niederösterr. Gemeinde, ab 1904 21. Wiener Gemeindebezirk",
      E: "https://www.geonames.org/2779467/gemeindebezirk-floridsdorf.html",
      Lemma_gn: "Gemeindebezirk Floridsdorf",
      Lat: "48.25",
      Long: "16.39972",
    },
    {
      B: "Galizien",
      D: "Österr. Kronland (Rep. Ukraine/Україна u. Rep. Polen/Rzeczpospolita Polska)",
      E: "https://www.geonames.org/562153/galicia.html",
      Lemma_gn: "Galicia",
      Lat: "49.5",
      Long: "23",
    },
    {
      A: "Gorizia",
      B: "Goerz",
      D: "Hauptstadt d. Kronlandes Gefürstete Grafschaft Görz und Gradisca (Rep. Italien/Rep. Italia)",
      E: "https://www.geonames.org/3175986/gorizia.html",
      Lemma_gn: "Gorizia",
      Lat: "45.94088",
      Long: "13.62167",
    },
    {
      B: "Graz",
      D: "Hauptstadt von Steiermark (Rep. Österreich)",
      E: "https://www.geonames.org/2778058/graz-stadt.html",
      Lemma_gn: "Graz Stadt",
      Lat: "47.06667",
      Long: "15.43333",
    },
    {
      B: "Heidelberg",
      D: "Stadt im Großherzogtum Baden (Bundesrep. Deutschland)",
      E: "https://www.geonames.org/2907911/heidelberg.html",
      Lemma_gn: "Heidelberg",
      Lat: "49.40768",
      Long: "8.69079",
    },
    {
      B: "Helgoland",
      D: "Nordseeinsel in der Deutschen Bucht (Bundesrep. Deutschland)",
      E: "https://www.geonames.org/2906947/helgoland.html",
      Lemma_gn: "Heligoland",
      Lat: "54.18213",
      Long: "7.88458",
    },
    {
      B: "Herzegowina",
      D: "1878 okkupiertes u. 1908 annektiertes Land d. Habsburger Monarchie (Rep. Bosnien-Herzegowina/Rep. Bosna i Hercegovina)",
      E: "https://www.geonames.org/3277605/bosnia-and-herzegovina.html",
      Lemma_gn: "Bosnia and Herzegovina",
      Lat: "44.25",
      Long: "17.83333",
    },
    {
      B: "Innsbruck",
      D: "Hauptstadt von Tirol (Rep. Österreich)",
      E: "https://www.geonames.org/2775220/innsbruck.html",
      Lemma_gn: "Innsbruck",
      Lat: "47.26266",
      Long: "11.39454",
    },
    {
      A: "Istrien",
      B: "Istrien",
      E: "https://www.geonames.org/3337514/istria.html",
      Lemma_gn: "Istria",
      Lat: "45.25",
      Long: "13.91667",
    },
    {
      B: "Italien",
      D: "Königreich Italien (Rep. Italia)",
      E: "https://www.geonames.org/3175395/italian-republic.html",
      Lemma_gn: "Italy",
      Lat: "42.83333",
      Long: "12.83333",
    },
    {
      B: "Kärnten",
      D: "Österr. Kronland Herzogtum Kärnten (Rep. Österreich)",
      E: "https://www.geonames.org/2774686/kaernten.html",
      Lemma_gn: "Carinthia",
      Lat: "46.75",
      Long: "13.83333",
    },
    {
      A: "Karlovy Vary",
      B: "Karlsbad",
      C: "Carlsbad",
      D: "Kurort in Westböhmen (Rep. Tschechien/Česká rep.)",
      E: "https://www.geonames.org/3073803/karlovy-vary.html",
      Lemma_gn: "Karlovy Vary",
      Lat: "50.23271",
      Long: "12.87117",
    },
    {
      B: "Knin",
      D: "Stadt im österr. Kronland Dalmatien (Rep. Kroatien/Rep. Hrvatska)",
      E: "https://www.geonames.org/3197986/knin.html",
      Lemma_gn: "Knin",
      Lat: "44.04063",
      Long: "16.19662",
    },
    {
      A: "Kynšperk nad Ohří",
      B: "Koenigsberg",
      D: "Stadt im Bezirk Falkenau/Okres Sokolov (Rep. Tschechien/Česká rep.)",
      E: "https://www.geonames.org/11921844/kynsperk-nad-ohri.html",
      Lemma_gn: "Kynšperk nad Ohří",
      Lat: "50.11601",
      Long: "12.53794",
    },
    {
      A: "Lázně Kynžvart",
      B: "Koenigswart",
      D: "Kurstadt im Bezirk Eger/Okres Cheb (Rep. Tschechien/Česká rep.)",
      E: "https://www.geonames.org/3072265/lazne-kynzvart.html",
      Lemma_gn: "Lázně Kynžvart",
      Lat: "50.01058",
      Long: "12.62474",
    },
    {
      A: "Kranjska",
      B: "Krain",
      D: "Österr. Kronland Herzogtum Krain  (Rep. Slowenien/Rep. Slovenija)",
      E: "https://www.geonames.org/3197905/kokra.html",
      Lemma_gn: "Kokra",
      Lat: "46.23792",
      Long: "14.35707",
    },
    {
      A: "Hrvatska",
      B: "Kroatien",
      D: "Ungar. Königreich Kroatien (Rep. Hrvatska)",
      E: "https://www.geonames.org/3202326/republic-of-croatia.html",
      Lemma_gn: "Croatia",
      Lat: "45.16667",
      Long: "15.5",
    },
    {
      B: "Kuestenlaender",
      D: "Österr. Kronländer Istrien, Görz, Triest (Rep. Italien, Rep. Italia, Rep. Slowenien/Rep. Slovenija, Rep. Kroatien/Rep. Hrvatska)",
    },
    {
      A: "Ljublijana",
      B: "Laibach",
      D: "Hauptstadt des österr. Kronlandes Slowenien (Rep. Slowenien/Rep. Slovenija)",
      E: "https://www.geonames.org/3239318/mestna-obcina-ljubljana.html",
      Lemma_gn: "Ljubljana",
      Lat: "46.05918",
      Long: "14.50916",
    },
    {
      A: "Lwiw, Lwów",
      B: "Lemberg",
      D: "Hauptstadt d. österr. Königreichs Galizien u. Lodomerien (Rep. Ukraine/Україна)",
      E: "https://www.geonames.org/702550/lviv.html",
      Lemma_gn: "Lviv",
      Lat: "49.83826",
      Long: "24.02324",
    },
    {
      B: "Liverpool",
      D: "Stadt in Großbritannien",
      E: "https://www.geonames.org/3333167/liverpool.html",
      Lemma_gn: "Liverpool",
      Lat: "53.41667",
      Long: "-2.91667",
    },
    {
      A: "Mlynce",
      B: "Luenz",
      D: "Dorf nahe d. Stadt  Rudig/Vroutek, Bezirk Laun/Okres Louny (Rep. Tschechien/Česká rep.)",
      E: "https://www.geonames.org/3070490/mlynce.html",
      Lemma_gn: "Mlýnce",
      Lat: "50.1604",
      Long: "13.31646",
    },
    {
      A: "Morava",
      B: "Maehren",
      D: "Österr. Kronland (Rep. Tschechien/Česká rep.)",
      E: "https://www.geonames.org/3070359/moravia.html",
      Lemma_gn: "Moravia",
      Lat: "49.5",
      Long: "17",
    },
    {
      A: "Mariánské Lázně",
      B: "Marienbad",
      D: "Kurstadt im Bezirk Eger/Okres Cheb (Rep. Tschechien/Česká rep.)",
      E: "https://www.geonames.org/3071024/marianske-lazne.html",
      Lemma_gn: "Mariánské Lázně",
      Lat: "49.96459",
      Long: "12.70118",
    },
    {
      A: "Merano",
      B: "Meran",
      D: "Kurort in Südtirol (Rep. Italien, Rep. Italia)",
      E: "https://www.geonames.org/3173577/merano.html",
      Lemma_gn: "Meran",
      Lat: "46.66817",
      Long: "11.15953",
    },
    {
      A: "Międzyzdroje",
      B: "Misdroy",
      D: "Badeort auf der Ostseeinsel Wollin/Wolin im Königreich Preußen (Rep. Polen/Rzeczpospolita Polska)",
    },
    {
      B: "Muenchen",
      D: "Hauptstadt d. Königreichs Bayern (Bundesrep. Deutschland)",
      E: "https://www.geonames.org/6559171/muenchen-landeshauptstadt.html",
      Lemma_gn: "Munich",
      Lat: "48.13452",
      Long: "11.571",
    },
    {
      A: "Újpest",
      B: "Neupest",
      D: "4. Bezirk v. Budapest (Rep. Ungarn/Magyarország)",
    },
    {
      A: "New York City",
      B: "NewYork",
      D: "Hauptstadt d. Bundesstaates New York (Vereinigte Staaten v. Amerika/United States of America)",
      E: "https://www.geonames.org/5128638/new-york.html",
      Lemma_gn: "New York",
      Lat: "43.00035",
      Long: "-75.4999",
    },
    {
      B: "Norderney",
      D: "Ostfriesische Nordseeinsel (Bundesrep. Deutschland)",
      E: "https://www.geonames.org/6557460/norderney.html",
      Lemma_gn: "Norderney",
      Lat: "53.7072",
      Long: "7.14695",
    },
    {
      B: "NoviGrad",
      D: "Gemeinde im Nordwesten von Bosnien und Herzegowina (Rep. Bosnien-Herzegowina/Rep. Bosna i Hercegovina)",
    },
    {
      B: "Nymphenburg",
      D: "Stadtteil von München (Bundesrep. Deutschland)",
      E: "https://www.geonames.org/2861525/nymphenburg.html",
      Lemma_gn: "Nymphenburg",
      Lat: "48.15853",
      Long: "11.49857",
    },
    {
      A: "Buda",
      B: "Ofen",
      D: "Westl. d. Donau gelegener Stadtteil Budapests (Rep. Ungarn/Magyarország)",
      E: "https://www.geonames.org/3054667/buda.html",
      Lemma_gn: "Buda",
      Lat: "47.5",
      Long: "19.03333",
    },
    {
      A: "Österreich",
      B: "Oesterreich",
      E: "https://www.geonames.org/2782113/republic-of-austria.html",
      Lemma_gn: "Austria",
      Lat: "47.33333",
      Long: "13.33333",
    },
    {
      A: "Olomouc",
      B: "Olmuetz",
      D: "Mährische Bezirks- u. Kreisstadt (Rep. Tschechien/Česká rep.)",
    },
    {
      B: "Ostschlesien",
      D: "Herzogtum Teschen (Rep. Tschechien/Česká rep., Rep. Polen/Rzeczpospolita Polska)",
    },
    {
      A: "Bečov nad Teplou",
      B: "Petschau",
      D: "Stadt im Bezirk Karlsbad/Okres Karlovy Vary (Rep. Tschechien/Česká rep.)",
      E: "https://www.geonames.org/3079609/becov-nad-teplou.html",
      Lemma_gn: "Bečov nad Teplou",
      Lat: "50.08345",
      Long: "12.83831",
    },
    {
      A: "Plzeň",
      B: "Pilsen",
      D: "Westböhm. Industriestadt (Rep. Tschechien/Česká rep.)",
      E: "https://www.geonames.org/3068160/pilsen.html",
      Lemma_gn: "Pilsen",
      Lat: "49.74747",
      Long: "13.37759",
    },
    {
      A: "Podbořany",
      B: "Podersam",
      D: "Stadt im Bezirk Laun/Okres Louny (Rep. Tschechien/Česká rep.)",
      E: "https://www.geonames.org/3068119/podborany.html",
      Lemma_gn: "Podbořany",
      Lat: "50.22937",
      Long: "13.41192",
    },
    {
      A: "Ostrava",
      B: "Ostrava",
      D: "Stadt im österr. Kronland Herzogtum Schlesien (Rep. Tschechien/Česká rep.)",
      E: "https://www.geonames.org/11921098/ostrava.html",
      Lemma_gn: "Ostrava",
      Lat: "49.8147",
      Long: "18.24781",
    },
    {
      B: "Paris",
      D: "Hauptstadt d. Rep. Frankreich",
      E: "https://www.geonames.org/2988507/paris.html",
      Lemma_gn: "Paris",
      Lat: "48.85341",
      Long: "2.3488",
    },
    {
      A: "Praha",
      B: "Prag",
      D: "Hauptstadt d. Königreichs Böhmen (Rep. Tschechien/Česká rep.)",
      E: "https://www.geonames.org/3067696/prague.html",
      Lemma_gn: "Prague",
      Lat: "50.08804",
      Long: "14.42076",
    },
    {
      B: "Österreich",
      D: "Im österr. Reichsrat vertretenen Königreiche und Länder (Cisleithanien)",
    },
    {
      A: "Rákospalota",
      B: "RakosPalota",
      D: "Vorort, heute Stadtteil von Budapest",
    },
    {
      A: "Liberec",
      B: "Reichenberg",
      D: "Nordböhm. Industriestadt (Rep. Tschechien/Česká rep.)",
      E: "https://www.geonames.org/11924204/liberec.html",
      Lemma_gn: "Liberec",
      Lat: "50.76552",
      Long: "15.05351",
    },
    {
      B: "Rovereto",
      D: "Stadt im Trentino (Rep. Italien/Rep. Italia)",
      E: "https://www.geonames.org/6539916/rovereto.html",
      Lemma_gn: "Rovereto",
      Lat: "45.8896",
      Long: "11.03868",
    },
    {
      B: "Russland",
      D: "Kaiserreich Russland",
      E: "https://www.geonames.org/2017370/russian-federation.html",
      Lemma_gn: "Russia",
      Lat: "60",
      Long: "100",
    },
    {
      A: "Žatec",
      B: "Saaz",
      D: "Stadt im Bezirk Laun/Okres Louny (Rep. Tschechien/Česká rep.)",
      E: "https://www.geonames.org/3061822/zatec.html",
      Lemma_gn: "Žatec",
      Lat: "50.32717",
      Long: "13.54577",
    },
    {
      A: "Prameny",
      B: "Sangerberg",
      D: "Gemeinde im Bezirk Eger/Okres Cheb (Rep. Tschechien/Česká rep.)",
      E: "https://www.geonames.org/3067688/prameny.html",
      Lemma_gn: "Prameny",
      Lat: "50.05007",
      Long: "12.73279",
    },
    {
      B: "Schlesien",
      D: "Kronland Herzogtum Schlesien (Rep. Tschechien/Česká rep., Rep. Polen/Rzeczpospolita Polska)",
      E: "https://www.geonames.org/11748058/silesian-metropolis.html",
      Lemma_gn: "Silesian Metropolis",
      Lat: "50.25423",
      Long: "19.13818",
    },
    {
      B: "StarnbergerSee",
      D: "See in Bayern",
      E: "https://www.geonames.org/2829454/starnberger-see.html",
      Lemma_gn: "Lake Starnberg",
      Lat: "47.90348",
      Long: "11.31187",
    },
    {
      A: "Steiermark",
      B: "Steiermark",
      D: "Österr. Kronland Herzogtum Steiermark (Rep. Österreich, Rep. Slowenien/Rep. Slovenija)",
      E: "https://www.geonames.org/2764581/steiermark.html",
      Lemma_gn: "Styria",
      Lat: "47.25",
      Long: "15.16667",
    },
    {
      A: "Timișoara",
      B: "Temesvar",
      C: "Temesvar",
      D: "Hauptstadt des ungar. Temeser Banats (Rep. Rumänien/Rep. România)",
      E: "https://www.geonames.org/665087/timisoara.html",
      Lemma_gn: "Timișoara",
      Lat: "45.75372",
      Long: "21.22571",
    },
    {
      A: "Teplá",
      B: "Tepl",
      D: "Stadt im Bezirk Eger/Okres Cheb (Rep. Tschechien/Česká rep.)",
    },
    {
      A: "Těšín, Cieszyn",
      B: "Teschen",
      D: "Stadt im Kronland Österr.-Schlesien (Rep. Tschechien/Česká rep. u.",
      E: "https://www.geonames.org/7532301/cieszyn.html",
      Lemma_gn: "Cieszyn",
      Lat: "49.74922",
      Long: "18.63178",
    },
    {
      A: "Terézváros",
      B: "Theresienstadt",
      D: "6. Bezirk von Budapest (Rep. Ungarn/Magyarország)",
    },
    {
      B: "Tirol",
      D: "Österr. Kronland Gefürstete Grafschaft Tirol (Rep. Österreich, Rep. Italien/Rep. Italia)",
      E: "https://www.geonames.org/2763586/tirol.html",
      Lemma_gn: "Tyrol",
      Lat: "47.25",
      Long: "11.33333",
    },
    {
      A: "Trutnov",
      B: "Trautenau",
      D: "Bezirkshauptstadt in Nordböhmen (Rep. Tschechien/Česká rep.)",
      E: "https://www.geonames.org/3063907/trutnov.html",
      Lemma_gn: "Trutnov",
      Lat: "50.56101",
      Long: "15.9127",
    },
    {
      B: "Trentino",
      D: "Teil d. österr. Kronlandes Gefürstete Grafschaft Tirol (Rep. Italien/Rep. Italia)",
      E: "https://www.geonames.org/3165241/provincia-autonoma-di-trento.html",
      Lemma_gn: "Province of Trente",
      Lat: "46.06966",
      Long: "11.12177",
    },
    {
      A: "Triest",
      B: "Triest",
      D: "Reichsunmittelbare Stadt u. Sitz des Statthalters für die österr. Küstenländer (Rep. Italien/Rep. Italia)",
      E: "https://www.geonames.org/3165185/trieste.html",
      Lemma_gn: "Trieste",
      Lat: "45.64953",
      Long: "13.77678",
    },
    {
      A: "Opava",
      B: "Troppau",
      D: "Hauptstadt d. österr. Kronlandes Herzogtum Ober- und Niederschlesien (Rep. Tschechien/Česká rep.)",
      E: "https://www.geonames.org/11920184/opava.html",
      Lemma_gn: "Opava",
      Lat: "49.93612",
      Long: "17.90441",
    },
    {
      A: "Ungarn",
      B: "Ungarn",
      D: "Länder der Heiligen Ungarischen Stephanskrone, Transleithanien (Rep. Ungarn/Magyarország)",
      E: "https://www.geonames.org/719819/hungary.html",
      Lemma_gn: "Hungary",
      Lat: "47",
      Long: "20",
    },
    {
      A: "Štajerska",
      B: "Untersteiermark",
      C: "Südsteiermark",
      D: "Teil d. Österr. Kronlandes Herzogtum Steiermark (Rep. Slowenien/Rep. Slovenija)",
    },
    {
      B: "Wien",
      D: "Hauptstadt der Österreichisch-Ungarischen Monarchie (Rep. Österreich)",
      E: "https://www.geonames.org/2761369/vienna.html",
      Lemma_gn: "Vienna",
      Lat: "48.20849",
      Long: "16.37208",
    },
    {
      A: "Vinaře",
      B: "Winar",
      D: "Gut d. Fideikommissbesitzes d. Grafen Czernin in Böhmen",
    },
    {
      A: "Woerth",
      B: "Woerth",
      D: "Gemeinde im Elsass (Rep. Frankreich)",
      E: "https://www.geonames.org/2967305/woerth.html",
      Lemma_gn: "Wœrth",
      Lat: "48.3892",
      Long: "7.63498",
    },
    {
      A: "Zadar",
      B: "Zara",
      D: "Hauptstadt d. österr. Kronlandes Dalmatien (Rep. Kroatien/Rep. Hrvatska)",
      E: "https://www.geonames.org/11055010/zadar.html",
      Lemma_gn: "Town of Zadar",
      Lat: "44.12172",
      Long: "15.23018",
    },
  ],
};