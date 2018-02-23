import React, {Component} from 'react';
import './style.css';

const ColorPalette = ({color,onClick}) => {
  return (
    <button style={{backgroundColor: color}}  onClick={onClick(color)} className='btn lblBtn mr-2'></button>
  )
}

export default ColorPalette;