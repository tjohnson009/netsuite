/**
 * @NScriptType ClientScript
 * @NApiVersion 2.0
 */

define(function() {
    function pageInit(context) {
        var customerRecord = context.currentRecord; 
        var numProdPref = customerRecord.getLineCount({
            sublistId: "recmachcustrecord_sdr_prod_pref_customer"
        });
        
        alert('This customer has ' + numProdPref + ' product preferences. Be aware.')
    }

    function lineInit(context) {
        if (context.sublistId === "recmachcustrecord_sdr_prod_pref_customer") {
          var customer = context.currentRecord;
          var preferredQuantity = parseInt(customer.getCurrentSublistValue(context.sublistId, "custrecord_sdr_prod_pref_qty"));
          if (isNaN(preferredQuantity)) {
            customer.setCurrentSublistValue(context.sublistId, "custrecord_sdr_prod_pref_qty", 1);
          }
        }

    }
    
    function fieldChanged(context) {
        if (context.fieldId === 'custentity_sdr_apply_coupon') {
            var customer = context.currentRecord; 
            var couponCheckbox = customer.getValue("custentity_sdr_apply_coupon");
            
            var couponField = customer.getField({
                fieldId: "custentity_sdr_coupon_code"
            });
            
            if (couponCheckbox) {
                couponField.isDisabled = false; 
            } else {
                customer.setValue({
                  fieldId: "custentity_sdr_coupon_code",
                  value: ''
                });
                couponField.isDisabled = true; 
            }
            
        }
    };
    
    function saveRecord(context) {
            var record = context.currentRecord; 
            var applyCoupon = record.getValue("custentity_sdr_apply_coupon");
            var couponCode = record.getValue("custentity_sdr_coupon_code");
            var sublistID = "recmachcustrecord_sdr_prod_pref_customer";
            var preferenceCount = record.getLineCount({
              sublistId: sublistID,
            }); 
            var totalPref = 0; 
            for (var i = 0; i < preferenceCount; i++) {
                var num = record.getSublistValue({
                  sublistId: sublistID,
                  fieldId: "custrecord_sdr_prod_pref_qty",
                  line: i
                });
                totalPref += parseInt(num); 
            }

            if (totalPref > 25) {
                alert('The total number of product preferences exceeds the limit of 25!'); 
                return false; 
            }

        if (applyCoupon && parseInt(couponCode.length) !== 5) {
            alert('Invalid coupon code: Must be 5 characters in length'); 
            return false; 
        }
        return true; 
    }

    function validateField(context) {
        if (context.fieldId === "custentity_sdr_coupon_code") {
        var record = context.currentRecord; 
        var applyCoupon = record.getValue("custentity_sdr_apply_coupon");
        var couponCode = record.getValue("custentity_sdr_coupon_code");

                if (applyCoupon && parseInt(couponCode.length) !== 5) {
                  alert("Invalid coupon code: Must be 5 characters in length");
                  return false;
                } 
            }
        return true;
    }

    function validateLine(context) {
        var customer = context.currentRecord; 
        if (context.sublistId === 'recmachcustrecord_sdr_prod_pref_customer') {
            var prefQuantity = parseInt(customer.getCurrentSublistValue({
              sublistId: context.sublistId,
              fieldId: "custrecord_sdr_prod_pref_qty",
            }));
            
            if (prefQuantity > 10) {
                alert('You have selected a preferred quantity that exceeds the limit of 10!'); 
                return false; 
            }
        }
        return true; 
    } 
    
    return {
        fieldChanged: fieldChanged, 
        saveRecord: saveRecord, 
        pageInit: pageInit, 
        validateField: validateField, 
        validateLine: validateLine, 
        lineInit: lineInit
    }
}); 
