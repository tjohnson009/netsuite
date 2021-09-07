function pageInit() {
    // alert('Hello World!'); 
    //support email 
    var supportEmail = nlapiGetFieldValue("custentity_sdr_support_email");
    if (supportEmail === '') {
        nlapiSetFieldValue("custentity_sdr_support_email", nlapiGetFieldValue('email'));
    }
    //coupon code
    var applyCouponStatus = nlapiGetFieldValue("custentity_sdr_apply_coupon");
    var couponCodeStatus = nlapiGetFieldValue("custentity_sdr_coupon_code");
    // alert(applyCouponStatus); 
    if (applyCouponStatus === 'T') {
        // need to set coupon code status to enabled
        nlapiDisableField("custentity_sdr_coupon_code", false); 
    } else {
        nlapiDisableField("custentity_sdr_coupon_code", true); 
    }
}

function showSupportFrequency() {
    var supportFreq = nlapiGetFieldText("custentity_sdr_support_frequency");
    var internalID = nlapiGetFieldValue("custentity_sdr_support_frequency"); 
    alert('Support frequency: ' + supportFreq + ' and internalID: ' + internalID)
}

function fieldChanged(type, name, linenum) {
    var supportEmail = nlapiGetFieldValue("custentity_sdr_support_email");
    if (name === 'email') {
        if (!supportEmail) {
          nlapiSetFieldValue("custentity_sdr_support_email", nlapiGetFieldValue("email"), false);
        }
    }

    if (name === 'custentity_sdr_apply_coupon') {
        var applyCouponStatus = nlapiGetFieldValue('custentity_sdr_apply_coupon');
        if (applyCouponStatus === 'T') {
            nlapiDisableField('custentity_sdr_coupon_code', false);
        } else {
            nlapiDisableField('custentity_sdr_coupon_code', true);
            nlapiSetFieldValue('custentity_sdr_coupon_code', '', false);
        }
    }
}

function saveRecord() {
    var couponCode = nlapiGetFieldValue('custentity_sdr_coupon_code'); 
    var applyCouponStatus = nlapiGetFieldValue('custentity_sdr_apply_coupon');
    if (applyCouponStatus === 'T') {
        if (couponCode.length !== 5) {
            alert('This coupon code is not the correct length and therefore invalid. Please try again.'); 
            return false; 
        }
    }
        return true; 
}

function validateField(type, name, linenum) {
    if (name === "custentity_sdr_coupon_code") {
      var applyCouponStatus = nlapiGetFieldValue("custentity_sdr_apply_coupon");
      var couponCode = nlapiGetFieldValue("custentity_sdr_coupon_code");
      if (applyCouponStatus === "T") {
        if (!couponCode.length) {
          return true;
        } else if (couponCode.length !== 5) {
          alert("You need 5 characters for a valid coupon code...");
          return false;
        }
      }
    }
    return true;
}


