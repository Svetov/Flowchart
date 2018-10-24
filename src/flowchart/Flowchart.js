import React, { Component } from 'react';
import Graph from 'react-graph-vis';


const options = {
  layout: {
    hierarchical: false
  },
  edges: {
    color: "#000000"
  }
};


export class Flowchart extends Component {
	flowchart_state = {
		color: "red",
		graph: {},
		events: {}
	};

	constructor(props) {
		super(props)
		this.flowchart_state.graph = props.graph ? this.extend_graph(props.graph) : {nodes: {}, edges: []};
		this.flowchart_state.events['select'] = props.onNodeClicked && props.graph ? this.extend_click_event(props.onNodeClicked, this.props.graph.nodes) : x => {};
		console.log(this.flowchart_state);
	}

	// Extend flowchart nodes type to react-graph-vis nodes type
	extend_nodes = value => Object.entries(value).map( item => [{id: item[0], color: item[1].color ? item[1].color : this.flowchart_state.color }, item[1]] ).map(item => Object.assign( ...item ));

	// Extend flowchart nodes type to react-graph-vis nodes type
	extend_edges = value => value.map(item => ({from: item[0], to: item[1]}));

	// Extend flowchart nodes type to react-graph-vis nodes type
	extend_graph = ({ nodes, edges }) => ({nodes: this.extend_nodes(nodes), edges: this.extend_edges(edges)}); 

	extend_click_event = (func, value) => ({ nodes }) => nodes.length !== 0 ? func(nodes[0], value[nodes[0]]) : null;

	//<Graph graph={this.flowchart_state.graph} options={options} events={this.flowchart_state.events} style={{ height: "640px" }} />
	render() {
		return (
			<div>
				<h1>Hello world!</h1>
				<Graph graph={this.flowchart_state.graph} options={options} events={this.flowchart_state.events} style={{ height: "640px" }} />
			</div>
		);
	}
}
