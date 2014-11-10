function Input (changeCallback) {
    var element = document.getElementById('dashboard-input');
    changeCallback = changeCallback || function () {};

    function onChange () {
        var data = JSON.parse(element.value);
        changeCallback(data);
    }

    element.addEventListener('change', onChange);
}
