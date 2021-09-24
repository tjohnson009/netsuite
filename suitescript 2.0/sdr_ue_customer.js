/**
 * @NScriptType UserEventScript
 * @NApiVersion 2.0
 */

define(function() {
    return {
        afterSubmit: function(context) {
            // log.debug('Hello world!'); 
            var record = context.newRecord; 
            var customerID = record.getValue("entityid");
            var customerEmail = record.getValue('email'); 
            var salesRepName = record.getText('salesrep'); 
            var couponCode = record.getValue("custentity_sdr_coupon_code");

            log.audit('Customer ID', customerID); 
            log.audit('Customer Email', customerEmail); 
            log.audit('Sales Rep', salesRepName); 
            log.audit('Coupon Code', couponCode); 
        }, 
        
    }
}); 

