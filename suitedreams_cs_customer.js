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
    if (name === 'email') {
        if (!supportEmail) {
          nlapiSetFieldValue("custentity_sdr_support_email", nlapiGetFieldValue("email"), false);
        }
    }
}



