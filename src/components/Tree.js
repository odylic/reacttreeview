import React, {Component} from 'react';
import values from 'lodash/values';
import PropTypes from 'prop-types';
import TreeNode from './TreeNode';

const data = {
  '/root': {
    path: '/root',
    type: 'folder',
    isRoot: true,
    children: ['/root/david', '/root/jslancer'],
  },
  '/root/david': {
    path: '/root/david',
    type: 'folder',
    children: ['/root/david/readme.md'],
  },
  '/root/david/readme.md': {
    path: '/root/david/readme.md',
    type: 'file',
    content: 'Thanks for reading me me. But there is nothing here.',
  },
  '/root/jslancer': {
    path: '/root/jslancer',
    type: 'folder',
    children: ['/root/jslancer/projects', '/root/jslancer/vblogs'],
  },
  '/root/jslancer/projects': {
    path: '/root/jslancer/projects',
    type: 'folder',
    children: ['/root/jslancer/projects/treeview'],
  },
  '/root/jslancer/projects/treeview': {
    path: '/root/jslancer/projects/treeview',
    type: 'folder',
    children: [],
  },
  '/root/jslancer/vblogs': {
    path: '/root/jslancer/vblogs',
    type: 'folder',
    children: [],
  },
};

export default class Tree extends Component {
  state = {
    nodes: data,
  };

  // gets top level root node in tree data
  getRootNodes = () => {
    // node to state
    const {nodes} = this.state;
    // values is from lodash
    // filter for root
    return values(nodes).filter((node) => node.isRoot === true);
  };

  // reads children property, map with tree data to return an array of children objects
  getChildNodes = (node) => {
    // node is assigned to state
    const {nodes} = this.state;
    // empty array if nothing
    if (!node.children) return [];
    // node.children.map make an array of the children
    return node.children.map((path) => nodes[path]);
  };

  // will change isOpen property to open
  onToggle = (node) => {
    // assigns state
    const {nodes} = this.state;
    // reassigns isOpen to the opposite with bang operator
    nodes[node.path].isOpen = !node.isOpen;
    // sets the state to nodes
    this.setState({nodes});
  };

  // on select function
  onNodeSelect = (node) => {
    // this.props.onSelect
    const {onSelect} = this.props;
    // onSelect event for the node
    onSelect(node);
  };

  render() {
    // rootNodes is the root
    const rootNodes = this.getRootNodes();
    return (
      <div>
        {rootNodes.map((node) => (
          <TreeNode
            // node is the value of rootNodes.map(node)
            node={node}
            // calls functions for treeNodes
            getChildNodes={this.getChildNodes}
            onToggle={this.onToggle}
            onNodeSelect={this.onNodeSelect}
          />
        ))}
      </div>
    );
  }
}

Tree.propTypes = {
  // prop-types enforces good coding style
  onSelect: PropTypes.func.isRequired,
};
