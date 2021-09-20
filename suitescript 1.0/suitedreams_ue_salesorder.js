function afterSubmit() {
    var salesOrder = nlapiGetNewRecord(); 
    var orderNumber = salesOrder.getFieldValue("tranid"); 
    var customer = salesOrder.getFieldText("entity"); 
    var date = salesOrder.getFieldValue("trandate"); 
    var total = salesOrder.getFieldValue("total"); 
    
    var orderInfo = {
        custparam_sdr_order_number: orderNumber, 
        custparam_sdr_customer: customer, 
        custparam_sdr_date: date, 
        custparam_sdr_total: total, 
        custparam_sdr_order_id: salesOrder.getId()
    }
    
    nlapiSetRedirectURL(
      "SUITELET",
      "customscript_sdr_sl_salesorder_finance",
      "customdeploy_sdr_sl_salesorder_finance", 
      null, 
      orderInfo
    );

}