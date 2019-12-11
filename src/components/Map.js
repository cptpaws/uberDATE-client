import React from 'react';

let mapWidget = null;
let currentLocation = [13.452156, 52.496374];
var popupOffsets = {
    top: [0, 0],
    bottom: [0, -40],
    'bottom-right': [0, -40],
    'bottom-left': [0, -40],
    left: [25, -35],
    right: [-25, -35]
  }

class Map extends React.Component {
    addMarker(id, properties) {
        const element = document.createElement('div');
        element.id = id;

        const marker = new tt.Marker({element}).setLngLat(properties.coords);
        const popup = new tt.Popup({offset: popupOffsets}).setHTML(properties.html);
        marker.setPopup(popup);
        
        return marker;
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(position => {
            mapWidget = tt.map({
                source: 'vector',
                container: 'map',
                key: 'spDnMSwJq9AAp3YPb2xplyHD2NYc8rvz',
                center: currentLocation,
                zoom: 13
            });

            const marker = this.addMarker('myCurrentPosition', {
                coords: currentLocation,
                html: 'You are here!'
            });

            marker.addTo(mapWidget).togglePopup();
        });
    }

    render() {
        return (
            <div id={'map'}/>
        );
    }
}

export default Map;