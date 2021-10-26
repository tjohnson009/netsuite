/**
 * @NScriptType UserEventScript
 * @NApiVersion 2.0
 */

define(["N/file", "N/render", "N/ui/serverWidget", "/SuiteScripts - Globals/Libraries/lodash.min"], function(file, render, serverWidget) {
  return {
    beforeLoad: function(context) {
        var itemRecord = context.newRecord; 
        var form = context.form;  

        var managerTemplate = file.load({
          id: "SuiteScripts - Globals/HTML Templates/photomanager.html",
        });

        var managerField = form.addField({
            id: 'photomanager_field', 
            type: serverWidget.FieldType.INLINEHTML, 
            label: 'Photo Manager', 
            container: 'store'
        }); 
        
        form.insertField({
          field: managerField,
          nextfield: "storedisplayimage",
        }); 

        var htmlString = managerTemplate.getContents(); 
        var compiled = _.template(htmlString); 

        managerField.defaultValue = compiled(); 
    }
  };
});
