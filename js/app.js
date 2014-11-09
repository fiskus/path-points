(function() {
    var path = {};
    var dashboardPath = document.getElementById('dashboard-path');
    var dashboardZoom = document.getElementById('dashboard-zoom');
    var i = 0;
    var polyline = {};
    var initialZoom = 4;

    var map = L.map('map', {
        center: [43.59,39.77],
        zoom: initialZoom
    });

    dashboardZoom.innerHTML = initialZoom;

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        id: 'examples.map-i86knfo3'
    }).addTo(map);

    function formatPath() {
        var output = [];
        for (var id in path) {
            var latlng = path[id];
            output.push(JSON.stringify(latlng));
        }
        return output.join(', ');
    }

    function printPath() {
        var pathString = formatPath();
        dashboardPath.innerHTML = pathString;

        if (polyline) {
            map.removeLayer(polyline);
        }
        var latlngs = [];
        for (var id in path) {
            latlngs.push(path[id]);
        }
        polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
    }

    function setPathPoint(id, latlng) {
        var lat = parseFloat(latlng.lat, 10);
        var lng = parseFloat(latlng.lng, 10);
        path[id] = [lat, lng];
    }

    function onMarkerClick(event) {
        map.removeLayer(event.target);
        delete path[event.target._id];
        printPath();
    }

    function onMarkerDrag(event) {
        var latlng = event.target.getLatLng();
        setPathPoint(event.target._id, latlng);
        printPath();
    }

    function onMapClick(event) {
        i++;
        var options = {
            icon: L.divIcon({className: 'marker'}),
            draggable: true
        };
        var marker = L.marker(event.latlng, options).addTo(map);
        marker._id = i;

        marker.on('click', onMarkerClick);
        marker.on('drag', onMarkerDrag);

        setPathPoint(i, event.latlng);

        printPath();
    }

    function onZoom() {
        dashboardZoom.innerHTML = map.getZoom();
    }

    map.on('click', onMapClick);
    map.on('zoomend', onZoom);
})();
