const {BigQuery} = require('@google-cloud/bigquery');

var Init = async function(){
    const bigquery = await new BigQuery();
    return bigquery;
}
function getWhereCondition(params){
    var conditions = params.map(function(p){
        if(p.name && p.value){
            return `${p.name} like '%${p.value}%'`
        }
        return ""   
    })
    return conditions.join(" AND ")
}
async function query(client , params,limit) {
    
    // Queries the U.S. given names dataset for the state of Texas.
    var query = `SELECT id,url,title,text,time,time_ts FROM \`bigquery-public-data.hacker_news.stories\``;
    _whereConditions = getWhereCondition(params || [])
    if (_whereConditions) {
        query = `${query} where ${_whereConditions}`
    } 
    query = `${query} limit ${limit||100};`
    console.log(`Query :\n\n ${query} \n\n\n`)
    // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
    const options = {
      query: query,
      // Location must match that of the dataset(s) referenced in the query.
      location: 'US',
    };
  
    // Run the query as a job
    const [job] = await client.createQueryJob(options);
    console.log(`Job ${job.id} started.`);
  
    // Wait for the query to finish
    const [rows] = await job.getQueryResults();
  
    // Print the results
    console.log('Rows:');
    rows.forEach(row => console.log(row));
    return rows;
  }

module.exports = {
    Init :Init,
    Query: query
}