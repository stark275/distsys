class NodeManager {

    constructor(httpModule,nodes) {
        this.nodes = nodes
        this.httpModule = httpModule
        this.aliveMessage = 'alive'
        this.currentNode = -1;
    }

  
    pingNodes(i){                                 
        var request= this.httpModule.request(this.nodes[i].options, this.requestCallback);
        request.on('error', (err) => {
                
            //  console.log(this.nodes[this.currentNode]);     
            //  console.log(this.nodes[i].options)
            console.log(this.nodes[i])              
            console.error('Error with the request:', err.message)        
        });
        request.end();
        
        if (this.currentNode == this.nodes.length)  
            this.currentNode = -1

        this.currentNode++
            console.error('-----------------------------------------------------')              

    }

    requestCallback(response){
        var str = ''
        response.on('data', function (chunk) {
            str += chunk
        });

        response.on('end', function () {
            console.log(str)
            //console.log('From: '+options.protocol+'//'+options.host+':'+options.port+options.path);
        });
    }

    getAliveNode(){

    }
}

export default{ NodeManager };