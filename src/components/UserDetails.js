import React from 'react';
import UserContext from '../UserContext';

export default props => {
    const ctx = React.useContext(UserContext);
    const [liked, setLiked] = React.useState(props.user.youLiked);
    props.user.liked = true;

    return (
        <div className={'user-details'}>
            <h4>{`${props.user.firstName} ${props.user.lastName}`}</h4>
            {
                !liked ? (
                    <React.Fragment>
                        <button type={'button'} className={'btn btn-like'} onClick={() => {
                            if (props.user.liked) {
                                setLiked(true);
                                ctx.fetchMeetingPoint(props.user);
                                ctx.showDetails(null);
                            }
                        }}>
                            Like
                        </button>
                        {
                            props.user.liked &&
                            <span>
                                {props.user.firstName} likes you.
                            </span>
                        }
                    </React.Fragment>
                ) : (
                    <span>
                        You and {props.user.firstName} like each other. Consider going on a date!
                    </span>
                )
            }
        </div>
    );
};