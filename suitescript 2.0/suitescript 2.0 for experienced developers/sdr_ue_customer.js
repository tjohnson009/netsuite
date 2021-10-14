/**
 * @NScriptType UserEventScript
 * @NApiVersion 2.0
 */

define([
  "N/record",
  "N/email",
  "./lib/sdr_error_handler",
], function (record, email, errorHandler) {
  return {
    afterSubmit: function (context) {
      var customer = context.newRecord;
      var customerInternalID = customer.id;
      var salesRepID = customer.getValue("salesrep");
      var customerName = customer.getValue("entityid");
      var salesRepName = customer.getText("salesrep");
      log.debug(salesRepID, customerName + " " + customerInternalID);
      
    //   email.send({
    //     author: salesRepID,
    //     recipients: [customerInternalID],
    //     subject: "Welcome to SuiteDreams!",
    //     body: "Welcome! We are glad for you to be a customer of SuiteDreams!",
    //   });

      try {
        var salesRepRecord = record.load({
          type: record.Type.EMPLOYEE,
          id: salesRepID,
        });

        var existingNotes = salesRepRecord.getValue("comments");
        salesRepRecord.setValue(
          "comments",
          (existingNotes += "Welcome email sent successfully")
        );

        salesRepRecord.save();
        
        log.audit({
          title: "Welcome email sent",
          details: "Sent to: " + customerName + " Sent By: " + salesRepName,
        });
      } catch (e) {
        errorHandler.customLog(e); 
        log.debug('Error in UE Script', e.name)
      }
    },
  };
});
