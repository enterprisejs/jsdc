var airport = require('airport');

var _interfaces = {};

var _interface_fctn = function(remote,conn) {
  console.error("NOT YET IMPLEMENTED");
  return;
  if(_interfaces.length) {
    for(var i in _interfaces) {
      var x = _interfaces[i];
      this[i] = x;
    }
  }
  else {
    console.error ("FACADE NOT IMPLEMENTED!");
  }
}

exports.interface = function(ni) {
    _interface_fctn = ni;
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

