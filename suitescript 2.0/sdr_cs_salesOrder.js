/**
 * @NScriptType ClientScript
 * @NApiVersion 2.0
 */

define(["N/record"], function (record) {
  function promiseCall(recordID) {
          var salesRecordPromise = record.load.promise({
            type: record.Type.SALES_ORDER,
            id: recordID,
          }).then(function(salesOrder) {
          console.log("Total: " + salesOrder.getValue("total"));
          }
          );
  }
  
  function nonPromiseCall(recordID) {
        var salesRecord = record.load({
            type: record.Type.SALES_ORDER, 
            id: recordID
        })
        console.log('Total: ' + salesRecord.getValue('total'))
  }
  
    return {
        pageInit: function(context) {
          promiseCall(304);
          promiseCall(176);
          promiseCall(184);
          promiseCall(429);
          promiseCall(431);
          promiseCall(41);
          promiseCall(57);
          promiseCall(59);
          promiseCall(498);
          promiseCall(33);
          promiseCall(816);
          promiseCall(389);
          promiseCall(332);
          promiseCall(157);
          promiseCall(960);
          promiseCall(979);
          promiseCall(1528);
          promiseCall(338);
          promiseCall(976);
          promiseCall(419);

                //   nonPromiseCall(304);
                //   nonPromiseCall(176);
                //   nonPromiseCall(184);
                //   nonPromiseCall(429);
                //   nonPromiseCall(431);
                //   nonPromiseCall(41);
                //   nonPromiseCall(57);
                //   nonPromiseCall(59);
                //   nonPromiseCall(498);
                //   nonPromiseCall(33);
                //   nonPromiseCall(816);
                //   nonPromiseCall(389);
                //   nonPromiseCall(332);
                //   nonPromiseCall(157);
                //   nonPromiseCall(960);
                //   nonPromiseCall(979);
                //   nonPromiseCall(1528);
                //   nonPromiseCall(338);
                //   nonPromiseCall(976);
                //   nonPromiseCall(419);
        }
  };
});
