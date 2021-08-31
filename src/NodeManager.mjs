import EventEmitter from 'events'
import * as http from 'http'
import n from './nodes/nodePark.mjs';


class NodeManager {
    
    /**
    * Construct NodeManager Object
    * @param    {http Module} httpModule  Native NodeJs HTTP Module
    * @param    {Object[]} nodes  Nodes list
    * @return   {void}   
    */
    constructor() {
        //console.log(n.nodes);
        this.nodes = n.nodes
        this.httpModule = http
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
        // console.log(this.nodes);                     
        var request = this.httpModule.request(
            this.nodes[this.currentNode].options,
            this.requestCallback
        );
        request.on('error', (err) => {
            global.eventEmitter.emit('down'); 
            console.error('Node not repond, error: ', err.message);        
        });
       
        request.end();   

        //console.log(this.nodes);                            
         
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

    getNodeUrl(options){
       return options.protocol+'//'+options.host+':'+options.port
    }

    getAliveNodesUrl(){
        let aliveNodes = []
        for (let id = 0; id < this.nodes.length; id++) {
            let options = this.nodes[id].options
            if (this.nodes[id].state == "alive") {
                let noreUrl = this.getNodeUrl(options)
                aliveNodes.push(noreUrl)
            }
        }
        return aliveNodes
    }
}

export default{ NodeManager };
