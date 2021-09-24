/**
 * @NScriptType ClientScript
 * @NApiVersion 2.0
 */

define(function() {
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
        
        if (applyCoupon && parseInt(couponCode.length) !== 5) {
            alert('Invalid coupon code: Must be 5 characters in length'); 
            return false; 
        } else {
            return true; 
        }
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
                return true;
            }
    }

    return {
        fieldChanged: fieldChanged, 
        saveRecord: saveRecord
    }
}); 
