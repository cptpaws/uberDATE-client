import React from 'react';
import UserContext from '../UserContext';

class NearbyMatches extends React.Component {

    componentDidMount() {
        this.props.getMatches();
    }
    
    render() {
        return (
            <ul className={'match-list'}>
                <UserContext.Consumer>
                    {
                        ctx => ctx.matches && Object.keys(ctx.matches)
                            .map(username => {
                                ctx.matches[username].username = username;
                                return ctx.matches[username];
                            })
                            .map(match => (
                                <li className={'match-entry'} onClick={() => ctx.centerTo(match)}>
                                    <strong>
                                        {match.firstName} {match.lastName}
                                    </strong>
                                    <span className={'score'}>
                                        {match.score} <span> / </span> 5
                                    </span>
                                </li>
                            ))
                    }
                </UserContext.Consumer>
            </ul>
        );
    }
}

export default NearbyMatches;