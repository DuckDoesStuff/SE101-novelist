import React from 'react';
import './Button.css'

function Button(props) {
    const {children, onClick, id, toggled} = props
    return (
        <button key={id} className={`button ${toggled ? 'toggled' : ''}`} onClick={onClick}>{children}</button>
    );
};

export default Button