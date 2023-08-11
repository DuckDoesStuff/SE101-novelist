import React, { useState } from 'react';

const Button = ({ doSomething, children, className }) => {
  const onClick = () => {
    doSomething();
  };

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
