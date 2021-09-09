function beforeSubmit() {
    var customerRecord = nlapiGetNewRecord(); 
    
    var id = customerRecord.getFieldValue('entityid'); 
    var type = customerRecord.getFieldValue("isperson"); 
    var salesRep = customerRecord.getFieldText("salesrep"); 
    var email = customerRecord.getFieldValue("email"); 
    var phone = customerRecord.getFieldValue("phone"); 
    
    nlapiLogExecution('DEBUG', 'ID', id); 
    nlapiLogExecution('DEBUG', 'type', type); 
    nlapiLogExecution('DEBUG', 'salesrep', salesRep); 
    nlapiLogExecution('DEBUG', 'email', email); 
    nlapiLogExecution('DEBUG', 'phone', phone); 

    var context = nlapiGetContext(); 

    nlapiLogExecution('DEBUG', 'Logged In User', context.getRole()); 
    nlapiLogExecution('DEBUG', 'User Location', context.getLocation()); 
}

function afterSubmit(type) {
    var customerRecord = nlapiGetNewRecord(); 
    var customerID = customerRecord.getId(); 
   var salesRepID = customerRecord.getFieldValue("salesrep");
    var attachToRecord = {
        entity: customerID
    };  
    if (salesRepID) {
    var employeeRecord = nlapiLoadRecord('employee', salesRepID); 
    var salesRepEmail = employeeRecord.getFieldValue('email'); 
    var ccEmail = null; 
    }
    var context = nlapiGetContext(); 
    var sendingEmployee = context.getUser(); 
    var toEmail = customerRecord.getFieldValue('email'); 
    if (toEmail !== '') {
    nlapiSendEmail(sendingEmployee, toEmail, 'Welcome To SuiteDreams', 'Welcome!', salesRepEmail, null, attachToRecord);
}

var initializeValues = {
    customform: -120, 
}; 


var task = nlapiCreateRecord("task", initializeValues);
    task.setFieldValue("title", "New Customer Follow-Up");
if (salesRepID != "") {
  task.setFieldValue("assigned", salesRepID);
}
    
    task.setFieldValue("message", "Please follow up with this customer!");
    task.setFieldValue("company", customerID);
    task.setFieldText("priority", "High");
    
    var startDate = task.getFieldValue('startdate');
    var startDateAsDate = nlapiStringToDate(startDate); 
    var dateEndDate = nlapiAddDasy(startDateAsDate, 30); 
    var endDateString = nlapiDateToString(dateEndDate); 
    task.setFieldValue('duedate', endDateString); 
    
    nlapiSubmitRecord(task);
}
