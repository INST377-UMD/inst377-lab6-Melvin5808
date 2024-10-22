function createMap() {
    var map = L.map('map').setView([36, -94], 4);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    function getRandomInRange(from, to, fixed) {
        return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    }
    const coordinates = [
        { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-90, -100, 3) },
        { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-90, -100, 3) },
        { lat: getRandomInRange(30, 35, 3), lon: getRandomInRange(-90, -100, 3) }
    ];
    const markers = [
        { markerCoordinates: coordinates[0], markerId: 1 },
        { markerCoordinates: coordinates[1], markerId: 2 },
        { markerCoordinates: coordinates[2], markerId: 3 }
    ];
    markers.forEach(({ markerCoordinates, markerId }) => {
        const { lat, lon } = markerCoordinates;
        const marker = L.marker([lat, lon]).addTo(map);
        document.getElementById(`marker${markerId}`).innerHTML =
            `Marker ${markerId}: Latitude: ${lat}, Longitude: ${lon}`;
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
            .then(res => res.json())
            .then(data => {
                const locality = data.locality;
                document.getElementById(`marker${markerId}Locality`).innerHTML = `Locality: ${locality}`;
            });
    });
}
window.onload = createMap;