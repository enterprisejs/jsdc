//TEST in console var x = require('./dnode_facade'); var jsdc = require('./dnode_facade').jsdc(localhost,9090); jsdc("jsdc://this/is/a/test")
var url = require("url");

exports.jsdc = function(jsdc,cb,fail) {
  var c = exports.connect(host,port);
  c(jsdc,cb,fail);
}

//Parsed 1 as {"protocol":"jsd:","slashes":true,"host":null,"hostname":null,"href":"jsd://airport_domain/service","pathname":"/service","path":["service"],"domain":"airport_domain"}
exports.parse = function(jsdc) {
  var uri = url.parse(jsdc);
  if(!(uri.protocol == 'jsd:')) {
    return null;
  }

  if(uri.auth) {
    uri.domain = uri.auth;
    url.auth = null;
  }
  else {
      uri.domain = uri.host;
      uri.host = null;
      uri.hostname = null;
  }
  var p = uri.path.split('/');
  p.shift();
  uri.path = p;

  return uri;
}

exports.connect = function(host,port) {
  var airport = require('airport');
  var air = airport('localhost',9090);

  return function(jsdc,cb,fail) {
    cb = cb || function(){};
    fail = fail || function(){};
    var x = url.parse(jsdc);
    var p = x.path.split('/');
    p.shift();
    x.path = p;
    console.log(JSON.stringify(x));

    var domain = x.host;
    var up = air.connect(domain);

    up(function(remote) {
      var wtr = remote;
      var plen = p.length;
      for(var i = 0; i < plen; i++) {
        var val = p[i];
        console.log("GO " + val);
        wtr = wtr[val];
        if(!wtr) {
          fail(jsdc);
          return;
        }
      }
      cb(wtr);
    })
  }
}

