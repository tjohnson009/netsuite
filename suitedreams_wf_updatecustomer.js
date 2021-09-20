function updateCustomer() {
    var context = nlapiGetContext(); 
    var orderDate = context.getSetting("SCRIPT", "custscript_sdr_order_date"); 
    
    var orderRecord = nlapiGetNewRecord(); 
    var itemLineCount = orderRecord.getLineItemCount('item'); 
    
    var note = 'Last Order Date: ' + orderDate + '\n' 
    + 'Unique Items Ordered: ' + itemLineCount; 
    
    var customerID = orderRecord.getFieldValue('entity'); 
    var customerRecord = nlapiLoadRecord('customer', customerID)
    customerRecord.setFieldValue('comments', note); 
    customerID = nlapiSubmitRecord(customerRecord); 

if (customerID == '') {
    return 'F';
} else {
    return 'T'; 
}
}