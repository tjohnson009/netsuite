/**
 * @NScriptType MapReduceScript
 * @NApiVersion 2.0
 */

define(["N/record",], function (record) {
  return {
    getInputData: function() {
      var script = runtime.getCurrentScript(); 
      var internalID = script.getParameter({
        name: 'custscript_sdr_mr_cust_internal_id_',
      }); 
      
      var searchFilters = [
                ['type', search.Operator.ANYOF, 'CustPymt'], 'and',
               ['mainline', search.Operator.IS, true], 'and',
               ['entity', search.Operator.ANYOF, customerId]
      
      ]; 

      var paymentSearch = search.create({
        type: search.Type.TRANSACTION,
        filters: searchFilters,
        columns: ["entity", "statusref", "amount"],
      });
      return {
        paymentSearch
        };
    }, 

    map: function(context) {
        var searchResult = JSON.parse(context.value); 

        log.debug(searchResult.values.value); 


    }

  };
});
