var jsdc_client = require('./lib/jsdc_client');
var jsdc_container = require('./lib/jsdc_container');


//client expose
exports.client = jsdc_client;
exports.jsdc = jsdc_client.jsdc;
exports.parse = jsdc_client.parse;
exports.connect = jsdc_client.connect;

//container expose
exports.container = jsdc_container;
exports.interface = jsdc_container.interface;
exports.listen = jsdc_container.listen
