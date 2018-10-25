import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Flowchart } from './flowchart';
//import graph from './flowchart/moc.json';

const graph = {
  nodes: {
    node_1: {label: 'A', color: 'red'},
    node_2: {label: 'B', type: 'END'},
    node_3: {label: 'C', type: 'START', color: 'orange'},
    node_4: {label: 'D'}
  },
  edges: [
    ['node_3', 'node_1'],
    ['node_4', 'node_2'],
    ['node_1', 'node_2']
  ]
}


class App extends Component {

  constructor(props) {
    super(props);
  }

  onNodeClicked(nodeid, node) { console.log(nodeid, node) } ;

  render() {
    return (
      <div className="App">
        <Flowchart graph={graph} onNodeClicked={this.onNodeClicked} />
      </div>
    );
  }
}

export default App;
