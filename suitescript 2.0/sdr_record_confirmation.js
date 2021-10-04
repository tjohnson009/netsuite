{/**
 * @NScriptType ClientScript
 * @NApiVersion 2.0
 */

define(["N/runtime"], function (runtime) {
  return {
    saveRecord: function(context) {
      var script = runtime.getCurrentScript(); 
          var recordType = script.getParameter({
            name: "custscript_sdr_save_record_type",
          }); 
        
          var enableCheckBox = script.getParameter({
            name: "custscript_sdr_save_confirmation",
          }); 

      if (enableCheckBox) { 
      var confirmation = confirm('Click OK if you are sure you would like to submit you changes for this ' + recordType + ' record. Click cancel to continue editing.')
        if (confirmation) {
          return true; 
        }      
          }
    
      }

  };
});
}