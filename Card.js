import React from 'react';
import './Card.css';

const Card = ({place,describe,imageUrl}) => {
  return(<div className='box grow bg-light-blue'>
    <br/>
    <p>{place}</p>
    <img src={imageUrl} alt="pic here"/>
    <p className='w-80 center'>{describe}</p>
  </div>)
}

export default Card;
