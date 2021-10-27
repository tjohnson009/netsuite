/**
 * @NScriptType Suitelet
 * @NApiVersion 2.0
 */

define(["N/search", "N/ui/serverWidget"], function (search, serverWidget) {
  return {
    onRequest: function(context) {
        var response = context.response;
        var request = context.request;

        //build section
        var list = serverWidget.createList({
            title: 'Complete List of Sales Reps'
        }); 

        list.style = serverWidget.ListStyle.NORMAL; 
        list.addColumn({
            id: 'entityid',
            label: 'Sales Rep', 
            type: serverWidget.FieldType.TEXT
        }); 
        list.addColumn({
            id: 'email',
            label: 'Email', 
            type: serverWidget.FieldType.TEXT
        }); 
        list.addColumn({
            id: 'title',
            label: 'Job Title', 
            type: serverWidget.FieldType.TEXT
        }); 
        list.addColumn({
            id: 'department',
            label: 'Department', 
            type: serverWidget.FieldType.TEXT
        }); 

        //search section
        var salesRepSearch = search.create({
          type: search.Type.EMPLOYEE,
          filters: [["salesrep", search.Operator.IS, "true"]],
          columns: ["entityid", "email", "title", "department"],
        }); 
        var searchResults = salesRepSearch.run(); 

        // add the search results to the list
        list.addRows({
            rows: searchResults
        }); 

        response.writePage(list); 
    
    }
  };
});
