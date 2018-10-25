import React from 'react';
import Graph from 'react-graph-vis';


const width = {
	margin: 0,
	option: 800,
	get end() { return this.option },
	get start() { return this.margin },
	get option_string() { return this.option.toString() + 'px' }
};

const height = {
	margin: 0,
	option: 640,
	get end() { return 0 },
	get start() { return 0 },
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
		randomSeed: 0,
		hierarchical: {
			direction: 'LR',
			sortMethod: 'hubsize'
		}
	},
	nodes: {
		chosen: {
			node: values => values.color = 'green'
		}
	},
	edges: {
		color: "#000000"
	},
	interaction: {
		hover: true
	}
};


// Extend flowchart start/end typed nodes 
export const extend_typed_node = node => node.type === 'START' ? {...node, ...typed_node_option, x: width.start, 	y: height.start}://y: height.start_position}: 
																 {...node, ...typed_node_option, x: width.end, 		y: height.end};//y: height.end_position};	

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

// Extend flowchart onNodeHover type to react-graph-vis event.hoverNode type
export const extend_hover_event = (func, graph) => ({ node }) => func(node, graph.nodes[node]);


// TODO: add position functions
/*
export const get_children_nodes = (arg_node, nodes, edges) => edges.filter(edge => edge.from === arg_node.id)
												  	.map(edge => edge.to)
												  	.map(node_id => nodes.filter(node => node.id === node)[0]);

export const set_node_position = (node, pos) => ({...node, x: pos.x, y: pos.y});

export const count_children_pos = (iter, child_length, val) => ((val / child_length) * iter) ;

export const extend_position = ({ nodes, edges }) => {
	let main_nodes = nodes.filter(node => node.type ? true : false);
	let start_node = main_nodes.filter(node => node.type === 'START')[0];
	let end_node = main_nodes.filter(node => node.type === 'END')[0];

	console.log(nodes);
	return {nodes, edges};
}
*/

// Main Flowcahrt stateless functional component
export const Flowchart  = ({ graph, onNodeClicked, onNodeHover }) => {
	let component_graph = {},
		component_click = {};

	component_graph = graph ? extend_position(extend_graph(graph)) : {nodes: {}, edges: []};
	component_click['select'] = onNodeClicked && graph ? extend_click_event(onNodeClicked, graph) : x => {};
	component_click['hoverNode'] = onNodeHover && graph ? extend_hover_event(onNodeHover, graph) : x => {};

	return (
		<div>
			<h1>Hello world!</h1>
			<Graph graph={component_graph} options={options} events={component_click} />
		</div>
	);
}
