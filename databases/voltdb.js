var VoltClient = require('voltjs/lib/client')
, VoltConstants = require('voltjs/lib/voltconstants');
var VoltProcedure = require('voltjs/lib/query');
var VoltQuery = require('voltjs/lib/query');
var VoltConfiguration = require('voltjs/lib/configuration');
var uuid = require('node-uuid');

var cfg = new VoltConfiguration();
cfg.host = "localhost";
cfg.port = 21212;

var selectApplication = new VoltProcedure('SelectApplication');
var createEvents = new VoltProcedure('CreateEvent', ['string','string', 'string', 'string']);
var configs = []
configs.push(cfg);
var client = new VoltClient(configs);

client.connect(function startup(results,event,results) {
  console.log('Node up');
  dbinit();
}, function loginError(results) {
   console.log('Node Error)');
});
function dbinit()
{
  //TODO: add automatic db creation and first application
  console.log("initialization to here");
  connectionStats();
}
function connectionStats() {
  client.connectionStats();
}
exports.createEvent = function (data, callback) {
   console.log("creating event")
   var query = createEvents.getQuery()
   var uuid1 = uuid.v4(); 
   query.setParameters([uuid1,data[0],data[1],data[2]]);
   client.callProcedure(query, callback);
};
exports.getApps = function (callback) {
   var query = selectApplication.getQuery();
   query.setParameters([]);
   client.callProcedure(query, callback);
};

