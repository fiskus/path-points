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
