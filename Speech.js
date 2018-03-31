import React from 'react';
import CardArray from './CardArray';

class Speech extends React.Component{
  constructor(props){
    super(props);
    this.state={
      index:-1,
      countries:['Malaysia','Singapore','Thailand','Myanmar','Indonesia','Cambodia','Vietnam','Laos','Timor Leste','Brunei','Philippines',]
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.countrySpoken!==this.props.countrySpoken){
      const {countries}=this.state;
      this.setState({index:-1})
      for(var i=0;i<countries.length;i++){
        if(this.props.countrySpoken.includes(countries[i])){
          this.setState({index:countries.indexOf(countries[i])})
        }
      }
      console.log(this.props.countrySpoken)
    }
  }


  render(){
    if(this.state.index<0){
      return (<div></div>)
    } else {
      return(<div><CardArray index={this.state.index}/></div>)
    }
  }
}

export default Speech;
