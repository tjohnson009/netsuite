/**
 * @NScriptType ScheduledScript
 * @NApiVersion 2.0
 */

define(['N/search', 'N/record'], function(search, record) {
    return {
        execute: function(context) {
        // var savedSearch = search.load({
        // id : 'customsearch_sdr_prod_shortages'
    // }); 

    var searchFilters = [
      search.createFilter({
        name: "custrecord_sdr_prod_pref_qty",
        operator: search.Operator.GREATERTHANOREQUALTO,
        values: 2,
      }),
      search.createFilter({
        name: "subsidiary",
        join: "custrecord_sdr_prod_pref_customer",
        operator: search.Operator.ANYOF,
        values: 1,
      }),
    ]; 
    var searchColumns = [
      search.createColumn({ name: "custrecord_sdr_prod_pref_customer"}),
      search.createColumn({ name: "email", join: 'custrecord_sdr_prod_pref_customer'}),
      search.createColumn({ name: "subsidiary", join: 'custrecord_sdr_prod_pref_customer'}),
      search.createColumn({ name: "custrecord_sdr_prod_pref_item"}),
      search.createColumn({ name: "custrecord_sdr_prod_pref_qty"}),
      search.createColumn({ name: "quantityavailable", join: 'custrecord_sdr_prod_pref_item'}),
    ]; 

    var savedSearch = search.create({
      type: "customrecord_sdr_prod_pref",
      filters: searchFilters, 
      columns: searchColumns
    });
    
    var searchResults = savedSearch.run().getRange({
        start: 0, 
        end: 999
    }); 
    
    for (var i = 0; i < searchResults.length; i++) {
        var result = searchResults[i]; 
        var customerName = result.getText({name: 'custrecord_sdr_prod_pref_customer'});
        var customerEmail = result.getValue({ name: "email", join: 'custrecord_sdr_prod_pref_customer'});
        var subsidiary = result.getText({name: "subsidiary", join: 'custrecord_sdr_prod_pref_customer'});
        var item = result.getText({ name: "custrecord_sdr_prod_pref_item" });
        var prefQuantity = result.getValue({name: "custrecord_sdr_prod_pref_qty"});
        var available = result.getValue({name: "quantityavailable", join: 'custrecord_sdr_prod_pref_item'});
        
        
log.debug('Product Preferences', 'Customer : ' +  customerName + '\n' +
                                             'Customer Email: '      +  customerEmail + '\n' +
                                             'Customer Subsidiary: ' +  subsidiary + '\n' +
                                             'Item : '               +  item + '\n' +
                                             'Preferred Quantity : ' +  prefQuantity + '\n' +
                                             'Quantity Available : ' +  available);
    

        if (parseInt(available) < parseInt(prefQuantity)) {
            var companyID = result.getValue({ name: 'custrecord_sdr_prod_pref_customer'}); 
            var supportCase = record.create({
                type: record.Type.SUPPORT_CASE, 
                isDynamic: true
            }); 
            supportCase.setValue('title', 'Item low for customer'); 
            supportCase.setValue('company', companyID);  
            supportCase.setValue('incomingmessage', 'This company prefers to purchase ' + prefQuantity + ' ' + item + ' each time they create a sales order, but only ' + available + ' are left in stock!'); 
            
            supportCase.save(); 
        }
        }
    }


}
  
});
