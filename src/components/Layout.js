import React from 'react';
import ajax from '../utils/ajax';
import NearbyMatches from './NearbyMatches';
import MapContainer from '../containers/MapContainer';
import UserDetails from './UserDetails';
import UserContext from '../UserContext';

const setHeight = mapContainer => {
    if (mapContainer.getAttribute('class').indexOf('minimized') > -1) {
        mapContainer.setAttribute('class', mapContainer.getAttribute('class').replace('minimized', 'maximized'));
    } else {
        mapContainer.setAttribute('class', mapContainer.getAttribute('class').replace('maximized', 'minimized'));
    }
};

let tick = 0;

class Layout extends React.Component {

    state = {
        currentUser: {
            firstName: 'Adam',
            lastName: 'First',
            long: 13.452156,
            lat: 52.496374,
            personalityType: 'INTP'
        },
        matches: null,
        currentPreviewUser: null,
        centeredUser: null,
        showDetails: user => {
            this.setState({currentPreviewUser: user});
        },
        fetchMeetingPoint: user => {
            return ajax(`/poi/${user.username}/${this.state.currentUser.lat}/${this.state.currentUser.long}`)
                .get()
                .then(meeting => {
                    this.setState({currentMeetingPoint: meeting});
                });
        },
        getMatches: user => {
            return ajax(`/matches/${this.state.currentUser.personalityType.toLowerCase()}/women`)
                .get()
                .then(matches => {
                    this.setState({matches});
                    return matches;
                });
        },
        centerTo: user => {
            mapWidget.flyTo({
                center: [user.long, user.lat - 0.01],
                zoom: 13
            });

            this.setState({currentPreviewUser: user});
        },
    };

    render() {
        return (
            <UserContext.Provider value={this.state}>
                <div className={'ud-layout'}>
                    <div className={'ud-map-container maximized'} ref={ref => this.mapContainer = ref}>
                        <MapContainer/>
                        <button
                            ref={ref => this.button = ref} 
                            type={'button'} 
                            className={'button-minimize'} 
                            onClick={() => {
                                setHeight(this.mapContainer);
                                this.button.style.transform = `rotate(${(tick % 2 === 0) ? '180deg' : '0deg'})`;
                                tick++;
                            }}
                        />
                    </div>
                    <div className={'ud-details'}>
                        {
                            this.state.currentPreviewUser ? (
                                <UserDetails user={this.state.currentPreviewUser}/>
                            ) : (
                                <NearbyMatches 
                                    currentUser={this.state.currentUser}
                                    getMatches={this.state.getMatches}
                                />
                            )
                        }
                    </div>
                </div>
            </UserContext.Provider>
        );
    }
}

export default Layout;