import pkg from './src/NodeManager.mjs';
const { NodeManager } = pkg;
import * as http from 'http';

let nodes = [
    {
        protocol:'http:',  
        host: '127.0.0.1',
        port:5000,
        path: '/',
        method:'GET'
    }
]

let nm = new NodeManager(http,nodes)
nm.pingNodes()
