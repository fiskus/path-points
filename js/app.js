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
