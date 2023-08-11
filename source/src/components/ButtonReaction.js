import React, { useState } from 'react';

const ButtonReaction = ({ prevIcon, postIcon, doSomething, children, className }) => {
  const [icon, setIcon] = useState(prevIcon);

  const onClick = () => {
    setIcon(icon === prevIcon ? postIcon : prevIcon);
    doSomething();
  };

  return (
    <button className={className} onClick={onClick}>
      <i className={icon} />
      {children}
    </button>
  );
};

export default ButtonReaction;
