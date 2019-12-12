import React from 'react';
import Map from '../components/Map';
import ajax from '../utils/ajax';
import UserContext from '../UserContext';

class MapContainer extends React.Component {

    getCurrentPosition() {
        return new Promise(resolve => {
            navigator.geolocation.getCurrentPosition(resolve);
        });
    }

    render() {
        return (
            <UserContext.Consumer>
                {
                    ctx => (
                        <Map
                            getCurrentPosition={this.getCurrentPosition}
                            matches={ctx.matches}
                            showDetails={ctx.showDetails}
                            currentUser={ctx.currentUser}
                            currentMeetingPoint={ctx.currentMeetingPoint}
                        />
                    )
                }
            </UserContext.Consumer>
        );
    }
}

export default MapContainer;