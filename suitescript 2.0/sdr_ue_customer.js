/**
 * @NScriptType UserEventScript
 * @NApiVersion 2.0
 */

define(['N/record', 'N/email', 'N/runtime', 'N/task'], function(record, email, runtime, taskModule) {
    return {
        beforeSubmit: function(context) {
            var customer = context.newRecord; 
            
            // if (context.type === context.UserEventType.CREATE) {
            var salesRep = customer.getValue('salesrep'); 
            if (!salesRep) {
                throw 'Save failure. Ensure sales rep field is occupied.'
            }
            // }
        },
        
        afterSubmit: function(context) {
            // log.debug('Hello world!'); 
            var customer = context.newRecord; 
            var customerName = customer.getValue("entityid");
            var customerEmail = customer.getValue('email'); 
            // var salesRepName = customer.getText('salesrep'); // this threw an error for some reason...
            var salesRep = customer.getValue("salesrep");
            var couponCode = customer.getValue("custentity_sdr_coupon_code");
            
            log.audit('Customer ID', customerName); 
            log.audit('Customer Email', customerEmail); 
            // log.audit('Sales Rep', salesRepName); 
            log.audit('Sales Rep ID', salesRep); 
            log.audit('Coupon Code', couponCode); 
            
            
            if (context.type == context.UserEventType.CREATE) {
                var task = record.create({
                    type: record.Type.TASK, 
                    defaultValues: {
                        customform: -120 
                    }
                }); 
                
                task.setValue('title', 'New Customer Follow-Up'); 
                task.setValue('priority', 'HIGH'); //list record and dropdowns are normally set with the internal ID of the value, but this is an exception
                task.setValue('message', 'TEST MESSAGE'); 
                task.setValue('company', customer.id);
                if (salesRep) {
                    task.setValue('assigned', salesRep);  
                }
                task.save(); 
            }
            var currentUser = runtime.getCurrentUser(); 
            
            email.send({
                author: currentUser.id,
                recipients: customer.id, // email address or internal ID of recipients
              subject: "WELCOME TO SUITESCRIPT!",
              body: 'Do not worry! This is suitescript!'
            });
        
        // var event = record.create({
        //     type: record.Type.CALENDAR_EVENT, 
        //     isDynamic: true
        // }); 
        
        // event.setValue('title', 'Welcome conversation with ' + customerName); 
        // event.setValue('sendemail', true); 
        // event.setValue('company', customer.id); 
        
        // event.selectNewLine({
        //   sublistId: "attendee",
        // });
        // event.setCurrentSublistValue({
        //     sublistId: 'attendee', 
        //     fieldId: 'attendee', 
        //     value: customer.id
        // }); 
        // event.commitLine({sublistId: 'attendee'}); 
        
        // event.selectNewLine({
        //   sublistId: "attendee",
        // });
        // event.setCurrentSublistValue({
        //   sublistId: "attendee",
        //   fieldId: "attendee",
        //   value: salesRep,
        // });
        // event.commitLine({ sublistId: "attendee" }); 

        // event.save(); 
        
        var customerInternalID = customer.id; 
        var mrScript = taskModule.create({
          taskType: taskModule.TaskType.MAP_REDUCE,
          scriptId: 97,
          deploymentId: "customdeploy_sdr_mr_payment_report",
          params: {
            custscript_sdr_mr_cust_internal_id_: customerInternalID,
          },
        }); 
            
            mrScript.submit(); 
        }
    }
}); 
