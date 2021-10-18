/**
 * @NScriptType MapReduce
 * @NApiVersion 2.0
 */

define(["N/search"], function(search) {
  return {
    getInputData: function(context) {
        return {
            type: 'search', 
            id: 152
        }
    }, 

    map: function(context) {
        var searchResult = JSON.parse(context.value); 

        Response.write({
            key: searchResult.values.statusRef.value, 
            value: searchResult.values.value
        })
    }, 

    reduce: function(context) {

    }, 

    summarize: function(context) {

    }
  };
});
