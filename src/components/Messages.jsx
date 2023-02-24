import React from 'react';

const Messages = ({variant, message}) => {
    return (
        <div className={`alert alert-${variant}`} role="alert">{message}</div>
    );
};

export default Messages;