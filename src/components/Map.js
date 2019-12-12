import React from 'react';
import map from '../utils/map';

window.mapWidget = null;
let currentLocation = [13.452156, 52.496374];

class Map extends React.Component {

    componentDidMount() {
        this.props.getCurrentPosition()
            .then(position => {
                mapWidget = map().createMap('map', {center: currentLocation});

                const marker = map().createMarker('myCurrentPosition', {
                    coords: currentLocation,
                    html: 'You are here!'
                });

                marker.addTo(mapWidget).togglePopup();
            });
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentMeetingPoint !== prevProps.currentMeetingPoint) {
            const marker = map().createMarker('meeting-point', {
                coords: [this.props.currentMeetingPoint.long, this.props.currentMeetingPoint.lat],
                html: `We marked a spot that's close to both of you: <strong>${this.props.currentMeetingPoint.name}</strong>`
            });

            marker.addTo(mapWidget).togglePopup();
        } else if (this.props.matches !== prevProps.matches) {
            const {matches} = this.props;

            matches && Object.keys(matches).forEach(username => {
                const user = matches[username];
                
                user.username = username;

                const marker = map().createMarker('user-match', {
                    coords: [user.long, user.lat],
                    html: `${user.firstName} ${user.lastName}`,
                    onClick: () => {
                        this.props.showDetails(user);
                    }
                });

                marker.addTo(mapWidget);
            });
        }
    }

    render() {
        return (
            <div id={'map'}/>
        );
    }
}

export default Map;