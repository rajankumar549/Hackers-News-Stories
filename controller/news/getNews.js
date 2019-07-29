
var bigQuery = require("./../../resource/bigQuery");


module.exports = async function(params){
    var bigqueryClient =  await bigQuery.Init();
    var rows = await bigQuery.Query(bigqueryClient,params);
    return rows;
};