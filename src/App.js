import React, { Component } from 'react';
import './App.css';
import {Heading} from "./components/heading";
import {Content} from "./components/content";
import firebase from "firebase";
import config from "./cgfb";

firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div>
          <Heading/>
          <Content/>
      </div>
    );
  }
}

export default App;
