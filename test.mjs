import pkg from './src/NodeManager.mjs';
import * as http from 'http';

const { NodeManager } = pkg;


let nodes = [
    {
       'options' :{
            protocol:'http:',  
            host: '127.0.0.1',
            port:5000,
            path: '/',
            method:'GET'
        },
        'type': 'server',
        'state': 1,
    },
    {
       'options' :{
            protocol:'http:',  
            host: '127.0.0.1',
            port:6000,
            path: '/test',
            method:'GET'
        },
        'type': 'server',
        'state': 0,
    },
    {
       'options' :{
            protocol:'http:',  
            host: '127.0.0.1',
            port:4000,
            path: '/test',
            method:'GET'
        },
        'type': 'server',
        'state': 2,
    },
]

let nm = new NodeManager(http,nodes)
var i = 0
 
setInterval(() => {
    nm.pingNodes(i)
    console.log(i); 
    if (i == nodes.length - 1) 
        i = 0
    else
        i++
}, 1000);
