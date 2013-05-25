(function () {
    function install(ev) {
        ev.preventDefault();

        var base_url = location.protocol + "//" + location.hostname
            + (location.port && ":" + location.port) + "/";
        var manifest_url = base_url + "/todo.webapp";

        var myapp = navigator.mozApps.install(manifest_url);
        myapp.onsuccess = function(data) {
            this.parentNode.removeChild(this);
        };
    };

    function isInstallable() {
        return (window.navigator.mozApps !== undefined);
    };

    var button = document.getElementById('install');
    if (isInstallable()) {
        button.addEventListener('click', install, false);
    }
    else {
        button.parentNode.removeChild(button);
    }

    var request = window.navigator.mozApps.getInstalled();
    request.onsuccess = function () {
        if (request.result.length !== 0) {
            button.parentNode.removeChild(button);
        }
    };
})();
