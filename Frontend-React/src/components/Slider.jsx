import React from 'react';
import { Link } from 'react-router-dom';

export const Slider = ({ title, size = 'big', btnText, btnUrl }) => {
  return (
    <div id="slider" className={size === 'small' ? 'slider-small' : 'slider-big'}>
      <h1>{title}</h1>
      {btnText && btnUrl && (
        <Link to={btnUrl} className="btn-white">
          {btnText}
        </Link>
      )}
    </div>
  );
};
