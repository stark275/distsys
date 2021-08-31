 /**
*  All nodes of Distributed system  
*/
var nodes = [
    {
       'options' :{
            protocol:'http:',  
            host: '127.0.0.1',
            port:4000,
            path: '/',
            method:'GET'
        },
        'type': 'server',
        'state': 'unknown', // can be : 'unknown', 'alive' or 'down'
    },
    {
       'options' :{
            protocol:'http:',  
            host: '127.0.0.1',
            port:5000,
            path: '/n2',
            method:'GET'
        },
        'type': 'server',
        'state': 'unknown',
    },
    {
       'options' :{
            protocol:'http:',  
            host: '127.0.0.1',
            port:5000,
            path: '/n3',
            method:'GET'
        },
        'type': 'server',
        'state': 'unknown',
    },
]

export default {nodes}