/**
 * @NScriptType WorkFlowActionScript
 * @NApiVersion 2.0
 */

define(["N/record", 'N/runtime'], function (record, runtime) {
  return {
    onAction: function(context) {
        var script = runtime.getCurrentScript(); 
        var orderDate = script.getParameter({
            name: 'custscript_sdr_order_date'
        }); 

        var salesOrder = context.newRecord;
        var lineItemNum = salesOrder.getLineCount({
            sublistId: 'item'
        });  
        var notes = 'Last Order Date: ' + orderDate + '\n'
        + 'Unique Items Ordered: ' + lineItemNum; 
        
        var customerIID = salesOrder.getValue({
            fieldId: 'entity'
        }); 

        var customerRecord = record.load({
            type: record.Type.CUSTOMER, 
            id: customerIID
        }); 

        customerRecord.setValue({
            fieldId: 'comments', 
            value: notes
        }); 
        var customerID = customerRecord.save(); 

        if (customerID){
            return 'SUCCESS'
        } else {
            return 'FAILURE'
        }
    }
  };
});
