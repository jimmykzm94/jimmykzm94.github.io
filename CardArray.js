import React from 'react';
import data from './countries.json';
import Card from './Card';
import Country from './Country';


const CardArray = ({index}) => {
  return(
    <div>
      <Country country={data[index].country} description={data[index].description} currency={data[index].currency} />
      <h3>Top Attraction Places</h3>
      {
        data[index].attractions.map((country,j)=>{
          return <Card key={j} place={data[index].attractions[j].place} describe={data[index].attractions[j].describe} imageUrl={data[index].attractions[j].imageUrl}/>
        })
      }
    </div>
  )
}

export default CardArray;
