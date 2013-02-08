var airport = require('airport');

exports.__interface = function(remote,conn) {
  console.error ("FACADE NOT IMPLEMENTED!");
}

exports.interface = function(ni) {
    exports.__interface = ni;
    return exports;
}

exports.listen = function(srv,host,port) {
  if(!port) {
    port = host;
    host = 'localhost';
  } 
  if(!port) {
    port = '9090';
  } 

  var air = airport(host,port);

  var dnode = air(exports.__interface);

  var restart = function() {
    try {
      dnode.listen(srv);
      console.log("RUNNING: dnr://" + srv);
    }
    catch(e) {
      console.error("ERROR: " + e)
      console.error("RESTARTING");
      restart();
    }
  }
  restart();
  return exports;
}

