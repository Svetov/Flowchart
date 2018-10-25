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
    node_4: {label: 'D'},
    node_5: {label: 'E'},
    node_6: {label: 'F'}
  },
  edges: [
    ['node_4', 'node_2'],
    ['node_3', 'node_1'],
    ['node_1', 'node_2'],
    ['node_2', 'node_5'],
    ['node_1', 'node_5'],
    ['node_5', 'node_6'],
    ['node_6', 'node_2']
  ]
}


class App extends Component {

  constructor(props) {
    super(props);
  }

  onNodeClicked(nodeid, node) { console.log('select', nodeid, node) } ;

  onNodeHover(nodeid, node) { console.log('hover', nodeid, node) };

  render() {
    return (
      <div className="App">
        <Flowchart graph={graph} onNodeClicked={this.onNodeClicked} onNodeHover={this.onNodeHover} />
      </div>
    );
  }
}

export default App;
