import pkg from './src/NodeManager.mjs';
import n from './src/nodes/nodePark.mjs';

import * as http from 'http';

const { NodeManager } = pkg;
const { nodes } = n;

let nm = new NodeManager(http,nodes)
var i = 0
 
setInterval(() => {
    nm.pingNode(i)
    console.log(i); 
    if (i == nodes.length - 1) 
        i = 0
    else
        i++
}, 1000);
