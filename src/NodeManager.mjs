import EventEmitter from 'events';

class NodeManager {
    
    /**
    * Construct NodeManager Object
    * @param    {http Module} httpModule  Native NodeJs HTTP Module
    * @param    {Object[]} nodes  Nodes list
    * @return   {void}   
    */
    constructor(httpModule,nodes) {
        this.nodes = nodes
        this.httpModule = httpModule
        this.aliveMessage = 'alive'
        this.currentNode = null
        global.eventEmitter = new EventEmitter()

        eventEmitter.on('alive', () => {
            this.changeNodeState(this.currentNode, 'alive')
        })
        eventEmitter.on('down', () => {
            this.changeNodeState(this.currentNode, 'down')
        })
    }
  
    /**
    * Pings node by id in array
    * @param    {int} nodeId  Node id
    * @return   {void}   
    */
    pingNode(nodeId){      
        this.currentNode = nodeId                           
        var request = this.httpModule.request(
            this.nodes[this.currentNode].options,
            this.requestCallback
        );
        request.on('error', (err) => {
            global.eventEmitter.emit('down'); 
            console.error('Node not repond, error: ', err.message);        
        });
       
        request.end();   

        console.log(this.nodes);                            
         
        console.error('----------------------end Request-------------------------------')              
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

        response.on('end',() => {
            console.log(str)
            global.eventEmitter.emit('alive')                        
            //console.log('From: '+options.protocol+'//'+options.host+':'+options.port+options.path);
        });
    }

    /**
    * Change state of given node
    * @param    {int} nodeId Node id
    * @param    {int} nodeId node state (can be : 'unknown', 'alive' or 'down')
    * @return   {void}   
    */
    changeNodeState(nodeId, state){
        this.nodes[nodeId].state = state
    }
}

export default{ NodeManager };
