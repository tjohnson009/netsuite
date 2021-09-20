function processSalesOrderFinancing(request, response) {
  if (request.getMethod() === 'GET') {
  
var form = nlapiCreateForm("Sales Order Financing");

  form.addField("custpage_sdr_financing_help","help",'Please assign a price to the financing of this sales order, then click "Submit FInancing."');
  

  var orderNum = request.getParameter('custparam_sdr_order_number'); 
  var customer = request.getParameter('custparam_sdr_customer'); 
  var date = request.getParameter('custparam_sdr_date'); 
  var total = request.getParameter('custparam_sdr_total'); 
  
  var fieldOrderNum = form.addField('custpage_sdr_order_number', 'text', 'Order Num');
  var fieldCustomer = form.addField("custpage_sdr_customer", "text","Customer:Project");
    var fieldDate = form.addField("custpage_sdr_date","text","Order Date");
    var fieldTotal = form.addField("custpage_sdr_total", "text", "Total");
    
    fieldOrderNum.setDefaultValue(orderNum); 
    fieldCustomer.setDefaultValue(customer); 
    fieldDate.setDefaultValue(date); 
    fieldTotal.setDefaultValue(total); 

    fieldOrderNum.setDisplayType('inline');
    fieldCustomer.setDisplayType('inline');
    fieldDate.setDisplayType('inline');
    fieldTotal.setDisplayType('inline'); 
    
var fieldFinancingPrice = form.addField('custpage_sdr_financing_price', 'currency', 'Financing Price')

var fieldOrderID = form.addField('custpage_sdr_order_id', 'text'); 
    var orderID = request.getParameter('custparam_sdr_order_id'); 
    fieldOrderID.setDefaultValue(orderID); 
    fieldOrderID.setDisplayType('hidden'); 
  
  form.addSubmitButton("Submit Financing");

  form.setScript("customscript_sdr_cs_salesorder_finance");
  
  response.writePage(form);
  } else {
      var orderID = request.getParameter("custpage_sdr_order_id");
      var financingPrice = request.getParameter('custpage_sdr_financing_price'); 

	nlapiSubmitField(
    "salesorder",
    orderID,
    "custbody_sdr_financing_price",
    financingPrice
  );
  
  nlapiLogExecution(
    "DEBUG",
    "Remaining Usage",
    nlapiGetContext().getRemainingUsage()
  );
      
      nlapiSetRedirectURL('RECORD', 'salesorder', orderID, 'false'); 
  }
}

