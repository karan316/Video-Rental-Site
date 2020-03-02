import React from 'react';
const Like = props => {
    let classes = 'fa fa-heart';
    if (!props.liked) classes += '-o';
    return (
        <i
            style={{ cursor: 'pointer' }}
            onClick={props.onClick}
            className={classes}
            aria-hidden='true'
        ></i> //controlled component notifies its onclick state using props
    );
};

export default Like;
