class NodeManager {

    /**
    * Construct NodeManager Object
    * @param    {http Module} httpModule  Native NodeJs HTTP Module
    * @param    {Object[]} nodes  Node list
    * @return   {void}   
    */
    constructor(httpModule,nodes) {
        this.nodes = nodes
        this.httpModule = httpModule
        this.aliveMessage = 'alive'
    }

  
    /**
    * Pings node by id in array
    * @param    {int} i  Node id
    * @return   {void}   
    */
    pingNodes(i){                                 
        var request= this.httpModule.request(this.nodes[i].options, this.requestCallback);
        request.on('error', (err) => {
           // console.log(this.nodes[i])              
            console.error('Error with the request:', err.message)        
        });
        request.end();       
        console.error('-----------------------------------------------------')              
    }

    /**
    * Handle an HTTP Response
    * @param    {Response} response  http Response
    * @return   {void}   
    */
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
