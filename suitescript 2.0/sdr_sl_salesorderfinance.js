/**
 * @NScriptType Suitelet
 * @NApiVersion 2.0
 */

define(["N/record", 'N/redirect', 'N/ui/serverWidget'], function (record, redirect, serverWidget) {
  return {
    onRequest: function(context) {
        var request = context.request; 
        var response = context.response;
        
        if (request.method == 'GET') {
        var orderNum = request.parameters.custparam_sdr_ordernum; 
        var customerName = request.parameters.custparam_sdr_customername; 
        var orderTotal = request.parameters.custparam_sdr_ordertotal; 
        var orderID = request.parameters.custparam_sdr_order_id; 
        var financingPrice = request.parameters.custparam_sdr_financingprice;

        var form = serverWidget.createForm({
            title: "Sales Order Financing"
        }); 

        var fldHelp = form.addField({
            id: 'custpage_sdr_financing_help', 
            type: serverWidget.FieldType.HELP, 
            label: 'Please assign a price to the financing of this sales order, then click Submit Financing', 
        }); 
        var fldOrderNum = form.addField({
            id: 'custpage_ordernum', 
            type: serverWidget.FieldType.TEXT, 
            label: 'Order Num', 
        }); 
        var fldCustomerName = form.addField({
            id: 'custpage_customername', 
            type: serverWidget.FieldType.TEXT, 
            label: 'Customer Name', 
        }); 
        var fldOrderTotal = form.addField({
            id: 'custpage_ordertotal', 
            type: serverWidget.FieldType.CURRENCY, 
            label: 'Order Total', 
        }); 
        var fldfinancingPrice = form.addField({
            id: 'custpage_financing_price', 
            type: serverWidget.FieldType.CURRENCY, 
            label: 'Financing Price', 
        }); 
        var fldOrderID = form.addField({
            id: 'custpage_order_id', 
            type: serverWidget.FieldType.TEXT, 
            label: 'Order ID', 
        }); 
        
        fldOrderNum.defaultValue = orderNum; 
        fldCustomerName.defaultValue = customerName; 
        fldOrderTotal.defaultValue = orderTotal;
        fldfinancingPrice.defaultValue = financingPrice;
        fldOrderID.defaultValue = orderID; 
        
        fldOrderNum.updateDisplayType({ displayType: serverWidget.FieldDisplayType.INLINE}); 
        fldCustomerName.updateDisplayType({ displayType: serverWidget.FieldDisplayType.INLINE}); 
        fldOrderTotal.updateDisplayType({ displayType: serverWidget.FieldDisplayType.INLINE});
        fldOrderID.updateDisplayType({ displayType: serverWidget.FieldDisplayType.HIDDEN});
    
        form.addSubmitButton('Save Finance Info'); 
        
        response.writePage(form);
    } else { //post
        var orderId = request.parameters.custpage_order_id;
        var financingPriceFinal = request.parameters.custpage_financing_price;
        // update sales order
        //load record
            var order = record.load({
              type: record.Type.SALES_ORDER,
              id: orderId, 
            });
        //update record
            order.setValue({
              fieldId: 'custbody_sdr_financing_price',
              value: financingPriceFinal
            });
            order.save(); 
        
        //redirect back to sales order
        redirect.toRecord({
            id: orderId, 
            type: record.Type.SALES_ORDER, 
        }); 

    }
    }
  };
});
