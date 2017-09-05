import React, { Component } from 'react';
import './Search.css';
import MdMic from 'react-icons/lib/md/mic';
import MdMicOff from 'react-icons/lib/md/mic-off';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      result: '',
      active: false
    };
    this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    this.recognition.lang = 'sv-SE';
    // this.recognition.interimResults = true;
    // this.recognition.continuous = true;

    this.recognition.onresult = (event) => {
      console.log('Result:');
      console.log(event);
      this.setState((prevState) => {
        return prevState.result = event.results[0][0].transcript;
      });
    }

    this.recognition.onend = () => {
      if(this.state.active) {
        this.recognition.start();
      }
    }

    [
      'onaudiostart',
      'onaudioend',
      'onend',
      'onerror',
      'onnomatch',
      // 'onresult',
      'onsoundstart',
      'onsoundend',
      'onspeechend',
      'onstart'
     ].forEach((eventName) => {
         this.recognition[eventName] = (e) => {
             console.log(eventName, e);
         };
     });

    this.toggleMic = this.toggleMic.bind(this);
    this.recognition.onresult = this.recognition.onresult.bind(this);
  }

  toggleMic() {
    if (this.state.active) {
      this.recognition.stop();
    } else {
      this.recognition.start();
    }
    this.setState((prevState) => {
      return prevState.active = !prevState.active;
    });
    console.log(`Set state to ${this.state.active}`);
  }

  render() {
    let icon = !this.state.active ? <MdMic /> : <MdMicOff />;
    return (
      <div>
        <div className="search-wrapper">
          <button onClick={this.toggleMic}>{ icon }</button>
        </div>
        <div className="result">{this.state.result}</div>
      </div>
    );
  }
}

export default Search;
