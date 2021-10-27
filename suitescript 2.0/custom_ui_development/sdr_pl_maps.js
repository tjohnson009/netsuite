/**
 * @NScriptType Portlet
 * @NApiVersion 2.0
 */

define(["N/file"], function(file) {
  return {
    render: function(context) {
        var portlet = context.portlet; 
        portlet.title = 'Google Maps'; 

        
    }
  };
});
