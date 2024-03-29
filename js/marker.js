function Marker (id, latlng, map, clickCallback, dragCallback) {
    var options = {
        icon: L.divIcon({className: 'marker'}),
        draggable: true
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
    marker._id = id;
}
