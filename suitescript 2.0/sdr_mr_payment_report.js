/**
 * @NScriptType MapReduceScript
 * @NApiVersion 2.0
 */

define(["N/search", 'N/runtime'], function (search, runtime) {
  return {
    getInputData: function() {
      var script = runtime.getCurrentScript();
      var custInternal = script.getParameter({
        name: "custscript_sdr_mr_cust_internal_id_",
      });
      
      var paymentSearch = search.create({
        type: search.Type.TRANSACTION,
        filters: [
          ["type", search.Operator.ANYOF, "CustPymt"],
          "and",
          ["mainline", search.Operator.IS, true],
          "and",
          ["entity", search.Operator.ANYOF, custInternal],
        ],
        columns: ["entity", "statusref", "amount"]
      });
      return paymentSearch;
    }, 
    
    map: function(context) {
        var searchResult = JSON.parse(context.value); 
        // log.debug('context.values (map)', context.value); 
        // log.debug('context.values (map)', searchResult); 

        context.write({
            key: searchResult.values.entity.text, 
            value: {
              status: searchResult.values.statusref.value, 
              amount: searchResult.values.amountpaid
            }
        })
    
    }, 

    reduce: function(context) { // this gets the map key value pairs as a parameter
      var depositedTotal = 0; 
      var undepositedTotal = 0; 
      var values = context.values; 

      for (var i in values) {
        var value = JSON.parse(values[i]); 
        var status = value.status; 
        var amount = parseFloat(value.amount);
        if (status === 'deposited') {
          depositedTotal += amount; 
        }
        
        if (status === 'undeposited') {
          undepositedTotal += amount; 
        }
        
        log.debug(context.key, 'Deposited Total: ' + depositedTotal + '\n' + 
        'Undeposited Total: ' + undepositedTotal); 
      }
    }, 

    summarize: function(summary) {
      log.debug('Usage Consumed: ', summary.usage); 
      log.debug('Number of Queues Used: ', summary.concurreny); 
      log.debug('Number of Yields Done: ', summary.yields);
    }

  };
});
