import React from 'react'
import Graph from 'react-graph-vis'


// Fixed width and height params of component veiw port
const width = {
	margin: 0,
	option: 800,
	get end() { return this.option },
	get start() { return this.margin },
	get option_string() { return '100%' }
}

const height = {
	margin: 0,
	option: 640,
	get end() { return this.margin },
	get start() { return this.margin },
	get option_string() { return this.option.toString() + 'px' }
}

// Start/end component options
const typed_node_option = {
	fixed: {
		x: false,
		y: false
	},
}

// Main component options
const options = {
	width: width.option_string,
	height: height.option_string,
	physics: {
		enabled: false,
		stabilization: false
	},
	layout: {
		randomSeed: 0
	},
	nodes: {
		chosen: {
			node: values => values.color = 'green'
		}
	},
	edges: {
		color: '#000000'
	},
	interaction: {
		hover: true
	}
}


// Extend flowchart start/end typed nodes 
export const extend_typed_node = node => node.type === 'START' ?	{...node, ...typed_node_option, x: width.start, y: height.start}:
	{...node, ...typed_node_option, x: width.end, 	 y: height.end}

// Extend flowchart nodes type to react-graph-vis nodes type
export const extend_nodes = nodes => Object.entries(nodes)
	.map(node => [{id: node[0]}, node[1]])
	.map(node => Object.assign(...node, node[1].data))
	.map(node => node.type ? extend_typed_node(node) : node)
	.map(node => node.color ? node : {...node, color: 'red'})

// Extend flowchart edges type to react-graph-vis edges type
export const extend_edges = edges => edges.map(edge => ( {from: edge[0], to: edge[1]} ))

// Extend flowchart graph type to react-graph-vis graph type
export const extend_graph = ({ nodes, edges }) => ({nodes: extend_nodes(nodes), 
	edges: extend_edges(edges)})

// Extend flowchart onNodeClicked type to react-graph-vis event.select type
export const extend_click_event = (func, graph) => ({ nodes }) => (nodes.length !== 0 && typeof func == 'function') ? func(nodes[0], graph.nodes[nodes[0]]) : null

// Extend flowchart onNodeHover type to react-graph-vis event.hoverNode type
export const extend_hover_event = (func, graph) => ({ node }) => func(node, graph.nodes[node])


// Main Flowcahrt stateless functional component
export const Flowchart  = ({ graph, onNodeClicked, onNodeHover }) => {
	const component_graph = graph ? extend_graph(graph) : {nodes: {}, edges: []}
	const component_click = {
		select: extend_click_event(onNodeClicked, graph),
		hoverNode: extend_hover_event(onNodeHover, graph),
	}
	return (
		<Graph graph={component_graph} options={options} events={component_click} />
	)
}
