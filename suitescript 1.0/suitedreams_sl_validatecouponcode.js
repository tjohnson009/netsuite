function validateCouponCode() {
    var couponCode = request.getParameter('custparam_sdr_coupon_code'); 

    if (couponCode !== 'ABC12') {
        response.write('F'); 
    } else {
        response.write('T'); 
    }
}