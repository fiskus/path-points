(function() {
    var path = [];
    var markers = [];
    var i = 0;
    var initialZoom = 4;

    function onMarkerClick(id) {
        path = path.filter(function(latlng, n) {
            return n !== id;
        });
        redraw();
    }

    function refresh () {
        dashboard.printPath(path);
        map.drawLine(path);
    }

    function onMarkerDrag(data) {
        path[data.id] = data.latlng;
        refresh();
    }

    function createMarker (latlng, i) {
        return new Marker(
                i, latlng, map.getMap(), onMarkerClick, onMarkerDrag);
    }

    function onMapClick (latlng) {
        markers.push(createMarker(latlng, i));
        path.push([latlng.lat, latlng.lng]);

        refresh();

        i = i + 1;
    }

    function onZoom (z) {
        zoom.drawZoom(z);
    }

    function redraw () {
        markers.forEach(function(marker) {
            marker.detach();
        });
        markers = path.map(createMarker);
        refresh();
    }

    function onInput (data) {
        path = data.map(function(lnglat) {
            return lnglat.reverse();
        });
        redraw();
    }

    var dashboard = new Dashboard();
    var map = new Map(initialZoom, onMapClick, onZoom);
    var zoom = new Zoom(initialZoom);
    var input = new Input(onInput);
})();

function Dashboard () {
    var dashboardPath = document.getElementById('dashboard-path');

    function format (path) {
        return Array.prototype.map.call(path, JSON.stringify);
    }

    this.printPath = function (path) {
        var pathString = format(path);
        dashboardPath.innerHTML = pathString;
    };
}

function Input (changeCallback) {
    var element = document.getElementById('dashboard-input');
    changeCallback = changeCallback || function () {};

    function onChange () {
        var data = JSON.parse(element.value);
        changeCallback(data);
    }

    element.addEventListener('change', onChange);
}

function Map (initialZoom, clickCallback, zoomCallback) {
    initialZoom = initialZoom || 4;
    clickCallback = clickCallback || function() {};
    zoomCallback = zoomCallback || function() {};
    var polyline = {};

    var map = L.map('map', {
        center: [43.59,39.77],
        zoom: initialZoom
    });

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        id: 'examples.map-i86knfo3'
    }).addTo(map);

    this.drawLine = function (path) {
        if (polyline) {
            map.removeLayer(polyline);
        }
        var pathArray = Array.prototype.slice.call(path, 0);
        polyline = L.polyline(pathArray, {
            color: 'red'
        }).addTo(map);
    };

    this.getMap = function () {
        return map;
    };

    function onClick (event) {
        clickCallback(event.latlng);
    }

    function onZoom () {
        var zoom = map.getZoom();
        zoomCallback(zoom);
    }

    map.on('click', onClick);
    map.on('zoomend', onZoom);
}

function Marker (id, latlng, map, clickCallback, dragCallback) {
    var options = {
        icon: L.divIcon({className: 'marker'}),
        draggable: true
    };

    this.detach = function () {
        map.removeLayer(marker);
    };

    function onClick () {
        map.removeLayer(marker);
        clickCallback(id);
    }

    function onDrag () {
        var data = {
            id: id,
            latlng: marker.getLatLng()
        };
        dragCallback(data);
    }

    var marker = L.marker(latlng, options)
        .addTo(map)
        .on('click', onClick)
        .on('drag', onDrag);
}

function Zoom (initialZoom) {
    initialZoom = initialZoom || 4;

    var dashboardZoom = document.getElementById('dashboard-zoom');

    dashboardZoom.innerHTML = initialZoom;

    this.drawZoom = function (zoom) {
        dashboardZoom.innerHTML = zoom;
    };
}
