import React, {Component} from 'react';
import './App.css';
// import Server from './Server/Server';
import Speech from './Speech';
import Intro from './Intro';
import 'tachyons';

import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone';

class App extends Component {
  constructor(){
    super()
    this.state={
      speaking:''
    }
  }
  onClickListener(){
    fetch('https://safe-waters-86811.herokuapp.com/api/speech-to-text/token').then(response => {
       return response.text();
    }).then(token => {
      console.log('token is',token);
      var stream = recognizeMic({
        token: token, objectMode: true, // send objects instead of text
        format: false // optional - performs basic formatting on the results such as capitals an periods
      });
      stream.on('data', data => {
        // console.log(data.results[0].alternatives[0].transcript);
        this.setState({speaking:data.results[0].alternatives[0].transcript});
      });
      stream.on('error', err => {
        console.log(err);
      });
    }).catch(error=> {
      console.log(error);
    });
  }

  render() {
    return (<div><div className="shadow-4 pa2 w-70 center bg-washed-green">
      <Intro />
      <button className="btn btn-primary btn-lg" onClick={this.onClickListener.bind(this)}>Activate Me</button>
    </div>
    <div>
      <Speech countrySpoken={this.state.speaking}/>
    </div>
  </div>);
  }
}

export default App;
