

var map = L.map('service_map_embed').setView([33.22931341724211, -97.13338591576182], 11.5);
var popup = L.popup();
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var service_area = L.polygon([
  [33.25907207872833, -97.17599208789082],
  [33.26234880003977, -97.14490403342941],
  [33.26431477382819, -97.13419302306876],
  [33.26180268835676, -97.107154253012],
  [33.24967812980584, -97.0857322322907],
  [33.196463115778684, -97.08873653984786],
  [33.17831672051729, -97.10375807880894],
  [33.207830025231736, -97.17076720482437],
  [33.23777039464443, -97.18409065681608],
]).addTo(map);


function onMapClick(e) {
  var lat = e.latlng.lat.toString();
  var lng = e.latlng.lng.toString();
  fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
    .then(response => response.json())
    .then(data => {
      if (data && data.display_name) {
        var address = data.display_name;
        console.log("Found address: ", address);

        popup.setLatLng([lat, lng]).setContent("<b>Selected Location:</b><br>" + address).openOn(map);
      } else {
        console.log("No address found for these coordinates.");
        popup.setLatLng([lat, lng]).setContent("<b>Selected Location:</b><br>" + [lat, lng]);
      }
    })
    .catch(error => {
      console.error("Error fetching location:", error);
    })
}

map.on('click', onMapClick);

fetch('')
