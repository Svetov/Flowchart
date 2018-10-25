import React from 'react';
import Graph from 'react-graph-vis';


const width = {
	margin_left: 50,
	option: 800,
	get end_position() { return this.option - this.margin_left },
	get start_position() { return this.margin_left },
	get option_string() { return this.option.toString() + 'px' }
};

const height = {
	margin_top: 320,
	option: 640,
	get end_position() { return this.option - this.margin_top },
	get start_position() { return this.option - this.margin_top },
	get option_string() { return this.option.toString() + 'px' }
}

const typed_node_option = {
	fixed: {
		x: true,
		y: true
	}
};

const options = {
	width: width.option_string,
	height: height.option_string,
	physics: {
		enabled: false
	},
	layout: {
		hierarchical: false
	},
	nodes: {
		chosen: {
			node: values => values.color = 'green'
		}
	},
	edges: {
		color: "#000000"
	}
};


// Extend flowchart start/end typed nodes 
export const extend_typed_node = node => node.type === 'START' ? {...node, ...typed_node_option, x: width.start_position, 	y: height.start_position}: 
																 {...node, ...typed_node_option, x: width.end_position, 	y: height.end_position};	

// Extend flowchart nodes type to react-graph-vis nodes type
export const extend_nodes = nodes => Object.entries(nodes)
						    .map(node => [{id: node[0]}, node[1]])
						    .map(node => Object.assign(...node))
						    .map(node => node.type ? extend_typed_node(node) : node)
						    .map(node => node.color ? node : {...node, color: 'red'});

// Extend flowchart edges type to react-graph-vis edges type
export const extend_edges = edges => edges.map(edge => ( {from: edge[0], to: edge[1]} ));

// Extend flowchart graph type to react-graph-vis graph type
export const extend_graph = ({ nodes, edges }) => ({nodes: extend_nodes(nodes), 
													edges: extend_edges(edges)}); 

// Extend flowchart onNodeClicked type to react-graph-vis event.select type
export const extend_click_event = (func, graph) => ({ nodes }) => nodes.length !== 0 ? func(nodes[0], graph.nodes[nodes[0]]) : null;


// Main Flowcahrt stateless functional component
export const Flowchart  = ({ graph, onNodeClicked }) => {
	let component_graph = {},
		component_click = {};

	component_graph = graph ? extend_graph(graph) : {nodes: {}, edges: []};
	component_click['select'] = onNodeClicked && graph ? extend_click_event(onNodeClicked, graph) : x => {};
	console.log(component_graph);

	return (
		<div>
			<h1>Hello world!</h1>
			<Graph graph={component_graph} options={options} events={component_click} />
		</div>
	);
}
