function getProductPreferences() {
  var searchFilters = [
    new nlobjSearchFilter(
      "custrecord_sdr_prod_pref_qty",
      null,
      "greaterthanorequalto",
      2
    ),
    new nlobjSearchFilter(
      "subsidiary",
      "custrecord_sdr_prod_pref_customer",
      "anyof",
      1
    ),
  ];

  var searchColumns = [
    new nlobjSearchColumn("subsidiary", "custrecord_sdr_prod_pref_customer"),
    new nlobjSearchColumn("custrecord_sdr_prod_pref_customer"),
    new nlobjSearchColumn("custrecord_sdr_prod_pref_item"),
    new nlobjSearchColumn("quantityavailable", "custrecord_sdr_prod_pref_item"),
    new nlobjSearchColumn("custrecord_sdr_prod_pref_qty"),
    new nlobjSearchColumn("email", "custrecord_sdr_prod_pref_customer"),
    new nlobjSearchColumn("custentity_sdr_support_email", "custrecord_sdr_prod_pref_customer"
    ),
  ];

  var searchResults = nlapiSearchRecord(
    "customrecord_sdr_prod_pref",
    "customsearch_sdr_prod_shortages",
    searchFilters,
    searchColumns
  );
  
  for (var i in searchResults) {
    var record = searchResults[i];
    
    var subsidiaryID = record.getValue(searchColumns[0]);
    var customerID = record.getValue(searchColumns[1]);
    var itemID = record.getValue(searchColumns[2]);
    var qtyAvailableID = record.getValue(searchColumns[3]);
    var preferredQuantity = record.getValue(searchColumns[4]);
    var email = record.getValue(searchColumns[5]);
    var suppEmail = record.getValue(searchColumns[6]);

    var subsidiaryName = record.getText(searchColumns[0]);
    var customerName = record.getText(searchColumns[1]);
    var itemName = record.getText(searchColumns[2]);
    
    nlapiLogExecution(
      "DEBUG",
      "Search Results",
      "Quantity Available: " +
        qtyAvailableID +
        "\n" +
        "Subsidiary Id: " +
        subsidiaryID +
        "\n" +
        "Subsidiary Name: " +
        subsidiaryName +
        "\n" +
        "Customer Id: " +
        customerID +
        "\n" +
        "Customer Name: " +
        customerName +
        "\n" +
        "Item Id: " +
        itemID +
        "\n" +
        "Item Name: " +
        itemName +
        "\n" +
        "Preferred Quantity: " +
        preferredQuantity +
        "\n" +
        "Customer Email: " +
        email + '\n' +
        'Support Email:' + 
        suppEmail
    );
    
    if (parseInt(preferredQuantity) > parseInt(qtyAvailableID)) {
    var supportCase = nlapiCreateRecord('supportcase'); 
    supportCase.setFieldValue('title', 'Item Low For Customer'); 
    supportCase.setFieldValue('company', customerID); 
    supportCase.setFieldValue('email', suppEmail); 
    supportCase.setFieldValue('incomingmessage', 
    'This company prefers to purchase ' + preferredQuantity + ' ' + itemName + ' bueach time they create a Sales Order, but only ' + qtyAvailableID + ' is left in stock!'
    )
  
     var newSupportCaseID = nlapiSubmitRecord(supportCase); 
    }
  }
  // var stop = 0; // for debugging only
}

// ss1extend083121TJ@netsuite.com