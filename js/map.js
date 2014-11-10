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
