import React from 'react';

const Country = ({country,description,currency}) => {
  return(<div className='box w-40 bg-light-blue'>
    <h1>{country}</h1>
    <p>{description}</p>
    <br/>
    <p><strong>Currency:</strong> {currency}</p>
  </div>)
}

export default Country;
