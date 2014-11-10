(function() {
    var path = {};
    var i = 0;
    var initialZoom = 4;

    function setPathPoint(id, latlng) {
        var lat = parseFloat(latlng.lat, 10);
        var lng = parseFloat(latlng.lng, 10);
        path[id] = [lat, lng];
    }

    function onMarkerClick(id) {
        delete path[id];
        refresh();
    }

    function refresh () {
        dashboard.printPath(path);
        map.drawLine(path);
    }

    function onMarkerDrag(data) {
        setPathPoint(data.id, data.latlng);
        refresh();
    }

    function onMapClick (latlng) {
        var marker = new Marker(
                i, latlng, map.getMap(), onMarkerClick, onMarkerDrag);

        setPathPoint(i, latlng);
        path.length = (i + 1);

        refresh();

        i = i + 1;
    }

    function onZoom (z) {
        zoom.drawZoom(z);
    }

    var dashboard = new Dashboard();
    var map = new Map(initialZoom, onMapClick, onZoom);
    var zoom = new Zoom(initialZoom);
})();
