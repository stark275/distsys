var nodes = [
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
            path: '/n2',
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
            path: '/n3',
            method:'GET'
        },
        'type': 'server',
        'state': 2,
    },
]

export default {nodes}