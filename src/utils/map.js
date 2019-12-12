var popupOffsets = {
    top: [0, 0],
    bottom: [0, -40],
    'bottom-right': [0, -40],
    'bottom-left': [0, -40],
    left: [25, -35],
    right: [-25, -35]
};

export default () => ({
    createMap(container, params) {
        return tt.map({
            source: 'vector',
            container,
            key: 'spDnMSwJq9AAp3YPb2xplyHD2NYc8rvz',
            center: params.center,
            zoom: params.zoom || 13
        });
    },

    createMarker(className, properties) {
        const element = document.createElement('div');
        element.setAttribute('class', className);
        element.addEventListener('click', properties.onClick);

        const marker = new tt.Marker({element}).setLngLat(properties.coords);
        const popup = new tt.Popup({offset: popupOffsets}).setHTML(properties.html);
        marker.setPopup(popup);
        
        return marker;
    }
});