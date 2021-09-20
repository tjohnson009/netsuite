function addTask(type) {
    
    var context = nlapiGetContext(); 
    var customerID = context.getSetting("SCRIPT", "custscript_sdr_customer_id");

    var initializeValues = {customform: -120};
    
    var customerRecord = nlapiLoadRecord('customer', customerID); 
    var salesRepID = customerRecord.getFieldValue('salesrep'); 
    
        var task = nlapiCreateRecord("task", initializeValues);
        task.setFieldValue("title", "New Customer Follow-Up");
        if (salesRepID != "") {
          task.setFieldValue("assigned", salesRepID);
        }

        task.setFieldValue("message", "Please follow up with this customer!");
        task.setFieldValue("company", customerID);
        task.setFieldText("priority", "High");

        var startDate = task.getFieldValue("startdate");
        var startDateAsDate = nlapiStringToDate(startDate);
        var dateEndDate = nlapiAddDays(startDateAsDate, 30);
        var endDateString = nlapiDateToString(dateEndDate);
        task.setFieldValue("duedate", endDateString);

        nlapiSubmitRecord(task);

    }