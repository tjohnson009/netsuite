/**
 * @NScriptType UserEventScript
 * @NApiVersion 2.0
 */

define(["N/redirect"], function (redirect) {
  return {
      afterSubmit: function(context) {
          var salesOrder = context.newRecord; 
          var orderNum = salesOrder.getValue('tranid'); 
          var customerName = salesOrder.getText('entity'); 
          var orderTotal = salesOrder.getValue('total'); 
          var salesOrderID = salesOrder.id; 

          var financingPrice = salesOrder.getValue(
            "custbody_sdr_financing_price"
          );
          
          redirect.toSuitelet({ //passes to the request object
            scriptId: "customscript_sdr_sl_salesorder_finance",
            deploymentId: "customdeploy_sdr_sl_salesorder_finance",
            parameters: {
                custparam_sdr_ordernum: orderNum, 
                custparam_sdr_customername: customerName, 
                custparam_sdr_ordertotal: orderTotal, 
                custparam_sdr_financingprice: financingPrice, 
                custparam_sdr_order_id: salesOrderID
            }
          }); 
      }
  };
});
