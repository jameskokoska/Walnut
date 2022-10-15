import React from 'react';
import './Button.css';

export default function Button({ label, onClick, isSecondary, style }){
  return (
    <div
      onClick={onClick}
      style={style}
      className={`button ${isSecondary?"secondary-button":""}`}
    >
      {label}
    </div>
  );
};
