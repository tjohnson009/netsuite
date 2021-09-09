function saveRecordCheck(type) {
    var numProdPref = nlapiGetLineItemCount(
    "recmachcustrecord_sdr_prod_pref_customer"
  );
  var totalProdPref = 0; 
        for (var i = 0; i < numProdPref; i++) {
            totalProdPref += parseInt(
              nlapiGetLineItemValue(
                "recmachcustrecord_sdr_prod_pref_customer",
                "custrecord_sdr_prod_pref_qty",
                i + 1
              )
            );
        }
        if (totalProdPref > 25) {
            alert('The total preferred quantity across all product preferences has exceeded the limit of 25! Please adjust accordingly.')
        } 
    
      //_______________
      
      var type = nlapiGetRecordType(); 
    if (type === 'customer') {
        var couponCode = nlapiGetFieldValue("custentity_sdr_coupon_code");
        var supportEmail = nlapiGetFieldValue("custentity_sdr_support_email");
        nlapiLogExecution("DEBUG", "Support Email", supportEmail);
        nlapiLogExecution("DEBUG", "Coupon Code", couponCode);
        return true; 
    } else {
    var confirmation = confirm("Click confirm to save changes. Click cancel to comtinue editing."); 
        if (confirmation) {
            return true; 
        } else {
            return false; 
        }
    }
}

function pageInitRecord() {
  var numProdPref = nlapiGetLineItemCount(
    "recmachcustrecord_sdr_prod_pref_customer"
  );
  alert("This customer has " + numProdPref + " product preferences.");
}

function lineInitRecord(type) {
    if (type === 'recmachcustrecord_sdr_prod_pref_customer') {
      var productPrefLineValue = nlapiGetCurrentLineItemValue(type, 
        'custrecord_sdr_prod_pref_qty'); 
        if (productPrefLineValue === '') {
            nlapiSetCurrentLineItemValue(type, 'custrecord_sdr_prod_pref_qty', 1); 
        }
      }
}

function validateLineRecord(type) {
    if (type === 'recmachcustrecord_sdr_prod_pref_customer') {
        var prefQty = nlapiGetCurrentLineItemValue(type,"custrecord_sdr_prod_pref_qty");
        if (parseInt(prefQty) > 10) {
            alert('You have selected a preferred quantity that exceeds the limit of 10!'); 
            return false; 
        } else {
            return true; 
        }
    }
}
