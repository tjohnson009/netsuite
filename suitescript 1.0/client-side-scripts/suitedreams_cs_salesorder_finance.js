function saveRecord() {
    var financingPrice = nlapiGetFieldValue('custpage_sdr_financing_price');
    var salesTotal = nlapiGetFieldValue('total'); 
    if (parseFloat(parseInt(financingPrice)) < parseFloat(parseInt(total))) {
        alert('Financing price is too low. Adjust and try again.') 
        return false;
    } else {
        return true; 
    }
}