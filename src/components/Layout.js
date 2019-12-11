import React from 'react';
import Map from '../components/Map';

export default props => {
    return (
        <div className={'ud-layout'}>
            <div className={'ud-map-container'}>
                <Map/>
            </div>
            <div className={'ud-details'}>
                
            </div>
        </div>
    );
};