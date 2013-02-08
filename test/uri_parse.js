var jsdc = require('../');
var test = require('tap').test;

/*
Parsed 1 as {"protocol":"jsd:","slashes":true,"host":"airport_domain","hostname":"airport_domain","href":"jsd://airport_domain/service","pathname":"/service","path":"/service"}
Parsed 2 as {"protocol":"jsd:","slashes":true,"auth":"airport_domain","host":"localhost:9090","port":"9090","hostname":"localhost","href":"jsd://airport_domain@localhost:9090/service","pathname":"/service","path
":"/service"}                                                                                                                                                                                                      
Parsed 3 as {"protocol":"jsd:","slashes":true,"host":"airport_domain","hostname":"airport_domain","href":"jsd://airport_domain/service/function","pathname":"/service/function","path":"/service/function"}
Parsed 4 as {"protocol":"jsd:","slashes":true,"auth":"airport_domain","host":"localhost:9090","port":"9090","hostname":"localhost","href":"jsd://airport_domain@localhost:9090/service/function","pathname":"/service/function","path":"/service/function"}       
*/

var parse_test_helper = function(t,obj,d,h,po,pa) {
  t.equal(obj.domain,d);
  if(h) {
    t.equal(obj.hostname,h);
  } else {
    t.notOk(obj.hostname,"should be null");
  }
  if(po) {
    t.equal(obj.port,po);
  } else {
    t.notOk(obj.port,"should be null");
  }
  t.equal(JSON.stringify(obj.path),JSON.stringify(pa));  
}
test('uri_parse',function(t) {
  t.plan(16);
  var p;
  p=jsdc.parse("jsd://airport_domain/service");
  parse_test_helper(t,p,'airport_domain',null,null,['service']);
  p=jsdc.parse("jsd://airport_domain@localhost:9090/service");
  parse_test_helper(t,p,'airport_domain','localhost','9090',['service']);
  p=jsdc.parse("jsd://airport_domain/service/function");
  parse_test_helper(t,p,'airport_domain',null,null,['service','function']);
  p=jsdc.parse("jsd://airport_domain@localhost:9090/service/function");
  parse_test_helper(t,p,'airport_domain','localhost','9090',['service','function']);

})


test('uri_parse_not_jsd',function(t) {
  t.plan(1);
  var p;
  p=jsdc.parse("http://airport_domain/service");
  t.notOk(p,"should be null");
})
