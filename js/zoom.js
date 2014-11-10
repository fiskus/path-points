function Zoom (initialZoom) {
    initialZoom = initialZoom || 4;

    var dashboardZoom = document.getElementById('dashboard-zoom');

    dashboardZoom.innerHTML = initialZoom;

    function drawZoom (zoom) {
        dashboardZoom.innerHTML = zoom;
    }
}
