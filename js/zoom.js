function Zoom (initialZoom) {
    initialZoom = initialZoom || 4;

    var dashboardZoom = document.getElementById('dashboard-zoom');

    dashboardZoom.innerHTML = initialZoom;

    this.drawZoom = function (zoom) {
        dashboardZoom.innerHTML = zoom;
    };
}
