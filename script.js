let map, directionsService, directionsRenderer;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 17.385, lng: 78.4867 },
        zoom: 13,
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({ map });

    const crimeZones = [
        { lat: 17.385, lng: 78.4867, level: "high" },
        { lat: 17.400, lng: 78.4900, level: "medium" },
    ];

    crimeZones.forEach(zone => {
        const color = zone.level === "high" ? "red" : "orange";
        new google.maps.Circle({
            strokeColor: color,
            fillColor: color,
            fillOpacity: 0.35,
            map,
            center: { lat: zone.lat, lng: zone.lng },
            radius: 500,
        });
    });
}

function calculateRoute() {
    const origin = document.getElementById("origin").value;
    const destination = document.getElementById("destination").value;

    directionsService.route(
        {
            origin: origin,
            destination: destination,
            travelMode: 'DRIVING',
        },
        (response, status) => {
            if (status === 'OK') {
                directionsRenderer.setDirections(response);
            } else {
                alert('Route failed: ' + status);
            }
        }
    );
}
