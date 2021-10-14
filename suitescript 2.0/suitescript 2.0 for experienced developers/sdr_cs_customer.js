/**
 * @NScriptType ClientScript
 * @NApiVersion 2.0
 */

define(["N/runtime", 'N/ui/message'], function(runtime, message) {
  return {
    saveRecord: function(context) {
        
        var displayMessage = runtime.getCurrentScript().getParameter({name: 'custscript_sdr_display_notification'})
        if (displayMessage) {
            var customer = context.currentRecord; 
            var custName = customer.getValue('entityid'); 
            
          var notify = confirm("Please call " + custName + " to welcome them as a customer before saving this record. Click Cancel to go back to the record.");
            var uiMessage = message.create({
              type: message.Type.WARNING,
              title: "Customer contact reminder",
              message:
                "Please call " +
                custName +
                " to welcome them as a customer before saving this record. Click Cancel to go back to the record.",
            }); 
            
            uiMessage.show(10000); 
            return notify; 
        }
    }
  };
});

