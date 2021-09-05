import pkg from './src/NodeManager.mjs';
const { NodeManager } = pkg;
let nm = new NodeManager()
var i = 0
 
setInterval(() => {
    nm.pingNode(i)
    console.log(nm.getAliveNodesUrl()); 
    if (i == 2) 
        i = 0
    else
        i++
}, 1000);
