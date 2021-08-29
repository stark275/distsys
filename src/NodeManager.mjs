class NodeManager {

    constructor(httpModule,nodes) {
        this.nodes = nodes
        this.httpModule = httpModule
    }

    requestCallback(response){
        var str = '';
        response.on('data', function (chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
            console.log(str);
            //console.log('From: '+options.protocol+'//'+options.host+':'+options.port+options.path);
        });
    }

    pingNodes(){
        setInterval(() => {
            this.nodes.forEach(options => {
            
            // var options = {
            //     protocol:'http:',  
            //     host: '127.0.0.1',
            //     port:5000,
            //     path: '/',
            //     method:'GET'
            // };

            var request= this.httpModule.request(options, this.requestCallback);

            request.on('error', function(err) {
                    // handle errors with the request itself
                    console.error('Error with the request:', err.message);        
            });

            request.end();
            });
        }, 3000);

    }
}

export default{ NodeManager };