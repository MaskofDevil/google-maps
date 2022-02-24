let map

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 2,
        center: new google.maps.LatLng(2.8, -187.3),
        mapTypeId: "terrain"
    })

    const script = document.createElement("script")

    script.src = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojsonp"
    document.getElementsByTagName("head")[0].appendChild(script)

    map.data.setStyle((feature) => {
        const magnitude = feature.getProperty("mag")
        return {
            icon: getCircle(magnitude)
        }
    })
}

function getCircle(magnitude) {
    return {
        path: google.maps.SymbolPath.CIRCLE,
        filledColor: "red",
        fillOpacity: 0.2,
        scale: Math.pow(2, magnitude) / 2,
        strokeColor: "white",
        strokeWeight: 0.5
    }
}

const eqfeed_callback = function (results) {
    map.data.addGeoJson(results)

    // for (let i = 0; i < results.features.length; i++) {
    //     const coords = results.features[i].geometry.coordinates
    //     const latLng = new google.maps.LatLng(coords[1], coords[0])

    //     new google.maps.Marker({
    //         position: latLng,
    //         map: map
    //     })
    // }
}