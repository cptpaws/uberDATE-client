import React from 'react';
import ajax from '../utils/ajax';
import MapContainer from '../containers/MapContainer';
import UserDetails from './UserDetails';
import UserContext from '../UserContext';

class Layout extends React.Component {

    state = {
        currentUser: {
            firstName: 'Adam',
            lastName: 'First',
            long: 13.452156,
            lat: 52.496374,
            personalityType: 'INTP'
        },
        currentPreviewUser: null,
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
    };

    render() {
        return (
            <UserContext.Provider value={this.state}>
                <div className={'ud-layout'}>
                    <div className={'ud-map-container'}>
                        <MapContainer/>
                    </div>
                    <div className={'ud-details'}>
                        {
                            this.state.currentPreviewUser && 
                            <UserDetails user={this.state.currentPreviewUser}/>
                        }
                    </div>
                </div>
            </UserContext.Provider>
        );
    }
}

export default Layout;