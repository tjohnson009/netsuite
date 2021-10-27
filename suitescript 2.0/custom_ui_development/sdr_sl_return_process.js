/**
 * @NScriptType Suitelet
 * @NApiVersion 2.0
 * @ModuleScope SameAccount
 */

define(["N/ui/serverWidget"], function (serverWidget) {
  return {
    onRequest: function(context) {
      var request = context.request;
      var response = context.response;
    
      var assistant = serverWidget.createAssistant({
          title: 'Item Return Process'
      }); 

        var logStep = assistant.addStep({
            id: 'custpage_sdr_log_issue', 
            label: 'Log Issue'
        }); 
        
        var refundStep = assistant.addStep({
            id: 'custpage_sdr_refund_credit', 
            label: 'Ask If Refund Or Store Credit'
        });

        var reviewStep = assistant.addStep({
            id: 'custpage_sdr_review_finalize', 
            label: 'Review and Finalize'
        }); 

        if (request.method == 'GET') {
              assistant.currentStep = assistant.getStep({
                 id: 'custpage_sdr_log_issue'
              });
           }
           else {
        
        if (assistant.getLastAction() === serverWidget.AssistantSubmitAction.NEXT || 
            assistant.getLastAction() === serverWidget.AssistantSubmitAction.BACK) {
            assistant.currentStep = assistant.getNextStep();  
        } else if (assistant.getLastAction() === serverWidget.AssistantSubmitAction.FINISH) {
            assistant.finishedHtml = 'You have completed the Item Refund process.';
            assistant.sendRedirect({
              response: response,
            });
        }
    }
        
        var currentStepID = assistant.currentStep == null ? 'custpage_sdr_log_issue' : assistant.currentStep.id;
        
        var instructionsField = assistant.addField({
            id: 'custpage_sdr_instructions', 
            label: 'Instructions', 
            type: serverWidget.FieldType.RICHTEXT, 
        }); 
        instructionsField.updateDisplayType({
            displayType: serverWidget.FieldDisplayType.INLINE
        }); 
        
        switch(currentStepID) {
            case 'custpage_sdr_log_issue': 
            instructionsField.defaultValue =
              "Remind the customer of the following:\n" +
              "<b>1) Custom designed furniture</b> are <b>not eligible</b> for returns. It's part of the contract signed before the engagement.\n" +
              "<b>2) Standard furnitures</b> can only be returned <b>within 7 days</b> of receipt.";
                
            var customerFld = assistant.addField({
                 id: 'custpage_sdr_customer',
                 label: 'Customer',
                 type: serverWidget.FieldType.SELECT,
                 source : 'customer'
              });
              var itemFld = assistant.addField({
                 id: 'custpage_sdr_item',
                 label: 'Item',
                 type: serverWidget.FieldType.SELECT,
                 source: 'item'
              });
              var reasonFld = assistant.addField({
                 id: 'custpage_sdr_reason',
                 label: 'Reason',
                 type: serverWidget.FieldType.TEXTAREA
              }); 
              break;


            case 'custpage_sdr_refund_credit':
                var refundType = assistant.addField({
                 id: 'custpage_sdr_refund_type',
                 label: 'Store Credit',
                 type: serverWidget.FieldType.RADIO, 
                 source: 'Store Credit'
              }); 
                refundType = assistant.addField({
                 id: 'custpage_sdr_refund_type',
                 label: 'Refund',
                 type: serverWidget.FieldType.RADIO, 
                 source: 'Refund'
              }); 
            break; 


            case 'custpage_sdr_review_finalize':
              instructionsField.defaultValue = 'Review the info with the customer before finalizing the call.'
              var customerFld = assistant.addField({
                id: "custpage_sdr_customer",
                label: "Customer",
                type: serverWidget.FieldType.SELECT,
                source: "customer",
              });
              var itemFld = assistant.addField({
                id: "custpage_sdr_item",
                label: "Item",
                type: serverWidget.FieldType.SELECT,
                source: "item",
              });
              var reasonFld = assistant.addField({
                id: "custpage_sdr_reason",
                label: "Reason",
                type: serverWidget.FieldType.TEXTAREA,
              });
              var refundTypeField = assistant.addField({
                id: "custpage_sdr_refund_type",
                label: "Refund Type",
                type: serverWidget.FieldType.TEXT,
              });
              instructionsField.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.INLINE,
              });
              customerFld.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.INLINE,
              });
              itemFld.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.INLINE,
              });
              reasonFld.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.INLINE,
              });
              refundTypeField.updateDisplayType({
                displayType: serverWidget.FieldDisplayType.INLINE,
              });

            var logStep = assistant.getStep({
              id: "custpage_sdr_log_issue",
            });

            var refundStep = assistant.getStep({
              id: "custpage_sdr_refund_credit",
            });
            customerFld.defaultValue = logStep.getValue({id: 'custpage_sdr_customer'})
            itemFld.defaultValue = logStep.getValue({id: 'custpage_sdr_item'})
            reasonFld.defaultValue = logStep.getValue({id: 'custpage_sdr_reason'})
            refundTypeField.defaultValue = refundStep.getValue({id: 'custpage_sdr_refund_type'})
            
            break; 
        }
        
        response.writePage(assistant); 
           
    },
  };
});
